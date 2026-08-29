import { useState } from 'react';
import { Box } from '@mui/material';

const DEFAULT_CREATURE_IMAGE = '/images/creature-placeholder.png';

interface CreatureImageProps {
  src?: string | null;
  alt: string;
  height?: number | string;
}

export function CreatureImage({ src, alt, height = 220 }: CreatureImageProps) {
  const [imageSrc, setImageSrc] = useState(src || DEFAULT_CREATURE_IMAGE);

  return (
    <Box
      component="img"
      src={imageSrc}
      alt={alt}
      onError={() => {
        if (imageSrc !== DEFAULT_CREATURE_IMAGE) {
          setImageSrc(DEFAULT_CREATURE_IMAGE);
        }
      }}
      sx={{
        width: '100%',
        height,
        objectFit: 'cover',
        display: 'block',
      }}
    />
  );
}
