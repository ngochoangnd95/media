import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { mediasToTags } from './medias-to-tags.schema';
import { sources } from './sources.schema';

export const medias = sqliteTable('medias', {
  id: integer('id').primaryKey(),
  name: text('name'),
  url: text('url'),
  path: text('path'),
  type: text('type', { enum: ['image', 'video'] }).notNull(),
  rate: integer('rate'),
  sourceId: integer('source_id'),
});

export const mediasRelations = relations(medias, ({ many, one }) => ({
  tags: many(mediasToTags),
  source: one(sources, {
    fields: [medias.sourceId],
    references: [sources.id],
  }),
}));
