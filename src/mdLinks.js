/* eslint-disable import/extensions */
import {
  validatePath,
  convertAbsolutePath,
  recursionToGetFiles,
  getFilesMd,
  validatedLinks,
  getAllLinks,
} from './mdFunctions.js';

// ! -------------------------------------------------------------------------------

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  if (!validatePath(path)) {
    reject(new Error('La ruta ingresada no existe'));
  } else {
    const AbsolutePath = convertAbsolutePath(path);

    const allFiles = recursionToGetFiles(AbsolutePath);

    if (allFiles.length === 0) {
      reject(new Error('No existe ningún archivo en la ruta ingresada'));
    } else {
      const mdFiles = getFilesMd(allFiles);
      // console.log("allFiles", allFiles);

      // console.log("miraaaaa mis MDFILES , ", mdFiles);
      if (mdFiles.length === 0) {
        reject(new Error('No existen archivos MD en la ruta ingresada'));
      } else {
        // console.log("mdFiles", mdFiles);

        const links = [];
        mdFiles.forEach((file) => {
          links.push(...getAllLinks(file));
        });

        if (links.length === 0) {
          reject(new Error('No existen links en la ruta ingresada'));
        } else if (options.validate) {
          resolve(validatedLinks(links));
        } else {
          resolve(links);
        }
      }
    }
  }
});

export default mdLinks;

console.log(mdLinks('filesTest'));
