// socket desde el lado del servidor.
import {Server} from 'socket.io';
import {httpServer} from "./appHttp.js"
import ProductoController from "./controladores/ProductoController.js"

const socketServer = new Server(httpServer);
    socketServer.on("connection", async socket => {
        console.log("se conecto") 
        
        ProductoController.handleObtenerTodosSocket(socketServer, socket);
    
        ProductoController.handleAltaSocket(socketServer, socket);

        ProductoController.handleBajaSocket(socketServer, socket);
    }
);
export {socketServer}