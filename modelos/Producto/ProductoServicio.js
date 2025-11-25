const Validador = require("../../utiles/Validador");
const ProductoEntidad = require("./ProductoEntidad");

class ProductoServicio { // la idea es que pase lo que pase no tenga que tocar EL MODELO: o agrego otro para persistencia o cambio el controlador
    constructor(persistencia) {
        this.persistencia = persistencia;
    }

    async crear(title,description,code,price,status,stock,category,thumbnails) {
        try {
            this.validarDatosObjeto( title,description,code,price,status,stock,category,thumbnails);

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

            const encontrado = await this.persistencia.obtenerPorTitulo(p.title);
            if (encontrado !== undefined) {throw new Error("Ya existe el producto");}

            const rta = await this.persistencia.crear(p); 
            return rta;
        } catch (error) {throw error;}
    }

    async obtenerTodos() {
        try { 
            const todos = await this.persistencia.obtenerTodos();
            return todos;
        } catch (error) {throw error;}
    }

    async obtenerPorId(id) {
        try { 
            const producto = await this.persistencia.obtenerPorId(id);
            if (producto === undefined) {throw new Error("No existe producto con ese id")}

            return producto;
        } catch (error) {throw error;}
    }

    async modificar(id, obj) { // reglas negocio: paso a paso logico; obtener prod id original, lo que mando el user actualizarlo, reflejarlo en la persistencia.
        try { 
            let productoOriginal = await this.obtenerPorId(id);
            console.log(productoOriginal);

            if (obj.title !== undefined) {productoOriginal.title = obj.title;}
            if (obj.price !== undefined) {productoOriginal.price = obj.price;}
            if (obj.stock !== undefined) {productoOriginal.stock = obj.stock;}
            if (obj.description !== undefined) {productoOriginal.description = obj.description;}
            if (obj.code !== undefined) {productoOriginal.code = obj.code;}
            if (obj.status !== undefined) {productoOriginal.status = obj.status;}
            if (obj.category !== undefined) {productoOriginal.category = obj.category;}
            if (obj.thumbnails !== undefined) {productoOriginal.thumbnails = obj.thumbnails;}

            this.validarDatosObjeto( productoOriginal.title,productoOriginal.description,productoOriginal.code,productoOriginal.price,productoOriginal.status,productoOriginal.stock,productoOriginal.category,productoOriginal.thumbnails);

            const actualizacion = await this.persistencia.modificar(productoOriginal);

            return actualizacion;
        } catch (error) {throw error;}
    }

    async borrar(id) {  // borrado logico
        try { 
            let productoOriginal = await this.obtenerPorId(id);
            productoOriginal.status = false;
            const actualizacion = await this.persistencia.modificar(productoOriginal);

            return actualizacion;
        } catch (error) {throw error;}
    }

    ///////

    validarDatosObjeto(title,description,code,price,status,stock,category,thumbnails) { 
        try{
            Validador.validarLargoString(title, 10);
            Validador.validarLargoString(description, 10);
            Validador.validarLargoString(code, 3);
            Validador.validarLargoString(category, 5);
            
            Validador.validarRangoInt(price);
            Validador.validarRangoInt(stock);
        } catch (error) {throw error;}
    }
}
module.exports = ProductoServicio;