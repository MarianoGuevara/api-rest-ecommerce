const fs = require("fs");

class CarritoRepositorioFs {
    constructor(path) {
        this.path = path;
        this.carritos = [];
    }

    async ObtenerTodos() {
        try {
            if (this.carritos.length == 0) {
                
                let carritos = [];
                if (fs.existsSync(this.path)) {
                    carritos = await fs.promises.readFile(this.path, "utf-8"); // si esto esta vacio devuelve string vacio
                    
                    if (carritos == "") { carritos = []; }
                    else { carritos = JSON.parse(carritos); }
                    this.carritos = carritos;
                }
            }
            
            return this.carritos;
        } catch (error) {
            throw new Error("Error al obtener todos - " + error.message);
        }
    }

    async GuardarUno(obj) {
       try {
            await this.ObtenerTodos();
            
            let id = await this.GenerarId();
            obj.id = id;
            
            this.carritos.push(obj);

            await fs.promises.writeFile(this.path, JSON.stringify(this.carritos));
            return obj;
        } catch (error) {
            throw new Error("Error al guardar un carrito nuevo - " + error.message);
        }
    }

    async AgregarProducto(idCarro, idProd, cantidad) {

    }

    async ObtenerPorId(id) {
        try{
            let retorno = undefined;
            await this.ObtenerTodos();

            for (let i=0; i<this.carritos.length; i++) {
                if (id == this.carritos[i].id ) { 
                    retorno = this.carritos[i];
                    break;
                }
            }
            return retorno;
        } catch (error) {throw error;}
    }

    async Actualizar(obj) {
         try {
            await this.ObtenerTodos();
            
            for (let i=0; i<this.carritos.length; i++) {
                if (obj.id == this.carritos[i].id ) { 
                    this.carritos[i] = obj;
                    await fs.promises.writeFile(this.path, JSON.stringify(this.carritos));
                    return obj;
                }
            }
        } catch (error) {throw error;}
    }

    async GenerarId() { 
        await this.ObtenerTodos();
        return this.carritos.length + 1;
    }
}
module.exports = CarritoRepositorioFs;