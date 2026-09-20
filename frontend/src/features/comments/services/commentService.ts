import { apiFetch } from '../../../services/apiClient';

import type { CreatureComment } from '../types/comments';

export async function getCreatureComments(
  slug: string,
): Promise<CreatureComment[]> {
  const response = await apiFetch(`/api/creatures/${slug}/comments`);

  if (!response.ok) {
    throw new Error('Unable to load comments');
  }

  return response.json();
}

export async function createCreatureComment(
  slug: string,
  content: string,
): Promise<CreatureComment> {
  const response = await apiFetch(`/api/creatures/${slug}/comments`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      content,
    }),
  });

  if (!response.ok) {
    throw new Error('Unable to create comment');
  }

  return response.json();
}

export async function updateCreatureComment(
  id: string,
  content: string,
): Promise<CreatureComment> {
  const response = await apiFetch(`/api/comments/${id}`, {
    method: 'PATCH',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      content,
    }),
  });

  if (!response.ok) {
    throw new Error('Unable to update comment');
  }

  return response.json();
}

export async function deleteCreatureComment(id: string): Promise<void> {
  const response = await apiFetch(`/api/comments/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Unable to delete comment');
  }
}
