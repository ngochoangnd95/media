import { z } from 'zod';
import { Flip, Rotate } from '../constants';

export const editSchema = z.object({
  input: z.string(),
  destination: z.string(),
  startTime: z
    .string()
    .regex(/^\d+$/)
    .or(z.string().regex(/^\d+:[0-5]\d:[0-5]\d(\.\d+)?$/))
    .optional(),
  endTime: z
    .string()
    .regex(/^\d+$/)
    .or(z.string().regex(/^\d+:[0-5]\d:[0-5]\d(\.\d+)?$/))
    .optional(),
  crop: z.string().optional(),
  rotate: z.nativeEnum(Rotate).optional(),
  flip: z.array(z.nativeEnum(Flip)).optional(),
});

export const mergeSchema = z.object({
  inputs: z.array(z.string()),
  destination: z.string(),
});

export const takeScreenshotSchema = z.object({
  input: z.string(),
  destination: z.string(),
  timestamps: z.array(
    z
      .string()
      .regex(/^\d+$/)
      .or(z.string().regex(/^\d+:[0-5]\d:[0-5]\d(\.\d+)?$/)),
  ),
});

export const trimBlankBorderSchema = z.object({
  input: z.string(),
});
