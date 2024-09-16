import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { medias } from './medias.schema';

export const sources = sqliteTable('sources', {
  id: integer('id').primaryKey(),
  name: text('name'),
  url: text('url'),
});

export const sourcesRelations = relations(sources, ({ many }) => ({
  medias: many(medias),
}));
