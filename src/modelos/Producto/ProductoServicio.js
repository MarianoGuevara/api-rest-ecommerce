import Validador from "../../utiles/Validador.js";
import ProductoEntidad from "./ProductoEntidad.js";

export default class ProductoServicio { // la idea es que pase lo que pase no tenga que tocar EL MODELO: o agrego otro para persistencia o cambio el controlador
    constructor(persistencia) {
        this.persistencia = persistencia;
    }

    async crear(datos) {
        try {
            this.validarDatosObjetoTipo(datos);
            this.validarDatosObjetoRangos(datos);

            const p = new ProductoEntidad(
                0, // le mando 0 porque lo genera la persistencia, no me interesa aca
                datos.title,
                datos.description,
                datos.code,
                datos.price,
                datos.status,
                datos.stock,
                datos.category,
                datos.thumbnails
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

    async obtenerTodosPaginado(limit,page,sort,category) { // reglas de negocio establecen que sera una busqueda con paginacion: que limit debe ser un entero como page, category una key que exista en modelo producto y sort (string asc o desc) 
        try {
            if (limit == undefined) {limit = 10;} // aplico reglas de negocio (validaciones) a cada key
            else { Validador.castearInt(limit)};

            if (page == undefined) {page = 1;}
            else {Validador.castearInt(page)};

            if (sort != "asc" && sort != "desc" && sort != undefined) { throw new Error("Filtro de sort invalido");}
     
            const rta = await this.persistencia.obtenerTodosPaginado(limit,page,sort,category);
            return rta;
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

            if (obj.title !== undefined) {productoOriginal.title = obj.title;}
            if (obj.price !== undefined) {productoOriginal.price = obj.price;}
            if (obj.stock !== undefined) {productoOriginal.stock = obj.stock;}
            if (obj.description !== undefined) {productoOriginal.description = obj.description;}
            if (obj.code !== undefined) {productoOriginal.code = obj.code;}
            if (obj.status !== undefined) {productoOriginal.status = obj.status;}
            if (obj.category !== undefined) {productoOriginal.category = obj.category;}
            if (obj.thumbnails !== undefined) {productoOriginal.thumbnails = obj.thumbnails;}

            this.validarDatosObjetoTipo(productoOriginal);
            this.validarDatosObjetoRangos( productoOriginal);

            const actualizacion = await this.persistencia.modificar(productoOriginal);

            return actualizacion;
        } catch (error) {throw error;}
    }

    async borrar(id) {  
        try { 
            // // borrado logico
            // let productoOriginal = await this.obtenerPorId(id);
            // productoOriginal.status = false;
            // const actualizacion = await this.persistencia.modificar(productoOriginal);
            // return actualizacion;

            // borrado literal (solo lo programe para mongo, las reglas de negocio hasta antes establecian que el borrado era logico)
            if (id == undefined ) {throw new Error("id debe existir para borrar")};
            // await this.obtenerPorId(id);
            const borrado = await this.persistencia.borrar(id);
            return borrado;
        } catch (error) {throw error;}
    }

    ///////

    validarDatosObjetoTipo(datos) {
        try{
            if (!datos.title || typeof datos.title !== "string") {throw new Error("tiene que haber titulo y ser string");}       
            if (!datos.description || typeof datos.description !== "string") {throw new Error("tiene que haber descripcion y ser string");} 
            if (!datos.code || typeof datos.code !== "string") {throw new Error("tiene que haber codigo y ser string");}        
            if (!datos.price || typeof datos.price !== "number") {throw new Error("tiene que haber precio y ser numero");} 
            if (!datos.status || typeof datos.status !== "boolean") {throw new Error("tiene que haber precio y ser booleano");}
            if (!datos.stock || typeof datos.stock !== "number") {throw new Error("tiene que haber stock y ser numero");} 
            if (!datos.category  || typeof datos.category  !== "string") {throw new Error("tiene que haber categoria y ser string");}    
            if (!Array.isArray(datos.thumbnails)) {throw new Error("tiene que haber 'thumbnail y ser array");}  
            else {
                for (let i=0; i<datos.thumbnails.length;i++){
                    if (typeof datos.thumbnails[i] !== "string") {throw new Error("cada elemento de thumbnail debe ser string");}
                }
            }
        } catch (error) {throw error;}
    };

    validarDatosObjetoRangos(datos) { 
        Validador.validarLargoString(datos.title, 10);
        Validador.validarLargoString(datos.description, 10);
        Validador.validarLargoString(datos.code, 3);
        Validador.validarLargoString(datos.category, 5);
        
        Validador.validarRangoInt(datos.price);
        Validador.validarRangoInt(datos.stock);
    }
}