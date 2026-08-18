import {
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';

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

function getTargetPath(
  targetType: CreatureAffinity['targetType'],
  targetId: string,
) {
  switch (targetType) {
    case 'Element':
      return `/library/elements/${targetId}`;

    case 'DamageType':
      return `/library/damage-types/${targetId}`;

    case 'BodyPart':
      return `/library/body-parts/${targetId}`;

    default:
      return '#';
  }
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
                <Typography
                  variant="subtitle1"
                  component={Link}
                  to={getTargetPath(
                    affinity.targetType,
                    affinity.target.id,
                  )}
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
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