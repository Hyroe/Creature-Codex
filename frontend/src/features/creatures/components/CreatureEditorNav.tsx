import {
  AutoAwesomeOutlined,
  CollectionsOutlined,
  ForestOutlined,
  ShieldOutlined,
} from '@mui/icons-material';

import { Box, Button, Container, Stack } from '@mui/material';

const sections = [
  {
    id: 'basic-information',
    label: 'Basic Information',
    icon: <AutoAwesomeOutlined />,
  },
  {
    id: 'ecology',
    label: 'Ecology',
    icon: <ForestOutlined />,
  },
  {
    id: 'combat',
    label: 'Combat',
    icon: <ShieldOutlined />,
  },
  {
    id: 'gallery',
    label: 'Gallery',
    icon: <CollectionsOutlined />,
  },
];

export function CreatureEditorNav() {
  function handleNavigate(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  return (
    <Box
      sx={{
        position: 'sticky',

        // Navbar is already occupying the top.
        top: {
          xs: 56,
          sm: 64,
        },

        zIndex: (theme) => theme.zIndex.appBar - 1,

        borderBottom: 1,
        borderColor: 'divider',

        backgroundColor: 'rgba(16, 19, 16, 0.96)',

        backdropFilter: 'blur(14px)',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            py: 1,

            overflowX: 'auto',

            '&::-webkit-scrollbar': {
              display: 'none',
            },

            scrollbarWidth: 'none',
          }}
        >
          {sections.map((section) => (
            <Button
              key={section.id}
              type="button"
              color="inherit"
              size="small"
              startIcon={section.icon}
              onClick={() => handleNavigate(section.id)}
              sx={{
                whiteSpace: 'nowrap',

                color: 'text.secondary',

                px: 1.5,

                '&:hover': {
                  color: 'primary.main',

                  backgroundColor: 'rgba(211, 163, 72, 0.07)',
                },
              }}
            >
              {section.label}
            </Button>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
