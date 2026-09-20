export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface UserResponse {
  data?: User;
  id?: number;
  name?: string;
  email?: string;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ApiValidationError {
  message: string;
  errors?: Record<string, string[]>;
}
