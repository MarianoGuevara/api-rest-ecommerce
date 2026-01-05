import { conectarMongo } from "./src/utiles/ConexionMongo.js";
conectarMongo(process.env.CONNECTIONSTRING)
import "./src/appHttp.js";
import "./src/appSocket.js";