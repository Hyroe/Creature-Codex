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
import { CreatureImage } from './CreatureImage';

interface CreatureCardProps {
  creature: Creature;
}

export function CreatureCard({ creature }: CreatureCardProps) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/creatures/${creature.slug}`}>
        <CreatureImage
          src={creature.gallery.coverImage?.url}
          alt={creature.gallery.coverImage?.alt ?? creature.name}
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
