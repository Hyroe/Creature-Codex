import ArrowOutwardOutlined from '@mui/icons-material/ArrowOutwardOutlined';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';

import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import type { Creature } from '../types/creature';

import { CreatureImage } from './CreatureImage';

interface CreatureCardProps {
  creature: Creature;
}

const threatStyles = {
  Low: {
    label: 'Low',
  },

  Moderate: {
    label: 'Moderate',
  },

  High: {
    label: 'High',
  },

  Extreme: {
    label: 'Extreme',
  },
} as const;

export function CreatureCard({ creature }: CreatureCardProps) {
  const navigate = useNavigate();

  const coverImage = creature.gallery.coverImage?.url ?? null;

  const threat = threatStyles[creature.threatLevel];

  const habitats = creature.ecology.habitats.slice(0, 2);

  const remainingHabitats = creature.ecology.habitats.length - habitats.length;

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        overflow: 'hidden',
        borderRadius: 2,

        backgroundColor: 'background.paper',

        transition:
          'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',

        '&:hover': {
          transform: 'translateY(-4px)',

          borderColor: 'rgba(211, 163, 72, 0.45)',

          boxShadow: '0 14px 40px rgba(0, 0, 0, 0.28)',
        },
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/creatures/${creature.slug}`)}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        {/* IMAGE */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              transition: 'transform 300ms ease',

              '.MuiCard-root:hover &': {
                transform: 'scale(1.025)',
              },
            }}
          >
            <CreatureImage src={coverImage} alt={creature.name} height={250} />
          </Box>

          {/* IMAGE GRADIENT */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,

              background:
                'linear-gradient(180deg, transparent 45%, rgba(0, 0, 0, 0.78) 100%)',

              pointerEvents: 'none',
            }}
          />

          {/* THREAT */}
          <Chip
            label={threat.label}
            size="small"
            variant="outlined"
            sx={{
              position: 'absolute',
              top: 14,
              right: 14,

              color: 'common.white',

              borderColor: 'rgba(255,255,255,0.35)',

              backgroundColor: 'rgba(10, 12, 10, 0.68)',

              backdropFilter: 'blur(8px)',

              fontWeight: 600,
            }}
          />

          {/* NAME OVER IMAGE */}
          <Box
            sx={{
              position: 'absolute',
              left: 18,
              right: 18,
              bottom: 15,
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                color: 'common.white',
                fontWeight: 600,
                lineHeight: 1.15,
              }}
            >
              {creature.name}
            </Typography>

            {creature.scientificName && (
              <Typography
                variant="body2"
                sx={{
                  mt: 0.5,

                  color: 'rgba(255,255,255,0.75)',

                  fontStyle: 'italic',
                }}
              >
                {creature.scientificName}
              </Typography>
            )}
          </Box>
        </Box>

        {/* CONTENT */}
        <Stack
          spacing={2}
          sx={{
            p: 2.25,
            flexGrow: 1,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',

              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',

              overflow: 'hidden',

              minHeight: '2.8em',
              lineHeight: 1.4,
            }}
          >
            {creature.description}
          </Typography>

          {/* HABITATS */}
          <Stack
            direction="row"
            spacing={0.75}
            useFlexGap
            sx={{
              mt: 'auto !important',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <PlaceOutlined
              sx={{
                fontSize: 17,
                color: 'text.secondary',
              }}
            />

            {habitats.length > 0 ? (
              <>
                {habitats.map((habitat) => (
                  <Chip
                    key={habitat.id}
                    label={habitat.name}
                    size="small"
                    variant="outlined"
                    sx={{
                      height: 24,

                      color: 'text.secondary',

                      '& .MuiChip-label': {
                        px: 1,
                      },
                    }}
                  />
                ))}

                {remainingHabitats > 0 && (
                  <Typography variant="caption" color="text.secondary">
                    +{remainingHabitats}
                  </Typography>
                )}
              </>
            ) : (
              <Typography variant="caption" color="text.secondary">
                No habitat documented
              </Typography>
            )}
          </Stack>

          {/* FOOTER */}
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              pt: 1,
              borderTop: 1,
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="caption"
              color="primary"
              sx={{
                textTransform: 'uppercase',

                letterSpacing: '0.06em',

                fontWeight: 600,
              }}
            >
              View entry
            </Typography>

            <ArrowOutwardOutlined
              sx={{
                fontSize: 18,
                color: 'text.secondary',

                transition: 'transform 180ms ease, color 180ms ease',

                '.MuiCard-root:hover &': {
                  transform: 'translate(2px, -2px)',

                  color: 'primary.main',
                },
              }}
            />
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
