const fs = require("fs");

class ProductoRepositorioFs {
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    async ObtenerTodosSinFiltrado() {
        try {
            let products = [];

            if (fs.existsSync(this.path)) {
                products = await fs.promises.readFile(this.path, "utf-8");

                if (products == "") {products = []}
                else {products = JSON.parse(products);}
            }

            this.products = products;
            return this.products;
        } catch (error) {
            throw new Error(error);
        }
    }

    async ObtenerTodos() {
        try {
            let products = [];

            if (fs.existsSync(this.path)) {
                products = await fs.promises.readFile(this.path, "utf-8");
                if (products == "") {products = []}
                else {products = JSON.parse(products);}
            }

            this.products = products.filter(p => p.status === true);;
            return this.products;

        } catch (error) {throw error;}
    }

    async GuardarUno(obj) {
       try {
            await this.ObtenerTodos();
            await this.VerificarExistenciaLogica(obj);

            let id = await this.GenerarId();
            obj.id = id;

            this.products.push(obj);

            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            return true
        }  catch (error) {
            throw error;
        }
    }

    async Actualizar(obj) {
         try {
            await this.ObtenerTodos();
            for (let i=0; i<this.products.length; i++) {
                if (obj.id == this.products[i].id ) { 
                    this.products[i] = obj;
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                    return obj;
                }
            }
        } catch (error) { throw error; }
    }

    async VerificarExistenciaLogica(obj) {
        try{
            let retorno = false;
            let p = await this.ObtenerTodos();
            for (let i=0; i<p.length; i++) {
                if (obj.title == p[i].title ) { 
                    // && obj.price == p[i].price
                    retorno = true;
                    break;
                }
            }
            return retorno;
        } catch (error) { throw error; }
    }

    async ObtenerPorId(id) {
        try{
            let retorno = undefined;
            let p = await this.ObtenerTodos();
            for (let i=0; i<p.length; i++) {
                if (id == p[i].id ) { 
                    retorno = p[i];
                    break;
                }
            }
            return retorno;

        } catch (error) { throw error; }
    }

    //////// funciones propias de archivos

    async GenerarId() { 
        await this.ObtenerTodosSinFiltrado();
        return this.products.length + 1;
    }
}
module.exports = ProductoRepositorioFs;