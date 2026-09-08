import { Chip } from '@mui/material';

import type { Creature } from '../types/creature';

interface ThreatChipProps {
  level: Creature['threatLevel'];
}

export function ThreatChip({ level }: ThreatChipProps) {
  return (
    <Chip
      size="small"
      variant="outlined"
      label={`Threat: ${level}`}
      color={
        level === 'Extreme'
          ? 'error'
          : level === 'High'
            ? 'warning'
            : level === 'Moderate'
              ? 'warning'
              : 'success'
      }
    />
  );
}
