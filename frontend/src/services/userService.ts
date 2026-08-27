import type { AuthUser } from '../features/auth/types/auth';

import { apiFetch } from './apiClient';

export interface UpdateProfileRequest {
  displayName?: string;
  bio?: string | null;
  avatarUrl?: string | null;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export async function updateProfile(
  data: UpdateProfileRequest,
): Promise<{ user: AuthUser }> {
  const response = await apiFetch('/api/users/me', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(error?.message ?? 'Unable to update profile');
  }

  return response.json();
}

export async function changePassword(
  data: ChangePasswordRequest,
): Promise<void> {
  const response = await apiFetch('/api/users/me/password', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(error?.message ?? 'Unable to change password');
  }
}
