import { Validate } from '@/decorators';
import { count, eq, inArray } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db';
import { mediasToTags } from '../db/schemas/medias-to-tags.schema';
import { medias } from '../db/schemas/medias.schema';
import { sources } from '../db/schemas/sources.schema';
import { tags } from '../db/schemas/tags.schema';
import { createMediaSchema, findManyMediasSchema } from '../schemas/medias.schema';
import { MediaWithTagsAndSource, Source, Tag } from '../types/entities.type';
import {
  CreateMediaData,
  CreateMediaParams,
  FindManyMediasData,
  FindManyMediasParams,
} from '../types/medias.type';

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
      const grouped = results.reduce<Record<number, MediaWithTagsAndSource>>((acc, row) => {
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

  @Validate(createMediaSchema)
  async create(params: CreateMediaParams): Promise<CreateMediaData | undefined> {
    try {
      const { tagIds, ...mediaDto } = params;

      // check source exists
      let existingSource: Source | null = null;
      if (mediaDto.sourceId) {
        existingSource = (
          await db.select().from(sources).where(eq(sources.id, mediaDto.sourceId))
        )[0];
      }

      // insert new media
      const [newMedia] = await db
        .insert(medias)
        .values({ ...mediaDto, sourceId: existingSource?.id })
        .returning();

      // check tags exist
      let existingTags: Tag[] = [];
      if (tagIds && tagIds.length > 0) {
        existingTags = await db.select().from(tags).where(inArray(tags.id, tagIds));
        // then insert new media-tag relationships to junction table
        await db.insert(mediasToTags).values(
          existingTags.map(({ id: tagId }) => ({
            tagId,
            mediaId: newMedia.id,
          })),
        );
      }

      return {
        data: {
          ...newMedia,
          source: existingSource,
          tags: existingTags,
        },
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('issues', error.issues);
      }
      console.error(error);
    }
  }
}
