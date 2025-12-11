import express from "express";
import handlebars from "express-handlebars";
import ProductoVistas from "./vistas/ProductoVistas.js";
import CarritoVistas from "./vistas/CarritoVistas.js"

const app = express();
const puerto = 8080;

app.use(express.json());
app.engine('handlebars', handlebars.engine());

app.use("/api", ProductoVistas);
app.use("/api", CarritoVistas);

app.listen(puerto, ()=>{console.log("servidor levantado corrctamente")}) 
