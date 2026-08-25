import { Link } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

interface LibraryEntityLinkProps {
  name: string;
  to: string;
}

export function LibraryEntityLink({
  name,
  to,
}: LibraryEntityLinkProps) {
  return (
    <MuiLink
      component={Link}
      to={to}
      underline="hover"
      sx={{
        fontWeight: 500,
      }}
    >
      {name}
    </MuiLink>
  );
}