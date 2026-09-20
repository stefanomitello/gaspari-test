import type { AppSettings, SettingsResponse } from "~/types/settings";

const STORAGE_KEY = "bugliano_settings";

export const useSettings = () => {
  const { apiFetch } = useApi();
  const settings = useState<AppSettings | null>("app_settings", () => null);
  const isLoading = useState<boolean>("app_settings_loading", () => false);
  const error = useState<string | null>("app_settings_error", () => null);

  const fetchSettings = async (
    forceRefresh = false,
  ): Promise<AppSettings | null> => {
    if (!forceRefresh && settings.value) {
      return settings.value;
    }

    // 2. On client-side, check localStorage first before making a network request
    if (import.meta.client && !forceRefresh) {
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as AppSettings;
          if (parsed && parsed.app_name) {
            settings.value = parsed;
            return parsed;
          }
        }
      } catch (e) {
        console.warn("Failed to read settings from localStorage:", e);
      }
    }

    // 3. Otherwise fetch from API
    isLoading.value = true;
    error.value = null;

    try {
      const response = await apiFetch<SettingsResponse | AppSettings>(
        "/settings",
      );
      const data =
        response && "data" in response && response.data
          ? response.data
          : (response as AppSettings);

      settings.value = data;

      if (import.meta.client && data) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
          console.warn("Failed to save settings to localStorage:", e);
        }
      }

      return data;
    } catch (err: any) {
      console.error("Failed to fetch settings from API:", err);
      error.value = err?.message || "Impossibile caricare le impostazioni";
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    settings: readonly(settings),
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchSettings,
  };
};
