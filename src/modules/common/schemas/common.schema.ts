import { z } from 'zod';

export const saveToFileSchema = z.object({
  defaultPath: z.string(),
});

export const saveToFolderSchema = z.object({
  defaultPath: z.string(),
});
