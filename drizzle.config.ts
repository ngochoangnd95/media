import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/modules/management/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: './media.db',
  },
  verbose: true,
  strict: true,
});
