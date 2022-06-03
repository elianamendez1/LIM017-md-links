import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// Verificamos la existencia de la ruta
export const validatePath = (directory) => fs.existsSync(directory);
console.log('¿La ruta existe?', validatePath('filesTest'));

// Si la ruta es relativa la convertimos a absoluta
export const convertAbsolutePath = (url) => (!path.isAbsolute(url) ? path.resolve(url) : url);
console.log('La ruta es relativa ahora la convertimos:', convertAbsolutePath('filesTest'));

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

export const getFilesMd = (files) => {
  const mdFiles = files.filter((file) => path.extname(file) === '.md');
  return mdFiles.length > 0 ? mdFiles : [];
};
console.log(getFilesMd, 'funcioooon de traer archivos');

export const recursionToGetFiles = (route) => {
  const filesArr = [];
  if (pathFile(route)) {
    return [route];
  }
  const files = fs.readdirSync(route);
  files.forEach((file) => {
    const newPath = path.join(route, file);
    filesArr.push(recursionToGetFiles(newPath));
  });
  return filesArr.flat();
};
console.log(recursionToGetFiles('filesTest'), 'recurrrsioooon');

export const getAllLinks = (track) => {
  const pathAbsolute = convertAbsolutePath(track);
  const fileContent = readFile(pathAbsolute);
  const argumentsMdLinks = /\[([^[]+)\](\(.*\))/gm;
  const croosLinks = fileContent.match(argumentsMdLinks);
  if (!croosLinks) return [];
  const singleCross = /\[([^[]+)\]\((.*)\)/;
  const links = [];
  for (let i = 0; i < croosLinks.length; i += 1) {
    const text = singleCross.exec(croosLinks[i]);
    links.push({
      text: text[1],
      href: text[2],
      file: pathAbsolute,
    });
  }
  return links;
};
console.log(getAllLinks('filesTest/test.md'));

export const validatedLink = (link) => new Promise((resolve) => {
  const paramLink = link;
  fetch(link.href)
    .then((response) => {
      paramLink.statusCode = response.status;
      paramLink.message = 'Ok';
      resolve(link);
    })
    .catch(() => {
      paramLink.statusCode = 404;
      paramLink.message = 'Fail';
      resolve(link);
    });
});
// console.log(validatedLink('https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map'));

export const validatedLinks = (links) => new Promise((resolve) => {
  // es un array de promesas
  const newLinks = [];
  links.forEach((link) => newLinks.push(validatedLink(link)));
  // eslint-disable-next-line no-promise-executor-return
  return Promise.all(newLinks)
    .then((res) => resolve(res))
    .catch((err) => err);
});
