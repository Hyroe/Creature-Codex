import {
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import type { CreatureAffinity } from '../types/creatureAffinity';

interface ResolvedAffinity extends CreatureAffinity {
  target: {
    id: string;
    name: string;
    description: string;
    icon?: string;
  };
}

interface CreatureAffinityListProps {
  title: string;
  affinities: ResolvedAffinity[];
}

export function CreatureAffinityList({
  title,
  affinities,
}: CreatureAffinityListProps) {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">
        {title}
      </Typography>

      <Stack spacing={2}>
        {affinities.map((affinity) => (
          <Paper
            key={affinity.id}
            variant="outlined"
            sx={{ p: 2.5 }}
          >
            <Stack spacing={1.5}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Typography variant="subtitle1">
                  {affinity.target.name}
                </Typography>

                <Chip
                  size="small"
                  label={affinity.targetType}
                />
              </Box>

              {affinity.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {affinity.description}
                </Typography>
              )}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
}