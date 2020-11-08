// HTML
import htmlmin from "gulp-htmlmin";

// CSS
import postcss from "gulp-postcss";
import cssnano from "cssnano";
import autoprefixer from "autoprefixer";

// JavaScript
import gulp from "gulp";
import babel from "gulp-babel";
import terser from "gulp-terser";

// Common
import concat from "gulp-concat";

// Variables / Constantes
const cssPlugins = [cssnano(), autoprefixer()];

// Crear tarea
// El primer parámetro el nombre de la tarea y el segundo la función que ejecutará
// gulp.task("default", () => {
//   console.log("Hello World");
// });

gulp.task("html-min", () => {
  return gulp
    .src("./src/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(gulp.dest("./public"));
});

gulp.task("styles", () => {
  return gulp
    .src("./src/css/*.css")
    .pipe(concat("styles-min.css"))
    .pipe(postcss(cssPlugins))
    .pipe(gulp.dest("./public/css"));
});

gulp.task("babel", () => {
  return gulp
    .src("./src/js/*.js")
    .pipe(concat("scripts-min.js")) // El parámetro que recibe es el nombre resultante del archivo tras la unión
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest("./public/js"));
});

// Tarea por defecto con un vigilante
// Ejecutará la tarea indicada cuando se produzca un cambio en la carpeta
gulp.task("default", () => {
  gulp.watch("./src/*.html", gulp.series("html-min"));
  gulp.watch("./src/css/*.css", gulp.series("styles"));
  gulp.watch("./src/js/*.js", gulp.series("babel"));
});
