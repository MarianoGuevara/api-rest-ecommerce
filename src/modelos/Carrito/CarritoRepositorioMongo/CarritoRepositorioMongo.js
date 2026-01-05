import {connect} from "mongoose"
import { carritoColeccion } from "./CarritoMongoSchema.js"
import CarritoEntidad from "../CarritoEntidad.js"

export default class CarritoRepositorioMongo {
    constructor() {
        
    }

    async obtenerTodos() {
        try {
            const retorno =  await carritoColeccion.find({}).limit(10);
            console.log(retorno);
            return retorno;

        } catch (error) {throw error;}
    }

    async obtenerPorId(id) {
        try{
            const retorno = await carritoColeccion.findById(id);
            return this.CastearMongoObjACarrito(retorno);
        } catch (error) { 
            if(error.name == "CastError") {error.message = "ese id no pertenece a ningun carrito"}; 
            throw error; 
        }
    }

    async crear(obj) {
        try {
            const retorno = await carritoColeccion.create(obj);
            console.log(retorno);
            return this.CastearMongoObjACarrito(retorno);
        }  catch (error) { throw error; }
    }

    async modificar(obj) {
        try {
            const retorno = await carritoColeccion.updateOne(obj);
            if (retorno.modifiedCount > 0) {return obj}
            else {return undefined;} 
        } catch (error) { throw error; }
    }

    async borrar(id) {
        try {
            const retorno = await carritoColeccion.deleteOne({_id : id});
            return retorno;
        } catch (error) { throw error; }
    }
    
    // funciones de mongo 

    CastearMongoObjACarrito(mongoObj) {
        try{
            return new CarritoEntidad(
            mongoObj._id.toString(),
            mongoObj.products
        );
        } catch(e) {throw e;}
    }
}