/* eslint-disable import/prefer-default-export */
import fs from 'fs';
// import path from 'path';

// Verificación de la existencia de la ruta
export const isValidatedPath = (directory) => fs.existsSync(directory);
console.log('¿La ruta existe?', isValidatedPath('filesTest'));
