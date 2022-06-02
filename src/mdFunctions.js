import fs from 'fs';
import path from 'path';

// Verifica si la ruta existe
export const isValidatedPath = (directory) => fs.existsSync(directory);

// Verificamos si la ruta es absoluta
export const convertPathAbsolute = (url) => (!path.isAbsolute(url) ? path.resolve(url) : url);
console.log(isValidatedPath, convertPathAbsolute, 'lo convirtió???');

/* // fs.readFileSync : Metodo Síncrono que se encarga de leer el contenido de un archivo específico
export const readFile = (file) => fs.readFileSync(file, 'utf-8');
console.log(readFile);

// Verificamos si la ruta es un archivo
export const pathIsFile = (route) => {
  const statsObj = fs.lstatSync(route);
  return statsObj.isFile();
};

// Verificamos si la ruta es una carpeta
export const pathIsDirectory = (route) => {
  const statsObj = fs.lstatSync(route);
  return statsObj.isDirectory();
};
console.log(pathIsDirectory);
 */
