import { Validate } from '@/decorators';
import { count, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db';
import { mediasToTags } from '../db/schemas/medias-to-tags.schema';
import { medias } from '../db/schemas/medias.schema';
import { sources } from '../db/schemas/sources.schema';
import { tags } from '../db/schemas/tags.schema';
import { findManyMediasSchema } from '../schemas/medias.schema';
import { MediaWithTagsAndSources } from '../types/entities.type';
import { FindManyMediasData, FindManyMediasParams } from '../types/medias.type';

export class MediasApi {
  @Validate(findManyMediasSchema)
  async findMany(params: FindManyMediasParams): Promise<FindManyMediasData | undefined> {
    try {
      const { page, limit } = params;

      // count total of satisfied records
      const [{ total }] = await db.select({ total: count() }).from(medias);

      // create a subquery to limit
      const subquery = db
        .select()
        .from(medias)
        .offset((page - 1) * limit)
        .limit(limit)
        .as('subquery');

      // create a prepared statement which use infer join with related tables
      const prepared = db
        .select({
          media: subquery._.selectedFields,
          tag: tags,
          source: sources,
        })
        .from(subquery)
        .leftJoin(sources, eq(subquery.sourceId, sources.id))
        .leftJoin(mediasToTags, eq(subquery.id, mediasToTags.mediaId))
        .innerJoin(tags, eq(mediasToTags.tagId, tags.id))
        .prepare();

      // get query results
      const results = prepared.all();

      // group by media id
      const grouped = results.reduce<Record<number, MediaWithTagsAndSources>>((acc, row) => {
        const { media, tag, source } = row;
        if (!acc[media.id]) {
          acc[media.id] = {
            ...media,
            tags: [],
            source: null,
          };
        }
        if (tag) {
          acc[media.id].tags.push(tag);
        }
        if (source) {
          acc[media.id].source = source;
        }
        return acc;
      }, {});

      return {
        items: Object.values(grouped),
        total,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('issues', error.issues);
        return;
      }
      console.error(error);
    }
  }
}
