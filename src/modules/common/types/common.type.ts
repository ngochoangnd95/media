import { z } from 'zod';
import { saveToFileSchema, saveToFolderSchema } from '../schemas/common.schema';

export type SaveToFileParams = z.infer<typeof saveToFileSchema>;

export type SaveToFolderParams = z.infer<typeof saveToFolderSchema>;

export type Pageable<TItem> = {
  items: TItem[];
  total?: number;
};

export type Mutable<TData> = {
  data: TData;
};
