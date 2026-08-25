import {
  ArrowForward,
} from '@mui/icons-material';

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

interface LibraryCategoryCardProps {
  title: string;
  description: string;
  count: number;
  path: string;
}

export function LibraryCategoryCard({
  title,
  description,
  count,
  path,
}: LibraryCategoryCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
      }}
    >
      <CardActionArea
        onClick={() => navigate(path)}
        sx={{
          height: '100%',
        }}
      >
        <CardContent
          sx={{
            p: 3,
            height: '100%',
          }}
        >
          <Stack
            spacing={3}
            sx={{
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Stack spacing={2}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h5">
                  {title}
                </Typography>

                <Chip
                  label={count}
                  size="small"
                />
              </Box>

              <Typography
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                {description}
              </Typography>
            </Stack>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 600 }}
              >
                Explore
              </Typography>

              <ArrowForward fontSize="small" />
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}