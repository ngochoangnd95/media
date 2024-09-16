import { paginationSchema } from '@/modules/common/schemas/pagination.schema';
import { z } from 'zod';

export const findManyMediasSchema = z.object({}).merge(paginationSchema);
