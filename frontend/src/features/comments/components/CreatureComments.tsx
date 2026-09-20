import {
  DeleteOutlined,
  EditOutlined,
  SendOutlined,
} from '@mui/icons-material';

import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';

import { useAuth } from '../../auth/context/AuthContext';

import {
  createCreatureComment,
  deleteCreatureComment,
  getCreatureComments,
  updateCreatureComment,
} from '../services/commentService';

import type { CreatureComment } from '../types/comments';

interface CreatureCommentsProps {
  slug: string;
}

export function CreatureComments({ slug }: CreatureCommentsProps) {
  const { user } = useAuth();

  const [comments, setComments] = useState<CreatureComment[]>([]);

  const [content, setContent] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    let active = true;

    async function loadComments() {
      try {
        setIsLoading(true);

        const result = await getCreatureComments(slug);

        if (active) {
          setComments(result);
        }
      } catch (error) {
        if (active) {
          setError(
            error instanceof Error ? error.message : 'Unable to load comments',
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadComments();

    return () => {
      active = false;
    };
  }, [slug]);

  async function handleSubmit() {
    const value = content.trim();

    if (!value) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const comment = await createCreatureComment(slug, value);

      setComments((current) => [comment, ...current]);

      setContent('');
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Unable to create comment',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function startEditing(comment: CreatureComment) {
    setEditingCommentId(comment.id);

    setEditingContent(comment.content);
  }

  function cancelEditing() {
    setEditingCommentId(null);
    setEditingContent('');
  }

  async function handleUpdate(commentId: string) {
    const value = editingContent.trim();

    if (!value) {
      return;
    }

    try {
      const updated = await updateCreatureComment(commentId, value);

      setComments((current) =>
        current.map((comment) =>
          comment.id === commentId ? updated : comment,
        ),
      );

      cancelEditing();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Unable to update comment',
      );
    }
  }

  async function handleDelete(commentId: string) {
    try {
      await deleteCreatureComment(commentId);

      setComments((current) =>
        current.filter((comment) => comment.id !== commentId),
      );
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Unable to delete comment',
      );
    }
  }

  return (
    <Box
      sx={{
        mt: 6,
        pt: 4,
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {comments.length === 1
              ? '1 comment'
              : `${comments.length} comments`}
          </Typography>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        {user ? (
          <Stack spacing={1.5}>
            <TextField
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Share your notes about this creature..."
              multiline
              minRows={3}
              slotProps={{
                htmlInput: {
                  maxLength: 1000,
                },
              }}
            />

            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {content.length}/1000
              </Typography>

              <Button
                variant="contained"
                startIcon={<SendOutlined />}
                disabled={!content.trim() || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Typography color="text.secondary">
            Sign in to join the discussion.
          </Typography>
        )}

        <Divider />

        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 4,
            }}
          >
            <CircularProgress size={28} />
          </Box>
        ) : comments.length === 0 ? (
          <Box
            sx={{
              py: 5,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              No comments yet
            </Typography>

            <Typography color="text.secondary">
              Be the first to add a note.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={0}>
            {comments.map((comment, index) => {
              const isOwner = user?.id === comment.authorId;

              const isEditing = editingCommentId === comment.id;

              return (
                <Box key={comment.id}>
                  {index > 0 && <Divider />}

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      py: 3,
                    }}
                  >
                    <Avatar
                      src={comment.author.avatarUrl ?? undefined}
                      alt={
                        comment.author.displayName ?? comment.author.username
                      }
                    >
                      {(comment.author.displayName ?? comment.author.username)
                        .charAt(0)
                        .toUpperCase()}
                    </Avatar>

                    <Box
                      sx={{
                        flexGrow: 1,
                        minWidth: 0,
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            {comment.author.displayName ??
                              comment.author.username}
                          </Typography>

                          <Typography variant="caption" color="text.secondary">
                            {new Date(comment.createdAt).toLocaleString()}
                          </Typography>
                        </Box>

                        {isOwner && (
                          <Stack direction="row" spacing={0.5}>
                            <IconButton
                              size="small"
                              onClick={() => startEditing(comment)}
                            >
                              <EditOutlined fontSize="small" />
                            </IconButton>

                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(comment.id)}
                            >
                              <DeleteOutlined fontSize="small" />
                            </IconButton>
                          </Stack>
                        )}
                      </Stack>

                      {isEditing ? (
                        <Stack
                          spacing={1.5}
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField
                            value={editingContent}
                            onChange={(event) =>
                              setEditingContent(event.target.value)
                            }
                            multiline
                            minRows={2}
                          />

                          <Stack direction="row" spacing={1}>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => handleUpdate(comment.id)}
                            >
                              Save
                            </Button>

                            <Button
                              size="small"
                              color="inherit"
                              onClick={cancelEditing}
                            >
                              Cancel
                            </Button>
                          </Stack>
                        </Stack>
                      ) : (
                        <Typography
                          sx={{
                            mt: 1.5,
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {comment.content}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
