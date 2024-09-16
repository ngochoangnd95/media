import { paginationSchema } from '@/modules/common/schemas/pagination.schema';
import { z } from 'zod';
import { MediaType } from '../constants';

export const findManyMediasSchema = z.object({}).merge(paginationSchema);

export const createMediaSchema = z.object({
  name: z.string().optional(),
  url: z.string().optional(),
  path: z.string().optional(),
  type: z.nativeEnum(MediaType),
  rate: z.number().int().nonnegative().max(10),
  sourceId: z.number().int().optional(),
  tagIds: z.array(z.number().int()).optional(),
});
