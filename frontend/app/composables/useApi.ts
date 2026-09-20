import type { NitroFetchOptions, NitroFetchRequest } from "nitropack";

export const useApi = () => {
  const config = useRuntimeConfig();
  const router = useRouter();
  const token = useCookie<string | null>("auth_token");
  const { clearSession, isTokenExpired } = useAuth();

  const getBaseUrl = () => {
    return import.meta.server ? config.apiBase : config.public.apiBase;
  };

  const apiFetch = async <T = any>(
    endpoint: string,
    options: NitroFetchOptions<NitroFetchRequest> = {},
  ): Promise<T> => {
    let normalized = endpoint;
    if (normalized.startsWith("/api/")) {
      normalized = normalized.replace(/^\/api/, "");
    } else if (normalized === "/api") {
      normalized = "/";
    }
    if (!normalized.startsWith("/")) {
      normalized = `/${normalized}`;
    }

    const headers: Record<string, string> = {
      Accept: "application/json",
      ...((options.headers as Record<string, string>) || {}),
    };

    if (token.value) {
      if (isTokenExpired()) {
        clearSession("La sessione è scaduta. Effettua nuovamente il login.");
        if (import.meta.client) {
          const current = router.currentRoute.value.fullPath;
          if (!current.includes("/login")) {
            router.push({
              path: "/login",
              query: { redirect: current },
            });
          }
        }
        throw new Error("Token expired");
      }

      if (!headers.Authorization) {
        headers.Authorization = `Bearer ${token.value}`;
      }
    }

    try {
      return await $fetch<T>(normalized, {
        baseURL: getBaseUrl(),
        ...options,
        headers,
      });
    } catch (error: any) {
      if (error?.status === 401 || error?.statusCode === 401) {
        clearSession(
          "Sessione scaduta o non valida. Effettua l'accesso per continuare.",
        );
        if (import.meta.client) {
          const current = router.currentRoute.value.fullPath;
          if (!current.includes("/login")) {
            router.push({
              path: "/login",
              query: { redirect: current },
            });
          }
        }
      }

      throw error;
    }
  };

  return {
    apiFetch,
    getBaseUrl,
  };
};
