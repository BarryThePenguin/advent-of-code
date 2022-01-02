import {readFile} from 'fs/promises';
import {resolve} from 'path';

export default (inputPath: string) => {
  const filePath = resolve('./input', inputPath);
  return readFile(filePath, 'utf8');
};
