import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

import type { Creature } from '../types/creature';

interface CreatureCardProps {
  creature: Creature;
}

export function CreatureCard({ creature }: CreatureCardProps) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/creatures/${creature.id}`}>
        <CardMedia
          component="img"
          height="280"
          image={creature.imageUrl}
          alt={creature.name}
        />

        <CardContent>
          <Typography variant="h6" component="h3" gutterBottom>
            {creature.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: 'italic' }}
            gutterBottom
          >
            {creature.scientificName}
          </Typography>

          <Chip
            label={`Threat: ${creature.threatLevel}`}
            size="small"
            variant="outlined"
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}