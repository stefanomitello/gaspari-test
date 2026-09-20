export interface AppSettings {
  app_name: string;
  description: string;
  favicon: string;
  logo: string;
  contact_email: string;
  social: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

export interface SettingsResponse {
  data: AppSettings;
}
