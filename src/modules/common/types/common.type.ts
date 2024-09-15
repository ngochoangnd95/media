import { z } from 'zod';
import { saveToFileSchema, saveToFolderSchema } from '../schemas/common.schema';

export type SaveToFileParams = z.infer<typeof saveToFileSchema>;

export type SaveToFolderParams = z.infer<typeof saveToFolderSchema>;
