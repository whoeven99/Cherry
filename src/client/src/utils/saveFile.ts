import { saveAs } from 'file-saver';

export const saveLocaleFiles = (filename: string, content: string): void => {
  const blob = new Blob([content], { type: 'application/json,charset=utf-8;' });
  saveAs(blob, `${filename}.json`);
};
