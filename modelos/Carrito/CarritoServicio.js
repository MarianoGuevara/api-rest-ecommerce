const Validador = require("../../utiles/Validador");
const CarritoEntidad = require("./CarritoEntidad");


class CarritoServicio {
    constructor(persistencia, productoServicio) {
        this.persistencia = persistencia;
        this.productoServicio = productoServicio; // como mi regla de negocio estipula que tengo que verificar si el producto existe en el carrito, 
                                                  // para actualizarlo, el servicio de carrito depende del de producto 
    }

    async CrearCarrito(productos) {
        try{
            this.ValidarCarrito(productos);

            const c = new CarritoEntidad(0, productos)

            const rta = await this.persistencia.GuardarUno(c);
            return rta;
        } catch(e) {throw e;}
    } 

    async AgregarACarrito(idCarrito, idProduct) { // logica negocio: 1ero verificar q sean enteros los datos. desp verificar q existan los id en la persistencia. Despues agregarle el producto a carro verificando si existia previamente ya
        try {
            Validador.CastearInt(idCarrito);
            Validador.CastearInt(idProduct);
            
            const carrito = await this.persistencia.ObtenerPorId(idCarrito);
            if (carrito == undefined) {throw new Error("No existe el carrito");}

            const producto = await this.productoServicio.LeerProductoId(idProduct);
            if (producto == undefined) {throw new Error("No existe el producto");}

            const indice = await this.VerificarProductoEnCarrito(carrito, producto)
            
            console.log("IIIIIIIIINDICE: ",indice)
            if (indice == -1) {
                console.log("he aqui INcorrectyo")
                carrito.products.push( {productId: producto.id, quantity: 1} );
            } else {
                console.log("he aqui correctyo")
                carrito.products[indice].quantity = carrito.products[indice].quantity + 1;
            }

            const rta = await this.persistencia.Actualizar(carrito);

            return rta;

        } catch(e) {throw e;}
    }

    async VerificarProductoEnCarrito(carrito, producto) {
        let indice = -1;

        for (let i=0; i<carrito.products.length; i++) {
            if (carrito.products[i].productId == producto.id) {
                indice = i;
                break;
            }
        }
        return indice;
    }

    async ObtenerPorId(id) {
        try {
            Validador.CastearInt(id);

            const rta = await this.persistencia.ObtenerPorId(id);
            return rta;

        } catch(e) {throw e;}
    }

    async ActualizarCarrito(obj) {
        try {
            this.ValidarProductoDeCarrito(obj);

            const idProducto = this.productoServicio.LeerProductoId(obj.id);

            if (idProducto == undefined) {}
            else {}
        } catch(e) {throw e;}
    }

    ValidarCarrito(products) { // Las reglas de negocio dicen que el array de productos debe tener el sig formato: {product: 2, quantity: 2}
        try {
            if (Array.isArray(products) == false) {throw new Error("tipo incorrecto para carrito")}
            
            for (let i=0; i<products.length; i++) {this.ValidarProductoDeCarrito(products[i]);}
        } catch(e) {throw e;}
    }

    ValidarProductoDeCarrito(p){
        try {
            if (p.productId == undefined) {throw new Error("key indefinida para carrito")}
            if (p.quantity == undefined) {throw new Error("key indefinida para carrito")}
            Validador.ValidarInt(p[i]);
        } catch(e) {throw e;}
    }
}
module.exports = CarritoServicio;