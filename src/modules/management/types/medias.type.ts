import { Pageable } from '@/modules/common/types/pagination.type';
import { z } from 'zod';
import { findManyMediasSchema } from '../schemas/medias.schema';
import { MediaWithTagsAndSources } from './entities.type';

export type FindManyMediasParams = z.infer<typeof findManyMediasSchema>;
export type FindManyMediasData = Pageable<MediaWithTagsAndSources>;
