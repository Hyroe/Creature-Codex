import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Stack
        direction="column"
        spacing={2}
        sx={{
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 520,
        }}
      >
        <Typography variant="h4">
          {title}
        </Typography>

        {description && (
          <Typography color="text.secondary">
            {description}
          </Typography>
        )}

        {actionLabel && actionTo && (
          <Button
            component={Link}
            to={actionTo}
            variant="contained"
          >
            {actionLabel}
          </Button>
        )}
      </Stack>
    </Box>
  );
}