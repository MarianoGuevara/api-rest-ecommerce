const Validador = require("../../utiles/Validador");
const ProductoEntidad = require("./ProductoEntidad");

class ProductoServicio { // la idea es que pase lo que pase no tenga que tocar EL MODELO: o agrego otro para persistencia o cambio el controlador
    constructor(persistencia) {
        this.persistencia = persistencia;
    }

    async CrearProducto(title,description,code,price,status,stock,category,thumbnails) {
        try {
            this.ValidarDatosProducto( title,description,code,price,status,stock,category,thumbnails);

            const p = new ProductoEntidad(
                0, // le mando 0 porque lo genera la persistencia, no me interesa aca
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            );

            const rta = await this.persistencia.GuardarUno(p);

            return rta;
        } catch (error) {throw error;}
    }

    async LeerTodosProductos() {
        try { 
            const todos = await this.persistencia.ObtenerTodos();
            return todos;
        } catch (error) {throw error;}
    }

    async LeerProductoId(id) {
        try { 
            const producto = await this.persistencia.ObtenerPorId(id); // si no existe el objeto la persistencia debe devolver error, sea la persistencia que sea
            return producto;
        } catch (error) {throw error;}
    }

    async ActualizarProductoId(id, obj) { // reglas negocio: paso a paso logico; obtener prod id original, lo que mando el user actualizarlo, reflejarlo en la persistencia.
        try { 
            let productoOriginal = await this.LeerProductoId(id);

            if (obj.title !== undefined) {productoOriginal.title = obj.title;}
            if (obj.price !== undefined) {productoOriginal.price = obj.price;}
            if (obj.stock !== undefined) {productoOriginal.stock = obj.stock;}
            if (obj.description !== undefined) {productoOriginal.description = obj.description;}
            if (obj.code !== undefined) {productoOriginal.code = obj.code;}
            if (obj.status !== undefined) {productoOriginal.status = obj.status;}
            if (obj.category !== undefined) {productoOriginal.category = obj.category;}
            if (obj.thumbnails !== undefined) {productoOriginal.thumbnails = obj.thumbnails;}

            this.ValidarDatosProducto( productoOriginal.title,productoOriginal.description,productoOriginal.code,productoOriginal.price,productoOriginal.status,productoOriginal.stock,productoOriginal.category,productoOriginal.thumbnails);

            const actualizacion = await this.persistencia.Actualizar(productoOriginal);

            return actualizacion;
        } catch (error) {throw error;}
    }

    async BorrarLogicoProductoId(id) {       
        try { 
            let productoOriginal = await this.LeerProductoId(id);
            productoOriginal.status = false;
            const actualizacion = await this.persistencia.Actualizar(productoOriginal);

            return actualizacion;
        } catch (error) {throw error;}
    }

    ////

    ValidarDatosProducto(title,description,code,price,status,stock,category,thumbnails) { // la validacion la lleva el modelo por ser logica de negocio(?)
        try{
            Validador.ValidarString(title, 10);
            Validador.ValidarString(description, 10);
            Validador.ValidarString(code, 3);
            Validador.ValidarString(category, 5);
            
            Validador.ValidarInt(price);
            Validador.ValidarInt(stock);
        } catch (error) {throw error;}
    }
}
module.exports = ProductoServicio;