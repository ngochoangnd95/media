import { extractPath } from '@/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const createOutputPath = (path: string, suffix: string) => {
  const { dirname, filename } = extractPath(path);
  return `${dirname}/${filename}_${suffix}.mp4`;
};
