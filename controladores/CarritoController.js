import CarritoRepositorioFs from "../modelos/Carrito/CarritoRepositorioFs.js";
import CarritoServicio from "../modelos/Carrito/CarritoServicio.js";
import ProductoRepositorioFs from "../modelos/Producto/ProductoRepositorioFs.js";
import ProductoServicio from "../modelos/Producto/ProductoServicio.js";

export default class CarritoController {
    
    static persistenciaProducto = new ProductoRepositorioFs("data/products.json"); 
    static servicioProducto = new ProductoServicio(CarritoController.persistenciaProducto);

    static persistenciaCarrito = new CarritoRepositorioFs("data/carritos.json"); 
    static servicioCarrito = new CarritoServicio(CarritoController.persistenciaCarrito, CarritoController.servicioProducto);

    static async handleCrear(request, response) {
        const user_p = request.body

        try{
            const obj = await CarritoController.servicioCarrito.crear(user_p.products);

            response.send([{exito: obj}]);
        } catch (error) {
            response.send([{error: error.message}]);
        }         
    }

    static async handleObtenerPorId(request, response) {
        try{
            const obj = await CarritoController.servicioCarrito.obtenerPorId(request.params.cid);

            response.send([{exito: obj}]);
        } catch (error) {
            response.send([{error: error.message}]);
        }         
    }

     static async handleModificar(request, response) {
        try{
            const idCarrito = request.params.cid
            const idProducto = request.params.pid

            const obj = await CarritoController.servicioCarrito.modificar(idCarrito, idProducto);

            response.send([{exito: obj}]);
        } catch (error) {
            response.send([{error: error.message}]);
        }         
    }
}