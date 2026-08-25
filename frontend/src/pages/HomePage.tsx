import { Box } from '@mui/material';

import { FeaturedCreatures } from '../features/creatures/components/FeaturedCreatures';
import { Hero } from '../features/home/components/Hero';

export function HomePage() {
  return (
    <Box>
      <Hero />

      <FeaturedCreatures />
    </Box>
  );
}