import type {
  LoginRequest,
  LoginResponse,
} from '../types/auth';

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