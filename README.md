# testGulp

[Página oficial de Gulp](https://gulpjs.com)

## Instalación global

`npm install --global gulp-cli`

## Instalaciones para cada proyecto

`npm init`

`npm install --save-dev gulp`

`npm install --save-dev @babel/core @babel/register @babel/preset-env`

## Archivos necesarios

Tendremos un archivo llamado `gulpfile.babel.js` en el que tendremos la configuración de Gulp, en caso de usar Babel 6 el archivo se llamará `gulpfile.js`.También crearemos un archivo `.babelrc` en el que indicamos la configuración de Babel, en ese archivo definiremos el plugin que será encargado de convertir el código.

## Transpilar JavaScript

gulp-babel: este es el módulo que usará gulp para convertir el código a ES5. Instalación: `npm install --save-dev gulp-babel`.  
gulp-terser: este módulo se usará para ofuscar el código. Instalación: `npm install --save-dev gulp-terser`.  
gulp-concat: este módulo unirá todos los archivos JavaScript en uno. Instalación: `npm install --save-dev gulp-concat`.

## Transpilar HTML

gulp-htmlmin: este módulo minifica y limpia los archivos HTML. Instalación: `npm install --save gulp-htmlmin`. Podemos ver las opciones disponibles [aquí](https://github.com/kangax/html-minifier).

## Transpilar CSS

gulp-postcss: este módulo transforma los estilos con plugins de JavaScript. Instalación: `npm install --save-dev gulp-postcss`. [PostCSS Plugins](https://github.com/postcss/postcss/blob/master/docs/plugins.md).

cssnano: este módulo minifica y limpia los archivos CSS. Intalación: `npm install --save-dev cssnano`.

autoprefixer: añade los prefijos indicándoles para que navegadores se añadirán los prefijos. Para utilizar autoprefixer hay dos opciones, o añadir los navegadores a los que quieres dar soporte al package.json o hacerlo en un archivo separado `.browserslistrc`. Intalación: `npm install --save-dev autoprefixer`.

postcss: Intalación `npm install --save-dev postcss`. Corrige error `PostCSS plugin autoprefixer requires PostCSS 8`.

### Clean CSS

gulp-purgecss: limpia el CSS que no esté siendo utilizado. Instalación: `npm install --save-dev gulp-purgecss`.

## PUG

`npm install --save-dev gulp-pug`

## SASS

`npm install --save-dev gulp-sass`

## Limpiar caché del navegador

gulp-cache-bust: añade una marca a las urls para obligar al navegador a no usar el que tiene en caché. Instalación: `npm install --save-dev gulp-cache-bust`.

## Comprimir imágenes

`npm install --save-dev gulp-imagemin`. Podemos ver las opciones del plugin [aquí](https://github.com/sindresorhus/gulp-imagemin#readme).

## Sincronización del navegador

`npm install --save-dev browser-sync`. De este plugin hay que importar tres métodos:

- `init`: es el que se usa para construir un servidor de desarrollo.
- `stream`: inyecta el CSS cuando se realizar cambios.
- `reload`: recarga la página cuando se hacen cambios en las páginas HTML.

## Control errores

gulp-plumber: evita que en el caso de tener errores la aplicación se pare. Se añade después de `src`. Instalación: `npm install --save-dev gulp-plumber`.

## Cosas a tener en cuenta

Lo primero que tenemos que hacer en la tarea es concatenar los archivos js, si no se añadirá un `"use strict"` por cada archivo que haya sido compilado antes de hacer la unión. Si no indicamos preset en `babel` se usará será el del archivo `.babelrc`.

## Tareas de Gulp

Las tareas de Gulp deben seguir una serie de pasos en un orden muy concreto. Lo primero es que tiene que retornar `gulp` y se irán concatenando una serie de métodos que tiene Gulp. El primero es `src`, que indicará de donde obtendrá los archivos. Para concatenar métodos que no pertenecen a Gulp directamente usaremos `pipe`, para por ejemplo, usar `babel` para indicar el preset encargado de convertir el código. El último será `dest`, que indicará la carpeta destino para el código convertido. Gulp tiene la función `watch` que sirve a modo de observador para ejecutar una función si se realiza algún cambio en la carpeta, el primer parámetro es la carpeta que observará y el segundo las tareas que ejecutará cuando haya cambios, para indicar las funciones usamos `series` o `parallel`. La diferencia entre `serie` y `parallel` es el orden en el que se ejecuta las tareas, con `serie` se ejecuta de forma síncrona y con `parallel` de forma asíncrona.

## Ejecutar tareas

Para ejecutar las tareas basta con ejecutar en el terminal `gulp`, por defecto ejecutar la tarea con el nombre `default`. Si queremos ejecutar otra tarea, tendremos que especificar el nombre `gulp nombreTarea`.
