import type { ReactNode } from 'react';

import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

interface CreatureFormSectionProps {
  id?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function CreatureFormSection({
  id,
  title,
  description,
  icon,
  children,
}: CreatureFormSectionProps) {
  return (
    <Card
      id={id}
      variant="outlined"
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 2,

        scrollMarginTop: '125px',
        sm: '120px',
      }}
    >
      <CardContent
        sx={{
          p: {
            xs: 2.5,
            md: 3,
          },

          '&:last-child': {
            pb: {
              xs: 2.5,
              md: 3,
            },
          },
        }}
      >
        <Stack spacing={3}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: 'center',
            }}
          >
            {icon && (
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 1.5,

                  color: 'primary.main',

                  backgroundColor: 'rgba(211, 163, 72, 0.08)',

                  flexShrink: 0,
                }}
              >
                {icon}
              </Box>
            )}

            <Box>
              <Typography variant="h5" component="h2">
                {title}
              </Typography>

              {description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.25 }}
                >
                  {description}
                </Typography>
              )}
            </Box>
          </Stack>

          <Divider />

          {children}
        </Stack>
      </CardContent>
    </Card>
  );
}
