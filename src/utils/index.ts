export const extractPath = (path: string) => {
  const dirname = path.slice(0, path.lastIndexOf('/'));
  const basename = path.slice(path.lastIndexOf('/') + 1);
  const filename = basename.slice(0, basename.lastIndexOf('.'));
  const extension = basename.slice(basename.lastIndexOf('.') + 1);
  return { dirname, basename, filename, extension };
};
