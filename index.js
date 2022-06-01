// eslint-disable-next-line no-unused-vars
const fs = require('fs');
const path = require('path');

// eslint-disable-next-line max-len
const convertToAbsolute = (inputPath) => (path.isAbsolute(inputPath) ? inputPath : path.resolve(inputPath));

console.log(convertToAbsolute);
