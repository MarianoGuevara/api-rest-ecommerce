import {connect} from "mongoose"
import { productoColeccion } from "./ProductoMongoSchema.js"
import ProductoEntidad from "../ProductoEntidad.js"

// todo esto son metodos de odm mongoose, no de mongo crudo.
export default class ProductoRepositorioMongo {
    constructor() {
    }

    async obtenerTodos() {
        try {
            const retorno =  await productoColeccion.find({}).limit(10);
            console.log(retorno);
            return retorno;

        } catch (error) {throw error;}
    }

    async obtenerPorId(id) {
        try{
            const retorno = await productoColeccion.findById(id);
            return this.CastearMongoObjAProducto(retorno);
        } catch (error) { 
            if(error.name == "CastError") {error.message = "ese id no pertenece a ningun producto"}; 
            throw error; 
        }
    }

    async obtenerPorTitulo(titulo) {
        try{
            const retorno = await productoColeccion.findOne({title : titulo});
            if (retorno != null) {return this.CastearMongoObjAProducto(retorno);}
            else {return undefined;}
            
        } catch (error) { throw error; }
    }

    async crear(obj) {
        try {
            const retorno = await productoColeccion.create(obj); 
            return this.CastearMongoObjAProducto(retorno); // casteo de objeto mongo a obj normal. el obj mongo tiene mil propiedades mas que no me interesan
        }  catch (error) { throw error; }
    }

    async modificar(obj) {
        try {
            const retorno = await productoColeccion.updateOne(obj);
            if (retorno.modifiedCount > 0) {return obj}
            else {return undefined;} 
        } catch (error) { throw error; }
    }

    async borrar(id) {
        try {
            const retorno = await productoColeccion.deleteOne({_id : id});
            return retorno;
        } catch (error) { throw error; }
    }



    // funciones de mongo 

    CastearMongoObjAProducto(mongoObj) {
        try{
            return new ProductoEntidad(
            mongoObj._id.toString(),
            mongoObj.title,
            mongoObj.description,
            mongoObj.code,
            mongoObj.price,
            mongoObj.status,
            mongoObj.stock,
            mongoObj.category,
            mongoObj.thumbnails
        );
        } catch(e) {throw e;}
    }
}