// import ProductoRepositorioFs from "../modelos/Producto/ProductoRepositorioFs.js";
import { productoColeccion } from "../modelos/Producto/ProductoRepositorioMongo/ProductoMongoSchema.js";
import ProductoRepositorioMongo from "../modelos/Producto/ProductoRepositorioMongo/ProductoRepositorioMongo.js";
import ProductoServicio from "../modelos/Producto/ProductoServicio.js";

export default class ProductoController {
    // // los hago estaticos ""SINGLETON"": una sola instancia habra 
    // static persistencia = new ProductoRepositorioFs("data/products.json"); // esto voy a cambiar cuando haya bbdd
    // static servicio = new ProductoServicio(ProductoController.persistencia);
    
    static persistencia = new ProductoRepositorioMongo(productoColeccion); 
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
            const rta = await ProductoController.servicio.obtenerTodos();

            response.send(rta);
        } catch (error) {
            response.send({error: error.message});
        }         
    }

    static async handleObtenerTodosPaginado(request, response) {
        try{
            const queryParams = request.query;

            const limit = queryParams.limit;
            const page = queryParams.page;
            const sort = queryParams.sort;
            const category = queryParams.category;

            const data = await ProductoController.servicio.obtenerTodosPaginado(limit,page,sort,category);

            const rta = {
                status: "success", // este es el  formato que mis reglas de negocio establecieron que seria la rta a la paginacion, el repositorio debe encargarse de devolverlo correcto
                payload: data.docs,
                totalPages: data.totalPages,
                prevPage: data.prevPage,
                nextPage: data.nextPage,
                page: data.page,
                hasPrevPage: data.hasPrevPage,
                hasNextPage: data.hasNextPage,
                prevLink: data.hasPrevPage
                    ? `/api/products?page=${data.prevPage}`
                    : null,
                nextLink: data.hasNextPage
                    ? `/api/products?page=${data.nextPage}`
                    : null
            };
            response.json(rta);
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