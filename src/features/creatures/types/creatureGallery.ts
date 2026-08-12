export interface CreatureImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

export interface CreatureGallery {
  coverImage: CreatureImage;
  images: CreatureImage[];
}