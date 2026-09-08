import type { ReactNode } from 'react';

import { Box, Card, Stack, Typography } from '@mui/material';

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: number;
  description: string;
}

export function StatCard({ icon, title, value, description }: StatCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 2.5,
        backgroundColor: 'background.paper',
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            border: 1,
            borderColor: 'primary.main',
            display: 'grid',
            placeItems: 'center',
            color: 'primary.main',
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography color="text.secondary" variant="body2">
            {title}
          </Typography>

          <Typography
            variant="h4"
            sx={{
              lineHeight: 1.2,
            }}
          >
            {value}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
