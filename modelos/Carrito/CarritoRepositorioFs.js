const fs = require("fs");

class CarritoRepositorioFs {
    constructor(path) {
        this.path = path;
        this.carritos = [];
    }

    async obtenerTodos() {
        try {
            if (this.carritos.length == 0) {
                let carritos = [];

                if (fs.existsSync(this.path)) {
                    carritos = await fs.promises.readFile(this.path, "utf-8"); // si esto esta vacio devuelve string vacio
                    if (carritos != "") { carritos = JSON.parse(carritos);}
                }
                this.carritos = carritos;
            }
            
            return this.carritos;
        } catch (error) {throw error;}
    }

     async obtenerPorId(id) {
        try{
            let retorno = undefined;
            await this.obtenerTodos();

            for (let i=0; i<this.carritos.length; i++) {
                if (id == this.carritos[i].id ) { 
                    retorno = this.carritos[i];
                    break;
                }
            }
            return retorno;
        } catch (error) {throw error;}
    }

    async crear(obj) {
       try {
            await this.obtenerTodos();
            
            let id = await this.generarIdArchivos();
            obj.id = id;
            
            this.carritos.push(obj);

            await fs.promises.writeFile(this.path, JSON.stringify(this.carritos));
            return obj;
        } catch (error) {throw error;}
    }

    async modificar(obj) {
         try {
            await this.obtenerTodos();
            
            for (let i=0; i<this.carritos.length; i++) {
                if (obj.id == this.carritos[i].id ) { 
                    this.carritos[i] = obj;
                    await fs.promises.writeFile(this.path, JSON.stringify(this.carritos));
                    return obj;
                }
            }
        } catch (error) {throw error;}
    }

    async generarIdArchivos() { 
        await this.obtenerTodos();
        return this.carritos.length + 1;
    }
}
module.exports = CarritoRepositorioFs;