import fs from 'fs';
import path from 'path';

// Verificación de la existencia de la ruta
export const isValidatedPath = (directory) => fs.existsSync(directory);
console.log('¿La ruta existe?', isValidatedPath('filesTest'));

// Si la ruta es si es relativa la convertimos a absoluta
export const convertPathAbsolute = (url) => (!path.isAbsolute(url) ? path.resolve(url) : url);
console.log('La ruta es relativa ahora la convertimos:', convertPathAbsolute('filesTest'));
