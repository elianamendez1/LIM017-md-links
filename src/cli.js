#!/usr/bin/env node

import { program } from 'commander';
import { createSpinner } from 'nanospinner';
import { mdLinks } from './mdLinks.js';
import {
  welcome,
  help,
  statsValidate,
  stats,
  tableLinksValidated,
  tableLinks,
  errorMessage,
  outputMessage,
} from './messagesApp.js';

welcome();

const spinner = createSpinner('Loading request\n').start();

function handleAnswer(isCorrect) {
  if (isCorrect) {
    spinner.success({ text: 'Process was completed successfully!' });
    process.exit(0);
  } else {
    process.exit(1);
  }
}
// Para la versión del paquete
program.name('md-links').description('CLI to check links of markdown files');

program
  .argument('[ruta]') // En caso de no colocar ninguna ruta
  .option('-s,--stats')
  .option('-va,--validate')
  .option('-h,--help')
  .option('-v,--version');

program.configureOutput({
  writeErr: (str) => process.stdout.write(`\n${str}`),
  outputError: (str, write) => {
    write(errorMessage(`✖   ${str}\n`));
    help();
  },
});

program.parse(process.argv);

const options = program.opts();

// Al ingresar dos rutas sin opciones
if (program.args.length > 1) {
  console.error(errorMessage('\n✖  Error: You can only enter one path\n'));
  help();
  handleAnswer(false);
}

// Al ingresar más de dos opciones
if (Object.keys(options).length > 2) {
  console.error(errorMessage('\n✖  Error: Too much options\n'));
  help();
  handleAnswer(false);
} else {
  // Al ingresar una ruta y --help
  if (options.help) {
    if (program.args.length >= 1) {
      console.error(
        errorMessage(
          '\n✖  Error: It looks like you entered a path, remember that selecting the --help option will show help\n',
        ),
      );
      help();
      handleAnswer(false);
      // Si solo tiene --help
    } else if (Object.keys(options).length === 1) {
      console.log("\nYou've selected the --help option\n");
      help();
      handleAnswer(false);
      // Si seleccionada + de 1 opción como -h -v con --help
    } else if (Object.keys(options).length > 1) {
      console.error(
        errorMessage(
          "\n✖  Error: You've selected the --help option and another command, Enter only -h or --help for help\n",
        ),
      );
      help();
      handleAnswer(false);
    }
    // Para conocer la versión del paquete
  // md-links -v o md-links --version
  } else if (options.version) {
    // Si seleccionada + de 1 opción como -s o cualquier otra con -v
    if (Object.keys(options).length > 1) {
      console.error(
        errorMessage(
          "\n✖  Error: You've selected the --version option and another command, Enter only -v or --version to display the version\nof this md-links package\n",
        ),
      );
      help();
      handleAnswer(false);
      // Al ingresar una ruta y -v
    } else if (program.args.length >= 1) {
      console.error(
        errorMessage(
          '\n✖  Error: To display the package version just type md-links -v or md-links --version\n',
        ),
      );
      help();
      handleAnswer(false);
      // Si se ingresa -v
    } else {
      console.log('\nThe version of this package is 1.0.0\n');
      handleAnswer(false);
    }
    // Si no hay opción pero si tiene una ruta
  // md-links .files/test.md
  } else if (Object.keys(options).length === 0) {
    if (program.args.length === 0) {
      // Si no hay opción ni ruta
      // md-links
      console.error(
        errorMessage('\n✖  Error: Enter a path or enter an option\n'),
      );
      help();
      handleAnswer(false);
    } else if (program.args.length === 1) {
      mdLinks(program.args[0], { validate: false })
        .then((links) => {
          tableLinks(links);
          handleAnswer(true);
        })
        .catch((err) => {
          console.log(`\n${outputMessage(err)}`);
          handleAnswer(false);
        });
    }
  }

  // Si hay --stats y --validate
  // md-links .some/example.md -s -v
  if (options.stats && options.validate) {
    if (program.args.length === 0) {
      // Si no hay una ruta
      // md-links -s -v
      console.error(errorMessage('\n✖  Error: Please enter a path\n'));
      help();
      handleAnswer(false);
    } else {
      mdLinks(program.args[0], { validate: true })
        .then((links) => {
          statsValidate(links);
          handleAnswer(true);
        })
        .catch((err) => {
          console.error(`\n${outputMessage(err)}`);
          handleAnswer(false);
        });
    }
    // Si hay solo --stats
  // md-links .some/example.md -s
  } else if (options.stats) {
    if (options.version) {
      // Para que no aparezcan ambas tablas --validate con --version
    } else if (options.help) {
      // Para que no aparezcan ambas tablas --validate con --help
    } else if (program.args.length === 0) {
      // Si no hay una ruta
      // md-links -s
      console.error(errorMessage('\n✖  Error: Please enter a path\n'));
      help();
      handleAnswer(false);
    } else {
      mdLinks(program.args[0], { validate: true })
        .then((links) => {
          stats(links);
          handleAnswer(true);
        })
        .catch((err) => {
          console.error(`\n${outputMessage(err)}`);
          handleAnswer(false);
        });
    }
    // Si solo hay --validate
  // md-links .some/example.md -v
  } else if (options.validate) {
    if (options.version) {
      // Para que no aparezcan ambas tablas --validate con --version
    } else if (options.help) {
      // Para que no aparezcan ambas tablas --validate con --help
    } else if (program.args.length === 0) {
      // Si no hay una ruta
      // md-links -v
      console.error(errorMessage('\n✖  Error: Please enter a path\n'));
      help();
      handleAnswer(false);
    } else {
      mdLinks(program.args[0], { validate: true })
        .then((links) => {
          tableLinksValidated(links);
          handleAnswer(true);
        })
        .catch((err) => {
          console.error(`\n${outputMessage(err)}`);
          handleAnswer(false);
        });
    }
  }
}

// Si no hay ninguna opción "md-links -"
if (!program.args) {
  console.error(errorMessage('\n✖  Error: Please enter a path or an option\n'));
  help();
  handleAnswer(false);
}
