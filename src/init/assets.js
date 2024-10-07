import fs, { read, readSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, '../../public/assets');

//파일읽는함수
//비동기병렬로 파일을 읽는다
const readFileAsync = (fileName) => {
    return new Promise((resolve, reject) => {
  
      fs.readFile(path.join(basePath, fileName), 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(JSON.parse(data));
      });
    });
  };

export const loadGameAssets = async () => {
    try {
        const [stage, item, itemUnlocks] = await Promise.all([
            readFileAsync('stage.json'),
            readFileAsync('item.json'),
            readFileAsync('item_unlock.json'),
        ]);
        const gameAssets = { stage, item, itemUnlocks };
        return gameAssets;
    } catch(e) {
        throw new Error('Failed to load game assets: '+ e.message);
    }
};

export const getGameAssets = () => {
    return gameAssets;
}