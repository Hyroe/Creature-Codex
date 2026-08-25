import {
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { useParams } from 'react-router-dom';

import { damageTypes } from "../../creatures/data/damageTypes";

import {
  getCreaturesResistantTo,
  getCreaturesWeakTo,
} from '../../creatures/selectors/creatureSelectors';

import { LibraryEntityDetails } from '../components/LibraryEntityDetails';
import { LibraryCreatureCard } from '../components/LibraryCreatureCard';
import { EmptyState } from '../../../components/common/EmptyState';

export function DamageTypeDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const damageType = damageTypes.find(
    (damageType) => damageType.id === id,
  );

  if (!damageType) {
  return (
    <EmptyState
      title="Damage Type Not Found"
      description="This damage type does not exist in the Creature Codex."
      actionLabel="Back to Damage Types"
      actionTo="/library/damage-types"
    />
  );
}

  const weakCreatures = getCreaturesWeakTo(
    'DamageType',
    damageType.id,
  );

  const resistantCreatures = getCreaturesResistantTo(
    'DamageType',
    damageType.id,
  );

  return (
    <LibraryEntityDetails
      eyebrow="Library / Damage Types"
      name={damageType.name}
      description={damageType.description}
      type="Damage Type"
    >
      <Stack spacing={6}>

        {/* Weaknesses */}
        <Stack spacing={3}>
          <Typography variant="h4">
            Weakness
          </Typography>

          {weakCreatures.length === 0 ? (
            <Typography color="text.secondary">
              No documented creatures are weak to this
              damage type.
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

        {/* Resistances */}
        <Stack spacing={3}>
          <Typography variant="h4">
            Resistance
          </Typography>

          {resistantCreatures.length === 0 ? (
            <Typography color="text.secondary">
              No documented creatures resist this damage
              type.
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