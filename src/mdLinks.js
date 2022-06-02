import { convertPathAbsolute, isValidatedPath } from './mdFunctions';

// ! -------------------------------------------------------------------------------

export const mdLinks = (path, options) => new Promise((resolve, reject) => {
  if (!isValidatedPath(path)) {
    reject('La ruta ingresada no existe');
  } else {
    const AbsolutePath = convertPathAbsolute(path);
  }
});
