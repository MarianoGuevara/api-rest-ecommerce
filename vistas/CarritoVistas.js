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

router.route("/carts/:cid/product/:pid")
    .get((request, response) => {
        CarritoController.handleModificar(request,response);
    })

export default router;