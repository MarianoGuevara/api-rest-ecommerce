import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({ // schema es la parte del odm que pasa de mi entidad producto a entidad mongo
  title: String,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  stock: Number,
  category: String,
  thumbnails: [String]
});

export const productoColeccion = mongoose.model("productos", productoSchema);