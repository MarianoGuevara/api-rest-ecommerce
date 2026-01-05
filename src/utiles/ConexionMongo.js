import mongoose from "mongoose"; 

// 1 sola conexion global
export async function conectarMongo(string_conexion_mongo) {
    try {
        let rta = "MongoDB bbdd conectado";
        if (mongoose.connection.readyState === 1) {rta = "Ya se encontraba conectado previamente"};
        await mongoose.connect(string_conexion_mongo);
        console.log(rta);
        return rta;
    } catch(e){throw e;}
}