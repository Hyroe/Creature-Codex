import {
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { useParams } from 'react-router-dom';

import { habitats } from "../../creatures/data/habitats";

import { creatures } from '../../creatures/data/creatures';

import { LibraryEntityDetails } from '../components/LibraryEntityDetails';
import { LibraryCreatureCard } from '../components/LibraryCreatureCard';

export function HabitatDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const habitat = habitats.find(
    (habitat) => habitat.id === id,
  );

  if (!habitat) {
    return (
      <Typography>
        Habitat not found.
      </Typography>
    );
  }

  const relatedCreatures = creatures.filter(
    (creature) =>
      creature.ecology.habitatIds.includes(habitat.id),
  );

  return (
    <LibraryEntityDetails
      eyebrow="Library / Habitats"
      name={habitat.name}
      description={habitat.description}
      type="Habitat"
    >
      <Stack spacing={3}>
        <Typography variant="h4">
          Documented Creatures
        </Typography>

        {relatedCreatures.length === 0 ? (
          <Typography color="text.secondary">
            No creatures have been documented in this
            habitat.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {relatedCreatures.map((creature) => (
              <Grid
                key={creature.id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
              >
                <LibraryCreatureCard
                  creature={creature}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </LibraryEntityDetails>
  );
}