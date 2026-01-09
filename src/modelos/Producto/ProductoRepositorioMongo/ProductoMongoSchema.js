import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productoSchema = new mongoose.Schema({ // schema es la parte del odm que pasa de mi entidad producto a entidad mongo
  title: {type: String, required: true},
  description: {type: String, required: true},
  code: {type: String, required: true},
  price: {type: Number, required: true},
  status: {type: Boolean, required: true},
  stock: {type: Number, required: true},
  category: {type: String, required: true},
  thumbnails: {type: [String], required: true}
});

productoSchema.plugin(mongoosePaginate); // inicializo el plugin de paginacin para este schema

export const productoColeccion = mongoose.model("productos", productoSchema);