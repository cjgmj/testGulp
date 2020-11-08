import gulp from "gulp";
import babel from "gulp-babel";
import terser from "gulp-terser";
import concat from "gulp-concat";

// Crear tarea
// El primer parámetro el nombre de la tarea y el segundo la función que ejecutará
// gulp.task("default", () => {
//   console.log("Hello World");
// });

gulp.task("babel", () => {
  return gulp
    .src("./src/js/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(terser())
    .pipe(concat("scripts-min.js")) // El parámetro que recibe es el nombre resultante del archivo tras la unión
    .pipe(gulp.dest("./public/js"));
});

// Tarea por defecto con un vigilante
// Ejecutará la tarea indicada cuando se produzca un cambio en la carpeta
gulp.task("default", () => {
  gulp.watch("./src/js/*.js", gulp.series("babel"));
});
