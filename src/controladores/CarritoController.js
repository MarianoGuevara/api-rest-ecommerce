// import CarritoRepositorioFs from "../modelos/Carrito/CarritoRepositorioFs.js";
// import ProductoRepositorioFs from "../modelos/Producto/ProductoRepositorioFs.js";
import { carritoColeccion } from "../modelos/Carrito/CarritoRepositorioMongo/CarritoMongoSchema.js";
import { productoColeccion } from "../modelos/Producto/ProductoRepositorioMongo/ProductoMongoSchema.js";
import CarritoRepositorioMongo from "../modelos/Carrito/CarritoRepositorioMongo/CarritoRepositorioMongo.js";
import CarritoServicio from "../modelos/Carrito/CarritoServicio.js";
import ProductoRepositorioMongo from "../modelos/Producto/ProductoRepositorioMongo/ProductoRepositorioMongo.js";
import ProductoServicio from "../modelos/Producto/ProductoServicio.js";

export default class CarritoController {
    
    // static persistenciaProducto = new ProductoRepositorioFs("data/products.json"); 
    // static servicioProducto = new ProductoServicio(CarritoController.persistenciaProducto);

    // static persistenciaCarrito = new CarritoRepositorioFs("data/carritos.json"); 
    // static servicioCarrito = new CarritoServicio(CarritoController.persistenciaCarrito, CarritoController.servicioProducto);

    static persistenciaProducto = new ProductoRepositorioMongo(productoColeccion); 
    static servicioProducto = new ProductoServicio(CarritoController.persistenciaProducto);

    static persistenciaCarrito = new CarritoRepositorioMongo(carritoColeccion); 
    static servicioCarrito = new CarritoServicio(CarritoController.persistenciaCarrito, CarritoController.servicioProducto);

    static async handleCrear(request, response) {
        const user_p = request.body

        try{
            const obj = await CarritoController.servicioCarrito.crear(user_p.products);

            response.send(obj);
        } catch (error) {
            response.send({error: error.message});
        }         
    }

    static async handleObtenerPorId(request, response) {
        try{
            const obj = await CarritoController.servicioCarrito.obtenerPorIdFullMongoose(request.params.cid);

            response.send(obj);
        } catch (error) {
            response.send({error: error.message});
        }         
    }

     static async handleAgregarUno(request, response) {
        try{
            const idCarrito = request.params.cid
            const idProducto = request.params.pid

            const obj = await CarritoController.servicioCarrito.agregar(idCarrito, idProducto);

            response.send(obj);
        } catch (error) {
            response.send({error: error.message});
        }         
    }

    static async handleModificar(request, response) {
        try{
            const id = request.params.cid;
            const productos = request.body;
            
            const obj = await CarritoController.servicioCarrito.modificar(id, productos);

            response.send(obj);
        } catch (error) {
            response.send({error: error.message});
        }   
    }

    static async handleModificarCantidad(request, response) {
        try{
            const idCarrito = request.params.cid
            const idProducto = request.params.pid

            const cantidadEnviada = request.body;
            
            const obj = await CarritoController.servicioCarrito.agregar(idCarrito, idProducto, cantidadEnviada.cantidad);

            response.send(obj);
        } catch (error) {
            response.send({error: error.message});
        }   
    }

    static async handleBorrar(request, response) {
        try{
            const idCarrito = request.params.cid
            const idProducto = request.params.pid

            const obj = await CarritoController.servicioCarrito.eliminarProductoDeCarrito(idCarrito, idProducto);

            response.send(obj);
        } catch (error) {
            response.send({error: error.message});
        }         
    }

        static async handleBorrarTodo(request, response) {
        try{
            const idCarrito = request.params.cid
        
            const obj = await CarritoController.servicioCarrito.eliminarTodoDeCarrito(idCarrito);

            response.send(obj);
        } catch (error) {
            response.send({error: error.message});
        }         
    }
}