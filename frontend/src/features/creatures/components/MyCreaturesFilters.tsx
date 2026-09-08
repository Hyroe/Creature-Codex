import { Search } from '@mui/icons-material';

import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';

export type StatusFilter = 'ALL' | 'PUBLISHED' | 'DRAFT';

export type ThreatFilter = 'ALL' | 'Low' | 'Moderate' | 'High' | 'Extreme';

export type SortOption = 'UPDATED' | 'NAME';

interface MyCreaturesFiltersProps {
  search: string;
  status: StatusFilter;
  threat: ThreatFilter;
  sort: SortOption;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onThreatChange: (value: ThreatFilter) => void;
  onSortChange: (value: SortOption) => void;
}

export function MyCreaturesFilters({
  search,
  status,
  threat,
  sort,
  onSearchChange,
  onStatusChange,
  onThreatChange,
  onSortChange,
}: MyCreaturesFiltersProps) {
  return (
    <Stack
      direction={{
        xs: 'column',
        md: 'row',
      }}
      spacing={2}
    >
      <TextField
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search your creatures..."
        size="small"
        sx={{
          flex: 1,
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      <FormControl
        size="small"
        sx={{
          minWidth: 170,
        }}
      >
        <Select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as StatusFilter)
          }
        >
          <MenuItem value="ALL">All statuses</MenuItem>

          <MenuItem value="PUBLISHED">Published</MenuItem>

          <MenuItem value="DRAFT">Draft</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        size="small"
        sx={{
          minWidth: 180,
        }}
      >
        <Select
          value={threat}
          onChange={(event) =>
            onThreatChange(event.target.value as ThreatFilter)
          }
        >
          <MenuItem value="ALL">All threat levels</MenuItem>

          <MenuItem value="Low">Low</MenuItem>

          <MenuItem value="Moderate">Moderate</MenuItem>

          <MenuItem value="High">High</MenuItem>

          <MenuItem value="Extreme">Extreme</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        size="small"
        sx={{
          minWidth: 170,
        }}
      >
        <Select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortOption)}
        >
          <MenuItem value="UPDATED">Recently updated</MenuItem>

          <MenuItem value="NAME">Name</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
