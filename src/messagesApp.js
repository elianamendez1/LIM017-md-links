import CFonts from 'cfonts';
import gradient from 'gradient-string';
import { table } from 'table';
import chalk from 'chalk';
import { totalLinks, uniqueLinks, brokenLinks } from './functionsCli.js';

export const welcome = () => {
  const line = '═══════════════════════════════════════════════════════════════════════ \n';
  const niceGradient = gradient(['#58167D', '#E2DF36', '#B20053', '#850F5B']);

  console.log(niceGradient(line));

  // Estilo del nombre
  CFonts.say('md-links', {
    font: 'block',
    align: 'left',
    colors: ['system'],
    letterSpacing: 1,
    lineHeight: 0,
    space: false,
    maxLength: '0',
    gradient: ['#58167D', '#E2DF36', '#B20053', '#850F5B'],
    independentGradient: false,
    transitionGradient: true,
    env: 'node',
  });

  // Estilo de descripción
  CFonts.say('  link checker', {
    font: 'console',
    align: 'left',
    colors: ['system'],
    letterSpacing: 3,
    lineHeight: 1,
    space: false,
    maxLength: '0',
    length: '2',
    gradient: ['#58167D', '#E2DF36', '#B20053', '#850F5B'],
    independentGradient: false,
    transitionGradient: true,
    env: 'node',
  });

  console.log(niceGradient(line));
};

export const help = () => {
  console.log(`
      "Usage: md-links <path> [option]"

      Note: You can also use the alias command.           i.e. md-links -h
                                                               md-links -v
                                                               md-links ./some/example.md -s
                                                               md-links ./some/example.md -va
                                                               md-links ./some/example.md -s -va
    `);

  const info = [
    [
      `${chalk.hex('#E2DF36').bold('OPTIONS')}`,
      `${chalk.hex('#E2DF36').bold('ALIAS')}`,
      `${chalk.hex('#E2DF36').bold('DESCRIPTION')}`,
      `${chalk.hex('#E2DF36').bold('EXAMPLE')}`,
    ],
    ['--help', '-h', 'Use to display this help', 'md-links --help'],
    [
      '--version',
      '-v',
      'Use to display the version of this\nmd-links package',
      'md-links --version',
    ],
    [
      '--validate',
      '-va',
      'Use to display a list of extra link\ninformation (StatusCode, and Ok or\nFail)',
      'md-links ./some/example.md --validate',
    ],
    [
      '--stats',
      '-s',
      'Use to display statistical link\ninformation (Total links and Unique\nlinks)',
      'md-links ./some/example.md --stats',
    ],
    [
      '--stats --validate',
      '-s -va',
      'Use to display statistical link\ninformation (Total links, Unique\nlinks and Broken Liks)',
      'md-links ./some/example.md --stats\n--validate',
    ],
    [
      'Empty option',
      '',
      'Use to display a list of basic link\ninformation',
      'md-links ./some/example.md',
    ],
  ];
  // Controla las medidas de mi tabla.
  const configTable = {
    columns: {
      0: { width: 20 },
      1: { width: 8 },
      2: { width: 37 },
      3: { width: 40 },
    },
  };
  console.log(table(info, configTable));
  console.log('\n');
};

export const statsValidate = (links) => {
  const info = [
    [`${chalk.hex('#E2DF36').bold('Total Links')}`, `${totalLinks(links)}`],
    [`${chalk.hex('#E2DF36').bold('Unique Links')}`, `${uniqueLinks(links)}`],
    [`${chalk.hex('#E2DF36').bold('Broken Links')}`, `${brokenLinks(links)}`],
  ];

  console.log('\nOptions selected: --stats and --validate\n');

  const configTable = {
    columns: {
      0: { width: 15 },
      1: { width: 2 },
    },
  };
  console.log(table(info, configTable));
  console.log('\n');
};

export const stats = (links) => {
  const info = [
    [`${chalk.hex('#E2DF36').bold('Total Links')}`, `${totalLinks(links)}`],
    [`${chalk.hex('#E2DF36').bold('Unique Links')}`, `${uniqueLinks(links)}`],
  ];

  console.log('\nOption selected: --stats\n');

  const config = {
    columns: {
      0: { width: 15 },
      1: { width: 2 },
    },
  };
  console.log(table(info, config));
  console.log('\n');
};

export const tableLinksValidated = (links) => {
  console.log('\nOption selected: --validate\n');

  const arrLinks = links.map((link) => [
    link.text.slice(0, 51),
    link.href,
    link.file,
    link.statusCode,
    link.message,
  ]);

  arrLinks.unshift([
    `${chalk.hex('#E2DF36').bold('Text')}`,
    `${chalk.hex('#E2DF36').bold('URL')}`,
    `${chalk.hex('#E2DF36').bold("File's path where link\nwas found")}`,
    `${chalk.hex('#E2DF36').bold('Status\nCode')}`,
    `${chalk.hex('#E2DF36').bold('Message')}`,
  ]);

  const configTable = {
    columns: {
      0: { width: 35 },
      1: { width: 30 },
      2: { width: 25 },
      3: { width: 8 },
      4: { width: 8 },
    },
  };
  console.log(table(arrLinks, configTable));
  console.log('\n');
};

export const tableLinks = (links) => {
  console.log('\nOption selected: NONE\n');

  const arrlinks = links.map((link) => [link.text.slice(0, 51), link.href, link.file]);

  arrlinks.unshift([
    `${chalk.hex('#E2DF36').bold('Text')}`,
    `${chalk.hex('#E2DF36').bold('URL')}`,
    `${chalk.hex('#E2DF36').bold("File's path where link\nwas found")}`,
  ]);

  const config = {
    columns: {
      0: { width: 35 },
      1: { width: 35 },
      2: { width: 35 },
    },
  };
  console.log(table(arrlinks, config));
  console.log('\n');
};

// Lanza los mensajes de error con formato en letras amarillas
export const outputMessage = (str) => `${chalk.yellow(str)}`;
// Lanza los mensajes de error con formato en letras rojas
export const errorMessage = (str) => `${chalk.redBright(str)}`;
