import { IpcRendererEvent } from 'electron';
import { z } from 'zod';
import { ProcessEvent } from '../constants';
import {
  editSchema,
  mergeSchema,
  takeScreenshotSchema,
  trimBlankBorderSchema,
} from '../schemas/video-editor.schema';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Listener = (event: IpcRendererEvent, name: ProcessEvent, ...args: any[]) => void;

export type EditParams = z.infer<typeof editSchema>;

export type MergeParams = z.infer<typeof mergeSchema>;

export type TakeScreenshotParams = z.infer<typeof takeScreenshotSchema>;

export type TrimBlankBorderParams = z.infer<typeof trimBlankBorderSchema>;
