import { Mutable, Pageable } from '@/modules/common/types/common.type';
import { z } from 'zod';
import { createMediaSchema, findManyMediasSchema } from '../schemas/medias.schema';
import { MediaWithTagsAndSource } from './entities.type';

export type FindManyMediasParams = z.infer<typeof findManyMediasSchema>;
export type FindManyMediasData = Pageable<MediaWithTagsAndSource>;

export type CreateMediaParams = z.infer<typeof createMediaSchema>;
export type CreateMediaData = Mutable<MediaWithTagsAndSource>;
