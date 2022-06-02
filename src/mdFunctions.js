import fs from 'fs';
import path from 'path';

// Verificamos la existencia de la ruta
export const validatePath = (directory) => fs.existsSync(directory);
console.log('¿La ruta existe?', validatePath('filesTest'));

// Si la ruta es relativa la convertimos a absoluta
export const convertPathAbsolute = (url) => (!path.isAbsolute(url) ? path.resolve(url) : url);
console.log('La ruta es relativa ahora la convertimos:', convertPathAbsolute('filesTest'));

// Comprobamos si la ruta es una carpeta
export const pathDirectory = (route) => {
  const statsObj = fs.lstatSync(route);
  return statsObj.isDirectory();
};
console.log('¿La ruta es un directorio?', pathDirectory('filesTest'));

// Comprobamos si la ruta es un archivo
export const pathFile = (route) => {
  const statsObj = fs.lstatSync(route);
  return statsObj.isFile();
};
console.log('¿La ruta es un archivo?', pathFile('filesTest'));

// Leemos el contenido de archivos específicos
export const readFile = (file) => fs.readFileSync(file, 'utf-8');
console.log('leeeeee un archivoooo');
