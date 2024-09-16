import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { dbFilePath } from '../constants';
import { schema } from './schema';

const client = new Database(dbFilePath);

export const db = drizzle(client, { schema });
