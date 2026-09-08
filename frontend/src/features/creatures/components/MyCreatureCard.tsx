import { useState } from 'react';

import {
  ArchiveOutlined,
  CreateOutlined,
  DescriptionOutlined,
  EditOutlined,
  MoreHoriz,
  VisibilityOutlined,
} from '@mui/icons-material';

import {
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';

import type { Creature } from '../types/creature';

import { CreatureImage } from './CreatureImage';
import { ThreatChip } from './ThreatChip';

interface MyCreatureCardProps {
  creature: Creature;
  onStatus: () => void;
  onArchive: () => void;
}

export function MyCreatureCard({
  creature,
  onStatus,
  onArchive,
}: MyCreatureCardProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const menuOpen = Boolean(anchorEl);

  const updatedLabel = creature.updatedAt
    ? new Date(creature.updatedAt).toLocaleDateString()
    : null;

  return (
    <Card
      variant="outlined"
      sx={{
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',

        transition: 'transform 0.2s ease, border-color 0.2s ease',

        '&:hover': {
          transform: 'translateY(-3px)',
          borderColor: 'primary.main',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <CreatureImage
          src={creature.gallery.coverImage?.url}
          alt={creature.gallery.coverImage?.alt ?? creature.name}
          height={220}
        />

        <Chip
          size="small"
          label={creature.status}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(15, 18, 16, 0.82)',
          }}
        />
      </Box>

      <Stack
        spacing={2}
        sx={{
          p: 2.5,
          flex: 1,
        }}
      >
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {creature.name}
          </Typography>

          {creature.scientificName && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontStyle: 'italic',
              }}
            >
              {creature.scientificName}
            </Typography>
          )}
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {creature.description}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <ThreatChip level={creature.threatLevel} />

          {updatedLabel && (
            <Typography variant="caption" color="text.secondary">
              Updated {updatedLabel}
            </Typography>
          )}
        </Stack>

        <Box
          sx={{
            borderTop: 1,
            borderColor: 'divider',
            pt: 1.5,
            mt: 'auto',
          }}
        >
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              alignItems: 'center',
            }}
          >
            {creature.status === 'Published' && (
              <Button
                size="small"
                startIcon={<VisibilityOutlined />}
                component={Link}
                to={`/creatures/${creature.slug}`}
              >
                View
              </Button>
            )}

            <Button
              size="small"
              startIcon={<DescriptionOutlined />}
              component={Link}
              to={`/creatures/${creature.id}/preview`}
            >
              Preview
            </Button>

            <Button
              size="small"
              startIcon={<EditOutlined />}
              component={Link}
              to={`/creatures/${creature.id}/edit`}
            >
              Edit
            </Button>

            <IconButton
              size="small"
              onClick={(event) => setAnchorEl(event.currentTarget)}
              sx={{
                ml: 'auto',
              }}
            >
              <MoreHoriz />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  onStatus();
                }}
              >
                <CreateOutlined
                  fontSize="small"
                  sx={{
                    mr: 1.5,
                  }}
                />

                {creature.status === 'Published' ? 'Unpublish' : 'Publish'}
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  onArchive();
                }}
                sx={{
                  color: 'error.main',
                }}
              >
                <ArchiveOutlined
                  fontSize="small"
                  sx={{
                    mr: 1.5,
                  }}
                />
                Archive
              </MenuItem>
            </Menu>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}
