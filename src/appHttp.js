import express from "express";
import handlebars from "express-handlebars";
import ProductoVistas from "./rutas/ProductoVistas.js";
import CarritoVistas from "./rutas/CarritoVistas.js";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

app.engine("handlebars", handlebars.engine({
    layoutsDir: path.join(process.cwd(), "src/frontend/layouts")
}));
app.set("view engine", "handlebars");
app.set("views", path.join(process.cwd(), "src/frontend"));

app.use("/api", ProductoVistas);
app.use("/api", CarritoVistas);

const puerto = 8080;

const httpServer = app.listen(puerto, () => {
    console.log("servidor levantado correctamente");
});

export { app, httpServer };