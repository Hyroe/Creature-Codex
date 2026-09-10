import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';

import { CreatureImage } from './CreatureImage';

import type { CreatureFormValues } from './CreatureForm';

interface CreatureEditorSidebarProps {
  values: CreatureFormValues;
}

export function CreatureEditorSidebar({ values }: CreatureEditorSidebarProps) {
  const threatLabel =
    values.threatLevel === 'LOW'
      ? 'Low'
      : values.threatLevel === 'MODERATE'
        ? 'Moderate'
        : values.threatLevel === 'HIGH'
          ? 'High'
          : 'Extreme';

  return (
    <Card
      variant="outlined"
      sx={{
        position: {
          lg: 'sticky',
        },
        top: {
          lg: 96,
        },
        overflow: 'hidden',
      }}
    >
      <CreatureImage
        src={values.coverImageUrl || null}
        alt={values.name || 'Creature preview'}
        height={260}
      />

      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Typography variant="h5" component="div">
              {values.name || 'Unnamed Creature'}
            </Typography>

            <Chip size="small" variant="outlined" label={threatLabel} />
          </Stack>

          {values.scientificName && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontStyle: 'italic',
              }}
            >
              {values.scientificName}
            </Typography>
          )}

          <Typography variant="body2" color="text.secondary">
            {values.description ||
              'Your creature description will appear here.'}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            <Chip size="small" label={`${values.habitatIds.length} habitats`} />

            <Chip size="small" label={`${values.dietIds.length} diets`} />

            <Chip
              size="small"
              label={`${values.affinities.length} affinities`}
            />

            <Chip
              size="small"
              label={`${values.galleryImages.length} gallery images`}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
