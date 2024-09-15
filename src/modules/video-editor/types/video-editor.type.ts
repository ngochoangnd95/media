import { z } from 'zod';
import {
  editSchema,
  mergeSchema,
  takeScreenshotSchema,
  trimBlankBorderSchema,
} from '../schemas/video-editor.schema';

export type EditParams = z.infer<typeof editSchema>;

export type MergeParams = z.infer<typeof mergeSchema>;

export type TakeScreenshotParams = z.infer<typeof takeScreenshotSchema>;

export type TrimBlankBorderParams = z.infer<typeof trimBlankBorderSchema>;
