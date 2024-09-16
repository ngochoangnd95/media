import { relations } from 'drizzle-orm';
import { integer, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core';
import { medias } from './medias.schema';
import { tags } from './tags.schema';

export const mediasToTags = sqliteTable(
  'medias_to_tags',
  {
    mediaId: integer('media_id')
      .notNull()
      .references(() => medias.id),
    tagId: integer('tag_id')
      .notNull()
      .references(() => tags.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.mediaId, t.tagId] }),
  }),
);

export const mediasToTagsRelations = relations(mediasToTags, ({ one }) => ({
  media: one(medias, {
    fields: [mediasToTags.mediaId],
    references: [medias.id],
  }),
  tag: one(tags, {
    fields: [mediasToTags.tagId],
    references: [tags.id],
  }),
}));
