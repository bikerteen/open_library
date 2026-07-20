export type ToolTag = {
  id: string;
  name: string;
};

export type ToolWithTags = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  category: string;
  pricing: string;
  icon: string;
  featured: boolean;
  tags: ToolTag[];
  createdAt: string;
  updatedAt: string;
};
