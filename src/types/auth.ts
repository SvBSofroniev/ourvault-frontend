export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string | null;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;

  userId?: string;
  username?: string;
  email?: string;
  role?: string;
}

export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  code: string;
  message: string;
  path: string;
  validationErrors: Record<string, string>;
}

export interface CurrentUser {
  id: string;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  role: string;
}