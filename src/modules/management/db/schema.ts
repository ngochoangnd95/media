import * as mediasToTagsSchema from './schemas/medias-to-tags.schema';
import * as mediasSchema from './schemas/medias.schema';
import * as sourcesSchema from './schemas/sources.schema';
import * as tagsSchema from './schemas/tags.schema';

export const schema = {
  ...mediasSchema,
  ...tagsSchema,
  ...mediasToTagsSchema,
  ...sourcesSchema,
};
