import { Box, Divider, Grid, Stack, Typography } from '@mui/material';

import type { Creature } from '../types/creature';

interface CreatureGalleryProps {
  creature: Creature;
}

export function CreatureGallery({ creature }: CreatureGalleryProps) {
  const images = creature.gallery.images;

  return (
    <Box component="section">
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3">Gallery</Typography>
        </Box>

        <Divider />

        {images.length === 0 ? (
          <Typography color="text.secondary">
            No additional images available.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {images.map((image) => (
              <Grid key={image.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  component="img"
                  src={image.url}
                  alt={image.alt}
                  sx={{
                    width: '100%',
                    aspectRatio: '4 / 3',
                    objectFit: 'cover',
                    borderRadius: 2,
                    display: 'block',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </Box>
  );
}
