import { promises as fs } from 'fs';

export default async function getData() {
  const file = await fs.readFile(process.cwd() + '/data/data.json', 'utf8');
  const res = JSON.parse(file);

 
  return res;
}