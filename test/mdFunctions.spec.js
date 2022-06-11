import { fetch } from '../src/libraries.js';
import {
  getFilesMd,
  recursionToGetFiles,
  getAllLinks,
  validatedLink,
  validatedLinks,
} from '../src/mdFunctions.js';

jest.mock('node-fetch', () => jest.fn());

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

describe('recursionToGetFiles function', () => {
  it('should return an array of files if path contains files', () => {
    const links = [
      'filesTest\\enlacesRotos.md',
      'filesTest\\sinEnlaces.md',
      'filesTest\\test\\test.md',
    ];

    expect(recursionToGetFiles('filesTest')).toEqual(expect.arrayContaining(links));
  });
});

describe("getAllLinks function", () => {
  it("should return an array of links (text, href, file) if the content of the file has links", () => {
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

describe("validatedLink function", () => {
  it("should return an object {text, href, file, statusCode, message} if the link is Working", () => {
    fetch.mockResolvedValue({ status: 200, statusText: "ok" });
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
      message: 'ok',
    };
    return validatedLink(link)
    .then((res) => {
      expect(res).toEqual(linkExpected);
    });
  });

  it("should return an object {text, href, file, statusCode, message FAIL} if the link is Working", () => {
    fetch.mockRejectedValue({ status: 400, statusText: "fail" });
    const link = {
      text: 'Markdown',
      href: 'https://es.wikipdia.org/wiki/Markdown',
      file: 'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\test.md',
    };

    const linkExpected = {
      text: 'Markdown',
      href: 'https://es.wikipdia.org/wiki/Markdown',
      file: 'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\test.md',
      statusCode: 400,
      message: 'fail',
    };
    return validatedLink(link)
    .catch((res) => {
      expect(res).toEqual(linkExpected);
    });
  });
});


describe("validatedLinks function", () => {
  it("statusCode:200 | message:ok", async () => {
    fetch.mockResolvedValue({ status: 200, statusText: "ok" });
    const links =[
      {
        text: 'LINK 1',
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/',
        file: 'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\test.md',
        message: 'ok',
        statusCode: 200,
      },
      {
        text: 'LINK 2',
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
        file: 'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\test.md',
        message: 'ok',
        statusCode: 200,
      },
    {
      text: 'LINK 3',
      href: 'https://curriculum.laboratoria.la/es/topics/javascript/05-objects/01-objects',
      file: 'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\test.md',
      message: 'ok',
      statusCode: 200,
    },
  ];

    const linksExpected = [
      {
        text: 'LINK 1',
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/',
        file: 'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\test.md',
        message: 'ok',
        statusCode: 200,
      },
      {
        text: 'LINK 2',
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
        file: 'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\test.md',
        message: 'ok',
        statusCode: 200,
      },
      {
        text: 'LINK 3',
        href: 'https://curriculum.laboratoria.la/es/topics/javascript/05-objects/01-objects',
        file: 'C:\\Users\\ELIANA\\Documents\\LIM017-md-links\\filesTest\\test\\test.md',
        message: 'ok',
        statusCode: 200,
      },
    ];
    return validatedLinks((links))
    .then((res) => {
      expect(res).toEqual(linksExpected);
    });
  });
});
