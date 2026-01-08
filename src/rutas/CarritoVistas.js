import { Router } from "express";
import CarritoController from "../controladores/CarritoController.js";

const router = Router();

router.route("/carts")
    .post((request, response) => {
        CarritoController.handleCrear(request,response);
    })

router.route("/carts/:cid")
    .get((request, response) => {
        CarritoController.handleObtenerPorId(request,response);
    })
    .put((request, response) => {
        CarritoController.handleModificar(request,response);
    })
    .delete((request, response) => {
        CarritoController.handleBorrarTodo(request,response);
    })

router.route("/carts/:cid/product/:pid")
    .get((request, response) => {
        CarritoController.handleAgregarUno(request,response);
    })
    .delete((request, response) => {
        CarritoController.handleBorrar(request,response);
    })
    .put((request, response) => {
        CarritoController.handleModificarCantidad(request,response);
    })
    
export default router;