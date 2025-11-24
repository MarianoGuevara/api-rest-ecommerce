const CarritoRepositorioFs = require("../modelos/Carrito/CarritoRepositorioFs");
const CarritoServicio = require("../modelos/Carrito/CarritoServicio");
const ProductoRepositorioFs = require("../modelos/Producto/ProductoRepositorioFs");
const ProductoServicio = require("../modelos/Producto/ProductoServicio");

class CarritoController {
    
    static persistenciaProducto = new ProductoRepositorioFs("data/products.json"); 
    static servicioProducto = new ProductoServicio(CarritoController.persistenciaProducto);

    static persistenciaCarrito = new CarritoRepositorioFs("data/carritos.json"); 
    static servicioCarrito = new CarritoServicio(CarritoController.persistenciaCarrito, CarritoController.servicioProducto);

    static async Crear(request, response) {
        const user_p = request.body

        try{
            const obj = await CarritoController.servicioCarrito.CrearCarrito(user_p.products);

            response.send([{exito: obj}]);
        } catch (error) {
            response.send([{error: error.message}]);
        }         
    }

    static async ObtenerUno(request, response) {
        try{
            const obj = await CarritoController.servicioCarrito.ObtenerPorId(request.params.cid);

            response.send([{exito: obj}]);
        } catch (error) {
            response.send([{error: error.message}]);
        }         
    }

     static async AgregarProductoACarrito(request, response) {
        try{
            const idCarrito = request.params.cid
            const idProducto = request.params.pid

            const obj = await CarritoController.servicioCarrito.AgregarACarrito(idCarrito, idProducto);

            response.send([{exito: obj}]);
        } catch (error) {
            response.send([{error: error.message}]);
        }         
    }
}
module.exports = CarritoController;