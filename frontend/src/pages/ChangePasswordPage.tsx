import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';

import { changePassword } from '../services/userService';

export function ChangePasswordPage() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setIsSaving(true);

    try {
      await changePassword({
        currentPassword,
        newPassword,
      });

      navigate('/profile', { replace: true });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Unable to change password',
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: 'auto',
        py: 6,
        px: 2,
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Change password
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {error && <Alert severity="error">{error}</Alert>}

          {success && (
            <Alert severity="success">Password updated successfully</Alert>
          )}

          <TextField
            label="Current password"
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((current) => !current)}
                      edge="end"
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            required
          />

          <TextField
            label="New password"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            slotProps={{
              htmlInput: {
                minLength: 8,
                maxLength: 100,
              },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((current) => !current)}
                      edge="end"
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            label="Confirm new password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((current) => !current)}
                      edge="end"
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            required
          />

          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" disabled={isSaving}>
              {isSaving ? 'Updating...' : 'Change password'}
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
