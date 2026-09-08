import {
  AutoStoriesOutlined,
  DescriptionOutlined,
  PersonSearchOutlined,
} from '@mui/icons-material';

import { Box } from '@mui/material';

import { StatCard } from './StatCard';

interface MyCreaturesStatsProps {
  total: number;
  published: number;
  drafts: number;
}

export function MyCreaturesStats({
  total,
  published,
  drafts,
}: MyCreaturesStatsProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(3, 1fr)',
        },
        gap: 2,
      }}
    >
      <StatCard
        icon={<PersonSearchOutlined />}
        title="Total Creatures"
        value={total}
        description="All creatures you've created"
      />

      <StatCard
        icon={<AutoStoriesOutlined />}
        title="Published"
        value={published}
        description="Visible to the community"
      />

      <StatCard
        icon={<DescriptionOutlined />}
        title="Drafts"
        value={drafts}
        description="Still in progress"
      />
    </Box>
  );
}
