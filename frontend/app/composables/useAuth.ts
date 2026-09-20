import type {
  User,
  LoginCredentials,
  AuthResponse,
  UserResponse,
} from "~/types/auth";

export const useAuth = () => {
  const config = useRuntimeConfig();
  const router = useRouter();

  const token = useCookie<string | null>("auth_token", {
    path: "/",
    sameSite: "lax",
    secure: !import.meta.dev,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  const user = useState<User | null>("auth_user", () => null);

  const authError = useState<string | null>("auth_error", () => null);

  const isLoading = useState<boolean>("auth_loading", () => false);

  const isAuthenticated = computed(() => Boolean(token.value && user.value));
  const getBaseUrl = () => {
    return import.meta.server ? config.apiBase : config.public.apiBase;
  };
  const decodeJwtPayload = (jwt: string): Record<string, any> | null => {
    try {
      const base64Url = jwt.split(".")[1];
      if (!base64Url) return null;
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };

  const isTokenExpired = (bufferSeconds = 30): boolean => {
    if (!token.value) return true;
    const payload = decodeJwtPayload(token.value);
    if (!payload || !payload.exp) {
      return false;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= payload.exp - bufferSeconds;
  };

  const clearSession = (errorMessage?: string) => {
    token.value = null;
    user.value = null;
    if (errorMessage) {
      authError.value = errorMessage;
    }
  };

  const login = async (
    credentials: LoginCredentials,
  ): Promise<AuthResponse> => {
    isLoading.value = true;
    authError.value = null;

    try {
      const response = await $fetch<AuthResponse>("/login", {
        baseURL: getBaseUrl(),
        method: "POST",
        body: credentials,
        headers: {
          Accept: "application/json",
        },
      });

      token.value = response.token;
      user.value = response.user;
      return response;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchUser = async (): Promise<User | null> => {
    if (!token.value) {
      user.value = null;
      return null;
    }

    if (isTokenExpired()) {
      clearSession("Sessione scaduta. Effettua nuovamente l'accesso.");
      return null;
    }

    try {
      const res = await $fetch<UserResponse>("/user", {
        baseURL: getBaseUrl(),
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      });

      const userData =
        res && "data" in res && res.data ? res.data : (res as User);
      console.log("DATA", userData, res);

      user.value = userData;
      return userData;
    } catch (error: any) {
      if (error?.status === 401 || error?.statusCode === 401) {
        clearSession("Sessione non valida o scaduta.");
      }
      return null;
    }
  };

  const logout = async () => {
    isLoading.value = true;
    const currentToken = token.value;

    try {
      if (currentToken) {
        await $fetch("/logout", {
          baseURL: getBaseUrl(),
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${currentToken}`,
          },
        });
      }
    } catch (error) {
      console.warn("Logout request returned an error:", error);
    } finally {
      clearSession();
      isLoading.value = false;
      if (import.meta.client) {
        router.push("/login");
      }
    }
  };

  const checkAuth = async (): Promise<boolean> => {
    if (!token.value) {
      clearSession();
      return false;
    }

    if (isTokenExpired()) {
      clearSession("Sessione scaduta. Effettua nuovamente l'accesso.");
      return false;
    }

    if (!user.value) {
      const fetched = await fetchUser();
      return Boolean(fetched);
    }

    return true;
  };

  return {
    token: readonly(token),
    user: readonly(user),
    authError,
    isLoading: readonly(isLoading),
    isAuthenticated,
    login,
    logout,
    fetchUser,
    checkAuth,
    clearSession,
    isTokenExpired,
  };
};
