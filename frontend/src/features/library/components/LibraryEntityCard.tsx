import {
  ArrowForward,
} from '@mui/icons-material';

import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

interface LibraryEntityCardProps {
  name: string;
  description: string;
  type?: string;
  path: string;
}

export function LibraryEntityCard({
  name,
  description,
  type,
  path,
}: LibraryEntityCardProps) {
  const navigate = useNavigate();

  return (
    <Card variant="outlined">
      <CardActionArea onClick={() => navigate(path)}>
        <CardContent>
          <Stack spacing={2}>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">
                {name}
              </Typography>

              {type && (
                <Chip
                  label={type}
                  size="small"
                  variant="outlined"
                />
              )}
            </Stack>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.6,
              }}
            >
              {description}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                }}
              >
                View details
              </Typography>

              <ArrowForward fontSize="small" />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}