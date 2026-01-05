import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    products: [
        {
            productId: String,
            quantity: Number,
             _id: false // esto lo hago porque el odm mongoose internamente a cada subdocumento que crea le agrega un id y no lo necesito
        }
    ]
});

export const carritoColeccion = mongoose.model("carritos", carritoSchema);