const express = require("express");
const app = express();
const puerto = 8080;
app.use(express.json());

const ProductoController = require("./controladores/ProductoController");
const CarritoController = require("./controladores/CarritoController");

const api = "/api"

app.route(api+"/products")
    .get((request, response) => {
        ProductoController.handleObtenerTodos(request,response);
    })
    .post((request, response) => {
        ProductoController.handleCrear(request,response);
    })

app.route(api+"/products/:pid")
    .get((request, response) => {
        ProductoController.handleObtenerPorId(request,response);
    })
    .put((request, response) => {
        ProductoController.handleModificar(request,response);
    })
    .delete((request, response) => {
        ProductoController.handleBorrar(request,response);
    })

/////////

app.route(api+"/carts")
    .post((request, response) => {
        CarritoController.handleCrear(request,response);
    })

app.route(api+"/carts/:cid")
    .get((request, response) => {
        CarritoController.handleObtenerPorId(request,response);
    })

app.route(api+"/carts/:cid/product/:pid")
    .get((request, response) => {
        CarritoController.handleModificar(request,response);
    })

app.listen(puerto, ()=>{console.log("servidor levantado corrctamente")}) 
