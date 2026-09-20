export interface CommentAuthor {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
}

export interface CreatureComment {
  id: string;
  content: string;

  authorId: string;
  creatureId: string;

  author: CommentAuthor;

  createdAt: string;
  updatedAt: string;
}
