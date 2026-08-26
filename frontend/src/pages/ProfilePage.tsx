import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../features/auth/context/AuthContext';

export function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: 'auto',
        py: 6,
        px: 2,
      }}
    >
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Avatar
                src={user.avatarUrl ?? undefined}
                sx={{ width: 80, height: 80 }}
              >
                {user.displayName?.[0] ?? user.username[0]}
              </Avatar>

              <Box>
                <Typography variant="h5">{user.displayName}</Typography>

                <Typography color="text.secondary">@{user.username}</Typography>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2">Email</Typography>

              <Typography>{user.email}</Typography>
            </Box>

            {user.bio && (
              <Box>
                <Typography variant="subtitle2">Bio</Typography>

                <Typography>{user.bio}</Typography>
              </Box>
            )}

            <Button variant="contained" href="/profile/edit">
              Edit profile
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/profile/change-password')}
            >
              Change password
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
