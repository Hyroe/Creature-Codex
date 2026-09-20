import SearchOutlined from '@mui/icons-material/SearchOutlined';

import {
  Box,
  InputAdornment,
  Paper,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export type ThreatFilter = 'All' | 'Low' | 'Moderate' | 'High' | 'Extreme';

interface CreatureFiltersProps {
  search: string;
  threat: ThreatFilter;

  onSearchChange: (value: string) => void;
  onThreatChange: (value: ThreatFilter) => void;
}

const threatValues: ThreatFilter[] = [
  'All',
  'Low',
  'Moderate',
  'High',
  'Extreme',
];

const marks = [
  {
    value: 0,
    label: 'All',
  },
  {
    value: 1,
    label: 'Low',
  },
  {
    value: 2,
    label: 'Moderate',
  },
  {
    value: 3,
    label: 'High',
  },
  {
    value: 4,
    label: 'Extreme',
  },
];

export function CreatureFilters({
  search,
  threat,
  onSearchChange,
  onThreatChange,
}: CreatureFiltersProps) {
  const threatIndex = threatValues.indexOf(threat);

  function handleThreatChange(_event: Event, value: number | number[]) {
    if (Array.isArray(value)) {
      return;
    }

    const nextThreat = threatValues[value];

    if (nextThreat) {
      onThreatChange(nextThreat);
    }
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        p: {
          xs: 2,
          md: 3,
        },

        borderRadius: 2,

        backgroundColor: 'background.paper',
      }}
    >
      <Box
        sx={{
          display: 'grid',

          gridTemplateColumns: {
            xs: '1fr',
            md: 'minmax(280px, 1.2fr) minmax(320px, 1fr)',
          },

          gap: {
            xs: 3,
            md: 5,
          },

          alignItems: 'center',
        }}
      >
        {/* SEARCH */}
        <Stack spacing={1}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              textTransform: 'uppercase',

              letterSpacing: '0.08em',

              fontWeight: 600,
            }}
          >
            Search
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="Search by name or scientific name..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined
                      fontSize="small"
                      sx={{
                        color: 'text.secondary',
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>

        {/* THREAT LEVEL */}
        <Stack spacing={0.5}>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform: 'uppercase',

                letterSpacing: '0.08em',

                fontWeight: 600,
              }}
            >
              Threat level
            </Typography>

            <Typography
              variant="body2"
              color="primary"
              sx={{
                fontWeight: 600,
              }}
            >
              {threat}
            </Typography>
          </Stack>

          <Box
            sx={{
              px: 1.5,
              pt: 1,
            }}
          >
            <Slider
              value={threatIndex}
              min={0}
              max={4}
              step={1}
              marks={marks}
              track={false}
              onChange={handleThreatChange}
              aria-label="Threat level"
              sx={{
                '& .MuiSlider-markLabel': {
                  fontSize: '0.72rem',
                  color: 'text.secondary',
                },

                '& .MuiSlider-markLabelActive': {
                  color: 'text.primary',
                },

                '& .MuiSlider-thumb': {
                  width: 16,
                  height: 16,
                },

                '& .MuiSlider-rail': {
                  opacity: 0.35,
                },
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}
