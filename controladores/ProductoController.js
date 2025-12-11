import ProductoRepositorioFs from "../modelos/Producto/ProductoRepositorioFs.js";
import ProductoServicio from "../modelos/Producto/ProductoServicio.js";

export default class ProductoController {
    // los hago estaticos ""SINGLETON"": una sola instancia habra 
    static persistencia = new ProductoRepositorioFs("data/products.json"); // esto voy a cambiar cuando haya bbdd
    static modelo = new ProductoServicio(ProductoController.persistencia);

    static async handleCrear(request, response) {
        const user_p = request.body

        try{
            const obj = await ProductoController.modelo.crear(
            user_p.title,
            user_p.description,
            user_p.code,
            user_p.price,
            user_p.status,
            user_p.stock,
            user_p.category,
            user_p.thumbnails);

            response.send([{exito: obj}]);
        } catch (error) {
            response.send([{error: error.message}]);
        }         
    }

    static async handleObtenerTodos(request, response) {
        try{
            const all = await ProductoController.modelo.obtenerTodos();

            response.send(all);
        } catch (error) {
            response.send([{error: error.message}]);
        }         
    }

    static async handleObtenerPorId(request, response) {
        try{
            const id = request.params.pid;
            const producto = await ProductoController.modelo.obtenerPorId(id);

            response.send(producto);
        } catch (error) {
            response.send([{error: error.message}]);
        }         
    }

    static async handleModificar(request, response) {
        try{
            const id = request.params.pid;
            const obj = request.body;

            const actualizacion = await ProductoController.modelo.modificar(id,obj);

            response.send({exito: actualizacion});
        } catch (error) {
            response.send([{error: error.message}]);
        }         
    }
    
    static async handleBorrar(request, response) {
        try{
            const id = request.params.pid;

            const deleteLogico = await ProductoController.modelo.borrar(id);

            response.send({exito: deleteLogico});
        } catch (error) {
            response.send([{error: error.message}]);
        }         
    }
}
