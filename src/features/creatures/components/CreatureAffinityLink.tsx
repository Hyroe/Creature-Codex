import { Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

import {
  getAffinityTargetName,
  getAffinityTargetPath,
} from '../selectors/creatureSelectors';

import type { CreatureAffinity } from '../types/creatureAffinity';

interface CreatureAffinityLinkProps {
  affinity: CreatureAffinity;
}

export function CreatureAffinityLink({
  affinity,
}: CreatureAffinityLinkProps) {
  const name = getAffinityTargetName(
    affinity.targetType,
    affinity.targetId,
  );

  const path = getAffinityTargetPath(
    affinity.targetType,
    affinity.targetId,
  );

  if (!name || !path) {
    return null;
  }

  return (
    <MuiLink
      component={Link}
      to={path}
      underline="hover"
      sx={{
        fontWeight: 500,
      }}
    >
      {name}
    </MuiLink>
  );
}