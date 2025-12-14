import { Router } from "express";
import ProductoController from "../controladores/ProductoController.js";

const router = Router();

router.route("/products")
    .get((request, response) => {
        ProductoController.handleObtenerTodos(request,response);
    })
    .post((request, response) => {
        ProductoController.handleCrear(request,response);
    })

router.route("/products/:pid")
    .get((request, response) => {
        ProductoController.handleObtenerPorId(request,response);
    })
    .put((request, response) => {
        ProductoController.handleModificar(request,response);
    })
    .delete((request, response) => {
        ProductoController.handleBorrar(request,response);
    })

router.route("/realtimeproducts")
    .get((request, response) => {
        response.render("home")
    })
    
export default router;