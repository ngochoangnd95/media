import { extractPath } from '@/utils';

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

export const getFilePath = (input: any) => {
  return (input.originFileObj as File).path;
};
