import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

export const validatePath = (directory) => fs.existsSync(directory);

export const convertAbsolutePath = (url) => (!path.isAbsolute(url) ? path.resolve(url) : url);

export const pathDirectory = (route) => fs.lstatSync(route).isDirectory();

export const pathFile = (route) => fs.lstatSync(route).isFile();

export const readFile = (file) => fs.readFileSync(file, 'utf-8');

export const getFilesMd = (files) => {
  const mdFiles = files.filter((file) => path.extname(file) === '.md');
  return mdFiles.length > 0 ? mdFiles : [];
};

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

export const validatedLinks = (links) => new Promise((resolve) => {
  const newLinks = [];
  links.forEach((link) => newLinks.push(validatedLink(link)));
  Promise.all(newLinks)
    .then((res) => resolve(res))
    .catch((err) => err);
});
