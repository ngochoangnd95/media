import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.number().positive(),
  limit: z.number().positive().max(100),
});
