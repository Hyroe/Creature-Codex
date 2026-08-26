import { createContext, useContext, useEffect, useState,  type ReactNode } from 'react';
import {
  apiFetch,
  setApiAccessToken,
} from '../services/apiClient';

import {
  login as loginRequest,
  logout as logoutRequest,
  refresh as refreshRequest,
  getMe,
} from '../../../services/authService';

import type { AuthUser, LoginRequest } from '../types/auth';

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  async function restoreSession() {
    try {
      const refreshResponse = await refreshRequest();

      setAccessToken(refreshResponse.accessToken);
      setApiAccessToken(refreshResponse.accessToken);

      const meResponse = await getMe(
        refreshResponse.accessToken,
      );

      setUser(meResponse.user);
    } catch {
      setUser(null);
      setAccessToken(null);
      setApiAccessToken(null);
    } finally {
      setIsLoading(false);
    }
  }

  restoreSession();
}, []);

  async function login(credentials: LoginRequest) {
    setIsLoading(true);

    try {
      const response = await loginRequest(credentials);

      setUser(response.user);
      setAccessToken(response.accessToken);
      setApiAccessToken(response.accessToken);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    setIsLoading(true);
    try {
      await logoutRequest();

      setUser(null);
      setAccessToken(null);
      setApiAccessToken(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: user !== null,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
