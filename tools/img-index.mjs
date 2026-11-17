// Writes img/index.json (the list of card pictures the service worker caches): node tools/img-index.mjs
import fs from 'node:fs';
import path from 'node:path';
const dir = path.resolve(import.meta.dirname, '..', 'img');
fs.writeFileSync(path.join(dir, 'index.json'), JSON.stringify(fs.readdirSync(dir).filter(f => f.endsWith('.png')).sort()));
console.log('img/index.json updated');
