export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  displayName: string;
  email: string;
  role: string;
  avatarUrl: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}