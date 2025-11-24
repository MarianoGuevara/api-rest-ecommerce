const express = require("express");
const app = express();
const puerto = 8080;
app.use(express.json());

const ProductoController = require("./controladores/ProductoController");
const CarritoController = require("./controladores/CarritoController");

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

/////////

app.route(api+"/carts")
    .post((request, response) => {
        CarritoController.Crear(request,response);
    })

app.route(api+"/carts/:cid")
    .get((request, response) => {
        CarritoController.ObtenerUno(request,response);
    })

app.route(api+"/carts/:cid/product/:pid")
    .get((request, response) => {
        CarritoController.AgregarProductoACarrito(request,response);
    })

app.listen(puerto, ()=>{console.log("servidor levantado corrctamente")}) 
