import Validador from "../../utiles/Validador.js";
import CarritoEntidad from "./CarritoEntidad.js";

export default class CarritoServicio {
    constructor(persistencia, productoServicio) {
        this.persistencia = persistencia;
        this.productoServicio = productoServicio; // como mi regla de negocio estipula que tengo que verificar si el producto existe en el carrito, 
                                                  // para actualizarlo, el servicio de carrito depende del de producto 
    }

    async crear(productos) { // no necesito verificar, como en producto, que no haya otro igual pq si pueden haber 2 carros iguales
        try{
            await this.validarDatosObjeto(productos);

            const c = new CarritoEntidad(0, productos)

            const rta = await this.persistencia.crear(c);
            return rta;
        } catch(error) {throw error;}
    } 
    
    async obtenerPorId(id) {
        try {
            Validador.castearInt(id);

            const rta = await this.persistencia.obtenerPorId(id);
            if (rta === undefined) {throw new Error("No existe carrito con ese id");}

            return rta;
        } catch(error) {throw error;}
    }
                                            // estoy modificando un carrito: o le agrego cantidad o le agrego un producto nuevo
    async modificar(idCarrito, idProduct) { // logica negocio: 1ero verificar q sean enteros los datos. desp verificar q existan los id en la persistencia. Despues agregarle el producto a carro verificando si existia previamente ya
        try {
            Validador.castearInt(idCarrito);
            Validador.castearInt(idProduct);
            
            const carrito = await this.obtenerPorId(idCarrito);
            const producto = await this.productoServicio.obtenerPorId(idProduct);

            const indice = this.verificarProductoEnCarrito(carrito, producto)
            
            if (indice == -1) { // siempre agrego 1
                carrito.products.push( {productId: producto.id, quantity: 1} );
            } else {
                carrito.products[indice].quantity = carrito.products[indice].quantity + 1;
            }

            const rta = await this.persistencia.modificar(carrito);
            return rta;

        } catch(error) {throw error;}
    }

    ///////

    async validarDatosObjeto(products) { // Las reglas de negocio dicen que el array de productos debe tener el sig formato: {productId: 2, quantity: 2}
        try {
            if (Array.isArray(products) == false) {throw new Error("tipo incorrecto para carrito")}
            
            for (let i=0; i<products.length; i++) {
                this.validarProductoDeCarrito(products[i]);
                await this.productoServicio.obtenerPorId(products[i].productId)
            }
        } catch(error) {throw error;}
    }

    verificarProductoEnCarrito(carrito, producto) {
        let indice = -1;

        for (let i=0; i<carrito.products.length; i++) {
            if (carrito.products[i].productId == producto.id) {
                indice = i;
                break;
            }
        }
        return indice;
    }

    validarProductoDeCarrito(p){
        try {
            if (p.productId == undefined || typeof p.productId !== "number" ) {throw new Error("id para producto de carrito debe existir y ser numerico")}
            if (p.quantity == undefined || typeof p.quantity !== "number" ) {throw new Error("cantidad para producto de carrito debe existir y ser numerico")}
            Validador.validarRangoInt(p.quantity);
            Validador.validarRangoInt(p.productId);
        } catch(error) {throw error;}
    }
}