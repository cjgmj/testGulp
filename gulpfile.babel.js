// HTML
import htmlmin from "gulp-htmlmin";

// CSS
import postcss from "gulp-postcss";
import cssnano from "cssnano";
import autoprefixer from "autoprefixer";

// Clean CSS
import clean from "gulp-purgecss";

// JavaScript
import gulp from "gulp";
import babel from "gulp-babel";
import terser from "gulp-terser";

// Sourcemaps
import sourcemaps from "gulp-sourcemaps";

// PUG
import pug from "gulp-pug";

// SASS
import sass from "gulp-sass";

// Common
import concat from "gulp-concat";

// Cache bust
import cacheBust from "gulp-cache-bust";

// Optimización imágenes
import imagemin from "gulp-imagemin";

// Browser sync
import { init as server, stream, reload } from "browser-sync";

// Plumber
import plumber from "gulp-plumber";

// Variables / Constantes
const cssPlugins = [cssnano(), autoprefixer()];
const production = true;

// Crear tarea
// El primer parámetro el nombre de la tarea y el segundo la función que ejecutará
// gulp.task("default", () => {
//   console.log("Hello World");
// });

gulp.task("html-min", () => {
  return gulp
    .src("./src/*.html")
    .pipe(plumber())
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(
      cacheBust({
        type: "timestamp",
      })
    )
    .pipe(gulp.dest("./public"));
});

gulp.task("styles", () => {
  return gulp
    .src("./src/css/*.css")
    .pipe(plumber())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(concat("styles-min.css"))
    .pipe(postcss(cssPlugins))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public/css"))
    .pipe(stream());
});

gulp.task("babel", () => {
  return gulp
    .src("./src/js/*.js")
    .pipe(plumber())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(concat("scripts-min.js")) // El parámetro que recibe es el nombre resultante del archivo tras la unión
    .pipe(babel())
    .pipe(terser())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public/js"));
});

gulp.task("views", () => {
  return gulp
    .src("./src/views/pages/*.pug")
    .pipe(plumber())
    .pipe(
      pug({
        pretty: production ? false : true,
      })
    )
    .pipe(
      cacheBust({
        type: "timestamp",
      })
    )
    .pipe(gulp.dest("./public"));
});

gulp.task("sass", () => {
  return gulp
    .src("./src/scss/styles.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public/css"))
    .pipe(stream());
});

// Tarea independiente que solo se ejecutará cuando el proyecto esté terminado
gulp.task("clean", () => {
  return gulp
    .src("./public/css/styles.css")
    .pipe(plumber())
    .pipe(
      clean({
        content: ["./public/*.html"], // Array de los archivos a analizar para comprobar si las clases se usan
      })
    )
    .pipe(gulp.dest("./public/css"));
});

// Tarea independiente que solo se ejcutará cuando tengamos todas las imágenes en la carpeta
gulp.task("img-min", () => {
  return gulp
    .src("./src/images/*")
    .pipe(plumber())
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 30, progressive: true }),
        imagemin.optipng({ optimizationLevel: 1 }),
      ])
    )
    .pipe(gulp.dest("./public/images"));
});

// Tarea por defecto con un vigilante
// Ejecutará la tarea indicada cuando se produzca un cambio en la carpeta
gulp.task("default", () => {
  server({
    server: "./public", // Ruta del servidor que queremos iniciar
  });
  // gulp.watch("./src/*.html", gulp.series("html-min")).on("change", reload);
  // gulp.watch("./src/css/*.css", gulp.series("styles"));
  gulp.watch("./src/views/**/*.pug", gulp.series("views")).on("change", reload);
  gulp.watch("./src/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("./src/js/*.js", gulp.series("babel")).on("change", reload);
});
