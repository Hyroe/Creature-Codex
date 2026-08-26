import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
} from '../features/auth/types/auth';

const API_URL = 'http://localhost:3000';

export async function login(
  credentials: LoginRequest,
): Promise<LoginResponse> {
  const response = await fetch(
    `${API_URL}/api/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    },
  );

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(
      data?.message ?? 'Unable to sign in.',
    );
  }

  return response.json();
}

export async function refresh(): Promise<{
  accessToken: string;
}> {
  const response = await fetch(
    `${API_URL}/api/auth/refresh`,
    {
      method: 'POST',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    throw new Error('Unable to refresh session');
  }

  return response.json();
}

export async function getMe(
  accessToken: string,
): Promise<{ user: AuthUser }> {
  const response = await fetch(
    `${API_URL}/api/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
    },
  );

  if (!response.ok) {
    throw new Error('Unable to load user');
  }

  return response.json();
}

export async function logout() {
  const response = await fetch(
    `${API_URL}/api/auth/logout`,
    {
      method: 'POST',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    throw new Error('Logout failed');
  }
}