import ProductoRepositorioFs from "../modelos/Producto/ProductoRepositorioFs.js";
import ProductoServicio from "../modelos/Producto/ProductoServicio.js";

export default class ProductoController {
    // los hago estaticos ""SINGLETON"": una sola instancia habra 
    static persistencia = new ProductoRepositorioFs("data/products.json"); // esto voy a cambiar cuando haya bbdd
    static servicio = new ProductoServicio(ProductoController.persistencia);

    static async handleCrear(request, response) {
        const user_p = request.body

        try{
            const obj = await ProductoController.servicio.crear(user_p);

            response.send({exito: obj});
        } catch (error) {
            response.send({error: error.message});
        }         
    }

    static async handleObtenerTodos(request, response) {
        try{
            const all = await ProductoController.servicio.obtenerTodos();

            response.send(all);
        } catch (error) {
            response.send({error: error.message});
        }         
    }

    static async handleObtenerPorId(request, response) {
        try{
            const id = request.params.pid;
            const producto = await ProductoController.servicio.obtenerPorId(id);

            response.send(producto);
        } catch (error) {
            response.send({error: error.message});
        }         
    }

    static async handleModificar(request, response) {
        try{
            const id = request.params.pid;
            const obj = request.body;

            const actualizacion = await ProductoController.servicio.modificar(id,obj);

            response.send({exito: actualizacion});
        } catch (error) {
            response.send({error: error.message});
        }         
    }
    
    static async handleBorrar(request, response) {
        try{
            const id = request.params.pid;

            const deleteLogico = await ProductoController.servicio.borrar(id);

            response.send({exito: deleteLogico});
        } catch (error) {
            response.send({error: error.message});
        }         
    }

    // socket
    static async handleObtenerTodosSocket(socketServer, socket) {
        try {
            const productos = await ProductoController.servicio.obtenerTodos();
            socket.emit("productos", productos);
        } catch (error) {
            socket.emit("error", {mensaje: "No se pudieron obtener los productos"});
        }
    }

    static async handleAltaSocket(socketServer, socket) {
        socket.on("crearProducto", async producto => {
            try {
                await ProductoController.servicio.crear(producto);
                socketServer.emit("productos", await ProductoController.servicio.obtenerTodos());
            } catch (error) {
                socket.emit("error", {mensaje: "No se pudo crear el producto"});
            }
        });
    }

    static async handleBajaSocket(socketServer, socket) {
        socket.on("eliminarProducto", async id => {
            try{
                await ProductoController.servicio.borrar(id);
                socketServer.emit("productos", await ProductoController.servicio.obtenerTodos());
            }
            catch (e) {
                socket.emit("error", {mensaje: "No se pudo eliminar el producto"});
            }
        });
    }
}