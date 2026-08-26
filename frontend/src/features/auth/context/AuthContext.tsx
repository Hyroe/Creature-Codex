import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import {
  login as loginRequest,
} from '../services/authService';

import type {
  AuthUser,
  LoginRequest,
} from '../types/auth';

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    null,
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    null,
  );

  async function login(credentials: LoginRequest) {
    const response = await loginRequest(credentials);

    setUser(response.user);
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
  }

  function logout() {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        isAuthenticated: user !== null,
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
    throw new Error(
      'useAuth must be used inside AuthProvider',
    );
  }

  return context;
}