import {
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { useParams } from 'react-router-dom';

import { bodyParts } from "../../creatures/data/bodyParts";

import {
  getCreaturesResistantTo,
  getCreaturesWeakTo,
} from '../../creatures/selectors/creatureSelectors';

import { LibraryEntityDetails } from '../components/LibraryEntityDetails';
import { LibraryCreatureCard } from '../components/LibraryCreatureCard';

export function BodyPartDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const bodyPart = bodyParts.find(
    (bodyPart) => bodyPart.id === id,
  );

  if (!bodyPart) {
    return (
      <Typography>
        Body part not found.
      </Typography>
    );
  }

  const weakCreatures = getCreaturesWeakTo(
    'BodyPart',
    bodyPart.id,
  );

  const resistantCreatures = getCreaturesResistantTo(
    'BodyPart',
    bodyPart.id,
  );

  return (
    <LibraryEntityDetails
      eyebrow="Library / Body Parts"
      name={bodyPart.name}
      description={bodyPart.description}
      type="Body Part"
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
              body part.
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
              No documented creatures have a resistance
              associated with this body part.
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