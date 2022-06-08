import {
  validatePath,
  convertAbsolutePath,
  recursionToGetFiles,
  getFilesMd,
  validatedLinks,
  getAllLinks,
} from './mdFunctions.js';

// ! -------------------------------------------------------------------------------

export const mdLinks = (path, options) => new Promise((resolve, reject) => {
  if (!validatePath(path)) {
    reject(new Error('The path entered does not exist'));
  } else {
    const AbsolutePath = convertAbsolutePath(path);

    const allFiles = recursionToGetFiles(AbsolutePath);

    if (allFiles.length === 0) {
      reject(new Error('There is no file in the entered path'));
    } else {
      const mdFiles = getFilesMd(allFiles);

      if (mdFiles.length === 0) {
        reject(new Error('There are no MD files in the entered path'));
      } else {
        const links = [];
        mdFiles.forEach((file) => {
          links.push(...getAllLinks(file));
        });

        if (links.length === 0) {
          reject(new Error('There are no links in the entered route'));
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
