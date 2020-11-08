# testGulp

[https://gulpjs.com/](Página oficial de Gulp)

## Instalación global

npm install --global gulp-cli

## Instalaciones para cada proyecto

npm init
npm install --save-dev gulp
npm install --save-dev @babel/core @babel/register @babel/preset-env

## Archivos necesarios

Tendremos un archivo llamado `gulpfile.babel.js` en el que tendremos la configuración de Gulp, en caso de usar Babel 6 el archivo se llamará `gulpfile.js`.También crearemos un archivo `.babelrc` en el que indicamos la configuración de Babel, en ese archivo definiremos el plugin que será encargado de convertir el código.

## Transpilar JavaScript

gulp-babel: Este es el módulo que usará gulp para convertir el código a ES5. Instalación: `npm install --save-dev gulp-babel`.
gulp-terser: Este módulo se usará para ofuscar el código. Instalación: `npm install --save-dev gulp-terser`.
gulp-concat: Este módulo unirá todos los archivos JavaScript en uno. Instalación: `npm install --save-dev gulp-concat`.

## Tareas de Gulp

Las tareas de Gulp deben seguir una serie de pasos en un orden muy concreto. Lo primero es que tiene que retornar `gulp` y se irán concatenando una serie de métodos que tiene Gulp. El primero es `src`, que indicará de donde obtendrá los archivos. Para concatenar métodos que no pertenecen a Gulp directamente usaremos `pipe`, para por ejemplo, usar `babel` para indicar el preset encargado de convertir el código. El último será `dest`, que indicará la carpeta destino para el código convertido. Gulp tiene la función `watch` que sirve a modo de observador para ejecutar una función si se realiza algún cambio en la carpeta, el primer parámetro es la carpeta que observará y el segundo las tareas que ejecutará cuando haya cambios, para indicar las funciones usamos `series` o `parallel`. La diferencia entre `serie` y `parallel` es el orden en el que se ejecuta las tareas, con `serie` se ejecuta de forma síncrona y con `parallel` de forma asíncrona.

## Ejecutar tareas

Para ejecutar las tareas basta con ejecutar en el terminal `gulp`, por defecto ejecutar la tarea con el nombre `default`. Si queremos ejecutar otra tarea, tendremos que especificar el nombre `gulp nombreTarea`.
