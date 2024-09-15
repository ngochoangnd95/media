import { dialog } from 'electron';
import { SaveToFileParams, SaveToFolderParams } from '../types/common.type';

export async function saveToFile({ defaultPath }: SaveToFileParams) {
  const { filePath, canceled } = await dialog.showSaveDialog({
    properties: ['createDirectory'],
    defaultPath,
  });
  return canceled ? undefined : filePath;
}

export async function saveToFolder({ defaultPath }: SaveToFolderParams) {
  const { filePaths, canceled } = await dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory'],
    defaultPath,
  });
  return canceled ? undefined : filePaths[0];
}
