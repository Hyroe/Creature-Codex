import { Link, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material';

import { CreatureHero } from '../features/creatures/components/CreatureHero';
import { CreatureOverview } from '../features/creatures/components/CreatureOverview';
import { getCreatureById } from '../features/creatures/services/creatureService';

export function CreatureDetailsPage() {
  const { id } = useParams();

  const creature = id ? getCreatureById(id) : undefined;

  if (!creature) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 2,
          }}
        >
          <Typography variant="h3">
            Creature not found
          </Typography>

          <Typography color="text.secondary">
            The requested creature does not exist in the Codex.
          </Typography>

          <Button
            component={Link}
            to="/creatures"
            variant="contained"
          >
            Return to Codex
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box>
      <CreatureHero creature={creature} />

      <Container maxWidth="lg">
        <CreatureOverview creature={creature} />
      </Container>
    </Box>
  );
}