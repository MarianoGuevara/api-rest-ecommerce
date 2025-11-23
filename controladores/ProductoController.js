const ProductoRepositorioFs = require("../modelos/Producto/ProductoRepositorioFs");
const ProductoServicio = require("../modelos/Producto/ProductoServicio");

class ProductoController {
    // los hago estaticos ""SINGLETON"": una sola instancia habra 
    static persistencia = new ProductoRepositorioFs("data/products.json"); // este modelo voy a cambiar cuando haya bbdd
    static modelo = new ProductoServicio(ProductoController.persistencia);

    static async Crear(request, response) {
        console.log(request.body.title)
        const user_p = request.body

        try{
            const obj = await ProductoController.modelo.CrearProducto(
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

    static async TraerTodos(request, response) {
        try{
            const all = await ProductoController.modelo.LeerTodosProductos();

            response.send(all);
        } catch (error) {
            response.send([{error: error.message}]);
        }         
    }

    static async TraerPorId(request, response) {
        try{
            const id = request.params.pid;
            const producto = await ProductoController.modelo.LeerProductoId(id);

            response.send(producto);
        } catch (error) {
            response.send([{error: error.message}]);
        }         
    }

    static async ActualizarPorId(request, response) {
        try{
            const id = request.params.pid;
            const obj = request.body;

            const actualizacion = await ProductoController.modelo.ActualizarProductoId(id,obj);

            response.send({exito: actualizacion});
        } catch (error) {
            response.send([{error: error.message}]);
        }         
    }
    
    static async BorrarPorId(request, response) {
        try{
            const id = request.params.pid;

            const deleteLogico = await ProductoController.modelo.BorrarLogicoProductoId(id);

            response.send({exito: deleteLogico});
        } catch (error) {
            response.send([{error: error.message}]);
        }         
    }
}
module.exports = ProductoController;