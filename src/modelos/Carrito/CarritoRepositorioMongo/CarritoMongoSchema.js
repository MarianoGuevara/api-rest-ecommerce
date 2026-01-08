import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    products: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: "productos", default : [], required: true}, // indica que se guarda el id, pero mongoose referencia a un objeto real de productos
            quantity: {type: Number, required: true},
             _id: false // esto lo hago porque el odm mongoose internamente a cada subdocumento que crea le agrega un id y no lo necesito
        }
    ]
});

export const carritoColeccion = mongoose.model("carritos", carritoSchema);