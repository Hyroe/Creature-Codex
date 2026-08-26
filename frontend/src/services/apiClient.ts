const API_URL = 'http://localhost:3000';

let accessToken: string | null = null;

export function setApiAccessToken(token: string | null) {
  accessToken = token;
}

async function refreshAccessToken(): Promise<string | null> {
  const response = await fetch(
    `${API_URL}/api/auth/refresh`,
    {
      method: 'POST',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  accessToken = data.accessToken;

  return data.accessToken;
}

export async function apiFetch(
  path: string,
  options: RequestInit = {},
) {
  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set(
      'Authorization',
      `Bearer ${accessToken}`,
    );
  }

  let response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (response.status !== 401) {
    return response;
  }

  const newAccessToken = await refreshAccessToken();

  if (!newAccessToken) {
    accessToken = null;
    return response;
  }

  headers.set(
    'Authorization',
    `Bearer ${newAccessToken}`,
  );

  response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  return response;
}