import {
  Box,
  Button,
  ButtonGroup,
  TextField,
} from '@mui/material';

export type ThreatFilter =
  | 'All'
  | 'Low'
  | 'Moderate'
  | 'High'
  | 'Extreme';

interface CreatureFiltersProps {
  search: string;
  threat: ThreatFilter;
  onSearchChange: (value: string) => void;
  onThreatChange: (value: ThreatFilter) => void;
}

const threatFilters: ThreatFilter[] = [
  'All',
  'Low',
  'Moderate',
  'High',
  'Extreme',
];

export function CreatureFilters({
  search,
  threat,
  onSearchChange,
  onThreatChange,
}: CreatureFiltersProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        mb: 5,
      }}
    >
      <TextField
        fullWidth
        label="Search creatures"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <ButtonGroup variant="outlined">
        {threatFilters.map((filter) => (
          <Button
            key={filter}
            variant={threat === filter ? 'contained' : 'outlined'}
            onClick={() => onThreatChange(filter)}
          >
            {filter}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}