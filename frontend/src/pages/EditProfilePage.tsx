import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Alert,
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useAuth } from '../features/auth/context/AuthContext';
import { updateProfile } from '../services/userService';

export function EditProfilePage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(user?.displayName ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? '');

  if (!user) {
    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSaving(true);
    setError(null);

    try {
      const response = await updateProfile({
        displayName,
        bio: bio || null,
        avatarUrl: avatarUrl || null,
      });

      updateUser(response.user);

      navigate('/profile');
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Unable to update profile',
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        py: 6,
        px: 2,
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Edit profile
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Display name"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            required
          />

          <TextField
            label="Bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            multiline
            minRows={4}
            slotProps={{
              htmlInput: {
                maxLength: 500,
              },
            }}
          />
          <TextField
            label="Avatar image URL"
            value={avatarUrl}
            onChange={(event) => setAvatarUrl(event.target.value)}
            placeholder="https://example.com/avatar.png"
            fullWidth
          />

          {avatarUrl && (
            <Avatar
              src={avatarUrl}
              sx={{
                width: 96,
                height: 96,
              }}
            />
          )}

          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save changes'}
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate('/profile')}
              disabled={isSaving}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
