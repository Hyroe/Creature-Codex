import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import type { Creature } from '../../creatures/types/creature';

interface LibraryCreatureCardProps {
  creature: Creature;
}

export function LibraryCreatureCard({
  creature,
}: LibraryCreatureCardProps) {
  const navigate = useNavigate();

  return (
    <Card variant="outlined">
      <CardActionArea
        onClick={() =>
          navigate(`/creatures/${creature.id}`)
        }
      >
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="h6">
              {creature.name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: 'italic' }}
            >
              {creature.scientificName}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {creature.description}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}