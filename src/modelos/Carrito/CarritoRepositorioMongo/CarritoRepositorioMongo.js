export default class CarritoRepositorioMongo {
    constructor(carritoColeccion) {
        this.carritoColeccion = carritoColeccion;
    }

    async obtenerTodos() {
        try {
            const retorno =  await this.carritoColeccion.find({}).limit(10);
            return retorno;

        } catch (error) {throw error;}
    }

    async obtenerPorIdFull(id) { // este sera
        try{
            const retorno = await this.carritoColeccion.findById(id).populate("products.productId");
            if (retorno == null ) return undefined;
            else return retorno;
        } catch (error) { 
            if(error.name == "CastError") {return undefined}; 
            throw error; 
        }
    }

    async obtenerPorId(id) {
        try{
            const retorno = await this.carritoColeccion.findById(id);
            if (retorno == null ) return undefined;
            else return retorno;
        } catch (error) { 
            if(error.name == "CastError") {return undefined}; 
            throw error; 
        }
    }

    async crear(obj) {
        try {
            const retorno = await this.carritoColeccion.create(obj);
            return retorno;
        }  catch (error) { throw error; }
    }

    async modificar(obj) {
        try {
            const doc = await this.obtenerPorId(obj.id);
            doc.products = obj.products;
            return await doc.save();
        } catch (error) { throw error; }
    }

    async borrar(id) {
        try {
            const retorno = await this.carritoColeccion.deleteOne({_id : id});
            return retorno;
        } catch (error) { throw error; }
    }
}