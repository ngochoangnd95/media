import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { mediasToTags } from './medias-to-tags.schema';

export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey(),
  name: text('name'),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  medias: many(mediasToTags),
}));
