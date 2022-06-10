import fetch from "node-fetch";
import {
  getFilesMd,
  // recursionToGetFiles,
  getAllLinks,
  validatedLink,
  // validatedLinks,
} from '../src/mdFunctions';

// jest.mock("node-fetch", () => jest.fn());

jest.mock('node-fetch');

describe('getFilesMd function', () => {
  it('should return an array of files with ext name ".md" if list has md files', () => {
    const allFiles = [
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\emptymd.md',
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\filejs.js',
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\filemd.md',
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\filemd2.md',
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\filemd3.md',
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\filetext.txt',
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\mainFolder\\subCarpeta\\B.md',
    ];

    const mdFiles = [
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\emptymd.md',
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\filemd.md',
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\filemd2.md',
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\filemd3.md',
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\mainFolder\\subCarpeta\\B.md',
    ];

    expect(getFilesMd(allFiles)).toEqual(mdFiles);
  });
});

/* describe('recursionToGetFiles function', () => {
  it('should return an array of files if path contains files', () => {
    const path =
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest';

    const filesRecursive = [
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\test.md',
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\enlacesRotos.md',
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\sinEnlaces.md',
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test.md',
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test.txt',
    ];

    expect(recursionToGetFiles(path)).toEqual([filesRecursive]);
  });
}); */





describe("getAllLinks function", () => {
  it("should return an array of links (text, href, file) if the content of the file has links", () => {
    const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit..
    [LINK 1](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/)

    Lorem ipsum dolor sit amet, consectetur adipiscing elit..

    [LINK 2](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

    Lorem ipsum dolor sit amet, consectetur adipiscing elit..

    [LINK 3](https://curriculum.laboratoria.la/es/topics/javascript/05-objects/01-objects)`;

    const path =
      'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\test.md';
    const linksExpected = [
      {
        text: 'LINK 1',
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/',
        file: 'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\test.md',
      },
      {
        text: 'LINK 2',
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
        file: 'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\test.md',
      },
      {
        text: 'LINK 3',
        href: 'https://curriculum.laboratoria.la/es/topics/javascript/05-objects/01-objects',
        file: 'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\test.md',
      },
    ];
    expect(getAllLinks(path)).toEqual(linksExpected);
  });
});




// ! preguntar en test camp
describe("validatedLink function", () => {
  it("should return an object {text, href, file, statusCode, message} if the link is Working", () => {
    const link = {
      text: 'Markdown',
      href: 'https://es.wikipedia.org/wiki/Markdown',
      file: 'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\test.md',
    };

    const linkExpected = {
      text: 'Markdown',
      href: 'https://es.wikipedia.org/wiki/Markdown',
      file: 'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\test.md',
      statusCode: 200,
      message: 'Ok',
    };

    // expect(validatedLink(link)).toEqual(linkExpected);

    // fetch.mockResolvedValue({ status: 200, statusText: "OK" });
    // fetch.get.mockResolvedValue({ status: 200, statusText: "OK" });
    // axios.get.mockResolvedValue(linkExpected);
    validatedLink(link).then((res) => {
      expect(res).toEqual(linkExpected);
      // expect(res).toEqual(linkExpected);
    });
  });
});
