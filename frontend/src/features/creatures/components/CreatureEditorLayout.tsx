import type { ReactNode } from 'react';

import { Box, Container, Stack, Typography } from '@mui/material';
import { CreatureEditorNav } from './CreatureEditorNav';

interface CreatureEditorLayoutProps {
  eyebrow?: string;

  title: string;

  description: string;

  children: ReactNode;

  sidebar: ReactNode;
}

export function CreatureEditorLayout({
  eyebrow = 'CREATURE CODEX',
  title,
  description,
  children,
  sidebar,
}: CreatureEditorLayoutProps) {
  return (
    <Box
      sx={{
        pb: 8,
        minHeight: '100vh',
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',

          background:
            'linear-gradient(180deg, rgba(211, 163, 72, 0.055) 0%, rgba(0, 0, 0, 0) 100%)',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            pt: {
              xs: 4,
              md: 6,
            },

            pb: {
              xs: 3,
              md: 4,
            },
          }}
        >
          <Stack
            spacing={1}
            sx={{
              maxWidth: 720,
            }}
          >
            <Typography
              variant="overline"
              color="primary"
              sx={{
                letterSpacing: '0.08em',
              }}
            >
              {eyebrow}
            </Typography>

            <Typography variant="h2" component="h1">
              {title}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                maxWidth: 650,
              }}
            >
              {description}
            </Typography>
          </Stack>
        </Container>
      </Box>

      <CreatureEditorNav />

      {/* EDITOR */}
      <Container
        maxWidth="lg"
        sx={{
          pt: {
            xs: 3,
            md: 4,
          },
        }}
      >
        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: 'minmax(0, 1fr)',

              lg: 'minmax(0, 1.75fr) 360px',
            },

            gap: {
              xs: 3,
              lg: 4,
            },

            alignItems: 'start',
          }}
        >
          {/* FORM */}
          <Stack
            spacing={3}
            sx={{
              minWidth: 0,
            }}
          >
            {children}
          </Stack>

          {/* SIDEBAR */}
          <Box
            component="aside"
            sx={{
              minWidth: 0,

              display: {
                xs: 'none',
                lg: 'block',
              },

              position: 'sticky',
              top: 120,

              maxHeight: 'calc(100vh - 140px)',

              overflowY: 'auto',

              scrollbarWidth: 'thin',
            }}
          >
            {sidebar}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
