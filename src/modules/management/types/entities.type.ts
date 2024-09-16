import { medias } from '../db/schemas/medias.schema';
import { sources } from '../db/schemas/sources.schema';
import { tags } from '../db/schemas/tags.schema';

export type Media = typeof medias.$inferSelect;

export type Tag = typeof tags.$inferSelect;

export type Source = typeof sources.$inferSelect;

export type MediaWithTagsAndSource = Media & {
  tags: Tag[];
  source: Source | null;
};
