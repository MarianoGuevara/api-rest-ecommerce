const express = require("express");
const app = express();
const puerto = 8080;
app.use(express.json());

const ProductoController = require("./controladores/ProductoController");

const api = "/api"

app.route(api+"/products")
    .get((request, response) => {
        ProductoController.TraerTodos(request,response);
    })
    .post((request, response) => {
        ProductoController.Crear(request,response);
    })

app.route(api+"/products/:pid")
    .get((request, response) => {
        ProductoController.TraerPorId(request,response);
    })
    .put((request, response) => {
        ProductoController.ActualizarPorId(request,response);
    })
    .delete((request, response) => {
        ProductoController.BorrarPorId(request,response);
    })

app.listen(puerto, ()=>{console.log("servidor levantado corrctamente")}) 
