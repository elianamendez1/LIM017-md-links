# Md-Links

![md-links](https://github.com/elianamendez1/LIM017-md-links/blob/7b95496abc43c546f6a8fbc3621e7ec17a87ea09/images/md-links.png)

**Md-links** es una interfaz de línea de comando (CLI) que facilita la lectura y análisis de archivos con formato Markdown, para generar reportes estadísticos de las URLs encontradas en éstos archivos.

Esta librería permite:

- Obtener información básica del estado de los enlaces en los archivos .md
- Adquirir información estadística sobre los enlaces totales, únicos y rotos en los archivos .md
- Las validaciones se realizan a través de comandos descritos más adelante en la guía de uso

## Índice

* [ Instalación ](#1-instalación)
* [ Guía de uso ](#2-guía-de-uso)
* [ Diagrama de flujo ](#3-diagrama-de-flujo)
* [ Dependencias adoptadas ](#4-dependencias-adoptadas)
* [ Backlog ](#5-backlog)
* [ Autor ](#6-autor)

***

## 1. Instalación

La instalación puede hacerse a través de la [libreria](https://www.npmjs.com/package/md-links) con el comando

      npm install @elimendez/md-links

> **Nota:** También puedes instalar la librería con uso del comando `npm i md-links`

## 2. Guía de Uso

Para ejecutar la línea de comando en la terminal usar el comando:

```
  md-links <path-to-file> [options]

```

### Opciones.

#### Al no ingresar ninguna opción

Se mostrará el texto, la URL y la ruta del archivo dónde el link fue encontrado

![pathNoCommands](https://github.com/elianamendez1/LIM017-md-links/blob/7b95496abc43c546f6a8fbc3621e7ec17a87ea09/images/options/pathNoCommand.png)

### `--help o -h`

Se mostrará una tabla de ayuda con comandos válidos y ejemplos para aplicarlos.

![--helpOptions](https://github.com/elianamendez1/LIM017-md-links/blob/7b95496abc43c546f6a8fbc3621e7ec17a87ea09/images/options/helpOptions.png)

### `--stats o -s`

Se mostrarán estadísticas básicas sobre los links | links totales y links únicos.

![-sOption](https://github.com/elianamendez1/LIM017-md-links/blob/7b95496abc43c546f6a8fbc3621e7ec17a87ea09/images/options/-sOption.png)

### --validate o -va

Se mostrarán el texto, la URL, la ruta del archivo (dónde el link fue encontrado) y una respuesta que validar el funcionamiento del link (con un codigo de status y un mensaje "Ok" o "Fail")

![-vaOption](https://github.com/elianamendez1/LIM017-md-links/blob/7b95496abc43c546f6a8fbc3621e7ec17a87ea09/images/options/-vaOption.png)


## 3. Diagrama de Flujo 1 y 2

### API JavaScript 1

![API](https://github.com/elianamendez1/LIM017-md-links/blob/827423f01551289441fdda30436f5e1a9fd55043/images/flowchart/flowchartJavascriptAPI.png)


### CLI (Command Line Interface) 2

![CLI](https://github.com/elianamendez1/LIM017-md-links/blob/827423f01551289441fdda30436f5e1a9fd55043/images/flowchart/flowchartCLI.png)

## 4. Liberías empleadas 📚

- [CFonts](https://www.npmjs.com/package/cfonts)
- [Chalk](https://www.npmjs.com/package/chalk)
- [Commander](https://www.npmjs.com/package/commander)
- [Gradient-string](https://www.npmjs.com/package/gradient-string)
- [Nanospinner](https://www.npmjs.com/package/nanospinner)
- [Node-fetch](https://nodejs.org/dist/latest-v17.x/docs/api/fs.html#file-system)
- [Nodemon](https://www.npmjs.com/package//nodemon)
- [Table](https://www.npmjs.com/package/table)

## 5. Autor

[Eliana Méndez 😋](https://github.com/elianamendez1)

