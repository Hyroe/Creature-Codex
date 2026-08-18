import {
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { useParams } from 'react-router-dom';

import { diets } from "../../creatures/data/diets";

import { creatures } from '../../creatures/data/creatures';

import { LibraryEntityDetails } from '../components/LibraryEntityDetails';
import { LibraryCreatureCard } from '../components/LibraryCreatureCard';
import { EmptyState } from '../../../components/common/EmptyState';

export function DietDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const diet = diets.find(
    (diet) => diet.id === id,
  );

  if (!diet) {
  return (
    <EmptyState
      title="Diet Not Found"
      description="This diet does not exist in the Creature Codex."
      actionLabel="Back to Diets"
      actionTo="/library/diets"
    />
  );
}

  const relatedCreatures = creatures.filter(
    (creature) =>
      creature.ecology.dietIds.includes(diet.id),
  );

  return (
    <LibraryEntityDetails
      eyebrow="Library / Diets"
      name={diet.name}
      description={diet.description}
      type="Diet"
    >
      <Stack spacing={3}>
        <Typography variant="h4">
          Documented Creatures
        </Typography>

        {relatedCreatures.length === 0 ? (
          <Typography color="text.secondary">
            No creatures have been documented with this
            diet.
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