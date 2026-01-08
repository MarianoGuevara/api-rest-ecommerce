import {connect} from "mongoose"
import { productoColeccion } from "./ProductoMongoSchema.js"
import ProductoEntidad from "../ProductoEntidad.js"

// todo esto son metodos de odm mongoose, no de mongo crudo.
export default class ProductoRepositorioMongo {
    constructor(productoColeccion) { // este sera un objeto mongo; una referencia mongoose a la tabla de producto.
        this.productoColeccion = productoColeccion;
    }

    async obtenerTodos() {
        try {
            const retorno =  await this.productoColeccion.find({}).limit(10);
            console.log(retorno);
            return retorno;

        } catch (error) {throw error;}
    }

    async obtenerPorId(id) {
        try{
            const retorno = await this.productoColeccion.findById(id);
            if (retorno == null) return undefined;
            else return retorno;
        } catch (error) { 
            if(error.name == "CastError") {return undefined}; 
            throw error; 
        }
    }

    async obtenerPorTitulo(titulo) {
        try{
            const retorno = await this.productoColeccion.findOne({title : titulo});
            if (retorno != null) {return retorno;}
            else {return undefined;}
            
        } catch (error) { throw error; }
    }

    async crear(obj) {
        try {
            const retorno = await this.productoColeccion.create(obj); 
            return retorno; // casteo de objeto mongo a obj normal. el obj mongo tiene mil propiedades mas que no me interesan
        }  catch (error) { throw error; }
    }

    async modificar(obj) {
        try {
            const id = obj.id;
            delete obj.id;

            const retorno = await this.productoColeccion.updateOne({ _id: id }, { $set: obj });

            if (retorno.modifiedCount > 0) {return obj}
            else {return undefined;} 
        } catch (error) { throw error; }
    }

    async borrar(id) {
        try {
            const retorno = await this.productoColeccion.deleteOne({_id : id}); // aunq no pueda borrar no tira error, solo obj con proppiedad deletedCount = 0 o algo asi
            return retorno;
        } catch (error) { throw error; }
    }
}