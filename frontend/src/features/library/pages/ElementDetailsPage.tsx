import {
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { useParams } from 'react-router-dom';

import { elements } from '../../creatures/data/elements';

import {
  getCreaturesWeakTo,
  getCreaturesResistantTo,
} from '../../creatures/selectors/creatureSelectors';

import { LibraryEntityDetails } from '../components/LibraryEntityDetails';
import { LibraryCreatureCard } from '../components/LibraryCreatureCard';
import { EmptyState } from '../../../components/common/EmptyState';

export function ElementDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const element = elements.find(
    (element) => element.id === id,
  );

  if (!element) {
  return (
    <EmptyState
      title="Element Not Found"
      description="This element does not exist in the Creature Codex."
      actionLabel="Back to Elements"
      actionTo="/library/elements"
    />
  );
}

  const weakCreatures = getCreaturesWeakTo(
    'Element',
    element.id,
  );

  const resistantCreatures = getCreaturesResistantTo(
    'Element',
    element.id,
  );

  return (
    <LibraryEntityDetails
      eyebrow="Library / Elements"
      name={element.name}
      description={element.description}
      type="Element"
    >
      <Stack spacing={6}>
        <Stack spacing={3}>
          <Typography variant="h4">
            Weakness
          </Typography>

          {weakCreatures.length === 0 ? (
            <Typography color="text.secondary">
              No documented creatures are weak to this
              element.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {weakCreatures.map((creature) => (
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

        <Stack spacing={3}>
          <Typography variant="h4">
            Resistance
          </Typography>

          {resistantCreatures.length === 0 ? (
            <Typography color="text.secondary">
              No documented creatures resist this
              element.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {resistantCreatures.map((creature) => (
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
      </Stack>
    </LibraryEntityDetails>
  );
}