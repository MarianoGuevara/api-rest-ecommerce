const fs = require("fs");

class ProductoRepositorioFs {
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    async obtenerTodosHistorico() {
        try {
            let products = [];

            if (fs.existsSync(this.path)) {
                products = await fs.promises.readFile(this.path, "utf-8");

                if (products != "") { products = JSON.parse(products); }
            }

            this.products = products;
            return this.products;
        } catch (error) { throw error; }
    }

    async obtenerTodos() {
        try {
            if (this.products.length == 0) {
                let products = [];

                if (fs.existsSync(this.path)) {
                    products = await fs.promises.readFile(this.path, "utf-8");    
                    if (products != "") { products = JSON.parse(products); }
                }

                this.products = products.filter(p => p.status === true);;    
            }
            
            return this.products;

        } catch (error) {throw error;}
    }

    async obtenerPorId(id) {
        try{
            let retorno = undefined;
            let p = await this.obtenerTodos();

            for (let i=0; i<p.length; i++) {
                if (id == p[i].id ) { 
                    retorno = p[i];
                    break;
                }
            }
            return retorno;

        } catch (error) { throw error; }
    }

    async obtenerPorTitulo(title) {
        try{
            let retorno = undefined;
            let p = await this.obtenerTodos();
            console.log(p);
            for (let i=0; i<p.length; i++) {
                if (title == p[i].title ) {  // && obj.price == p[i].price
                    retorno = p[i];
                    break;
                }
            }
            return retorno;

        } catch (error) { throw error; }
    }

    async crear(obj) {
       try {
            await this.obtenerTodos();
            
            let id = await this.generarIdArchivos();
            obj.id = id;

            this.products.push(obj);

            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            return obj

        }  catch (error) { throw error; }
    }

    async modificar(obj) {
         try {
            await this.obtenerTodos();
            for (let i=0; i<this.products.length; i++) {
                if (obj.id == this.products[i].id ) { 
                    this.products[i] = obj;
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                    return obj;
                }
            }
        } catch (error) { throw error; }
    }

    //////// funciones propias de archivos (cada persistencia tendra sus metodos basicos pero desp tamb pueden implementar otros propios)

    async generarIdArchivos() { 
        await this.obtenerTodosHistorico();
        return this.products.length + 1;
    }
}
module.exports = ProductoRepositorioFs;