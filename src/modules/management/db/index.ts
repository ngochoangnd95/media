import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

const client = new Database('./media.db');

export const db = drizzle(client, { schema });
