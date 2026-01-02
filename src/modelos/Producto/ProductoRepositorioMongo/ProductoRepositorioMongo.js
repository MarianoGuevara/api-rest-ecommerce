import {connect} from "mongoose"
import { productoColeccion } from "./ProductoMongoSchema.js"
import ProductoEntidad from "../ProductoEntidad.js"


export default class ProductoRepositorioMongo {
    constructor(stringConexion) {
        this.Conectar(stringConexion)
        .then(value => {
            console.log("conectado a bbdd mongo")
        })
        .catch(error => {
            throw new Error(error)
        })
    }

    async obtenerTodos() {
        try {
           

        } catch (error) {throw error;}
    }

    async obtenerPorId(id) {
        try{
          
        } catch (error) { throw error; }
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
            const retorno = await productoColeccion.create(obj) 
            return this.CastearMongoObjAProducto(retorno); // casteo de objeto mongo a obj normal. el obj mongo tiene mil propiedades mas que no me interesan
        }  catch (error) { throw error; }
    }

    async modificar(obj) {
        try {
           
        } catch (error) { throw error; }
    }


    // funciones de mongo 
    async Conectar(string_conexion_mongo){
        try{
            await connect(string_conexion_mongo) // abre el socket con MongoDB
        } catch(e) {throw new Error(e)}
    }

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