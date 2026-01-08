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

    async obtenerPorIdFullMongoose(id) { // mis reglas de negocio establecen que haya una funcionalidad para traer un carro CON sus objetos productos DEPENDIENTES desarrollados, no solo su id.
        try {
        
            const rta = await this.persistencia.obtenerPorIdFull(id); // tengo q hacer esto pq me obligan a que sea con puplate, no es lo mejor
           
            if (rta === undefined) {throw new Error("No existe carrito con ese id");}

            return rta;
        } catch(error) {throw error;}
    }

    async obtenerPorId(id) {
        try {
            // Validador.castearInt(id); // no necesito castear a int porque no tengo una regla de  negocio que diga eso, mehabia equivocado, solo sucede con archivos eso.

            const rta = await this.persistencia.obtenerPorId(id); // tengo q hacer esto pq me obligan a que sea con puplate, no es lo mejor
           
            if (rta === undefined) {throw new Error("No existe carrito con ese id");}

            return rta;
        } catch(error) {throw error;}
    }
                                                        // estoy agregandole contenido a un carrito: o le agrego cantidad o le agrego un producto nuevo. si manda cantidad, seteo esa, si no 1.
    async agregar(idCarrito, idProducto, cantidad=-1) { // logica negocio: 1ero  verificar q existan los id en la persistencia. Despues agregarle el producto a carro verificando si existia previamente ya
        try {
            const carrito = await this.obtenerPorId(idCarrito);
            const producto = await this.productoServicio.obtenerPorId(idProducto);
            const indice = this.verificarProductoEnCarrito(carrito, producto)
            
            if (indice == -1) { // siempre agrego 1
                carrito.products.push( {productId: producto.id, quantity: 1} );
            } else {
                if (cantidad != -1) {
                    
                    cantidad = Validador.castearInt(cantidad);
                    carrito.products[indice].quantity = cantidad;
                }
                else {carrito.products[indice].quantity = carrito.products[indice].quantity + 1;}
            }

            const rta = await this.persistencia.modificar(carrito); // si es mongo rta si no actualizo puede devolver undefined asi q aca podria tirar error.
            return rta;

        } catch(error) {throw error;}
    }

    async modificar(idCarrito, productos){
        try {
            const carrito = await this.obtenerPorId(idCarrito);
            
            await this.validarDatosObjeto(productos);

            carrito.products = productos;
            const rta = await this.persistencia.modificar(carrito); // si es mongo rta si no actualizo nada puede devolver undefined asi q aca podria tirar error.
            if (rta == undefined) {throw new Error("no se actualizó nada")}

            return rta;
        } catch(error) {throw error;}
    }

    async borrar(id) { 
        try { 
            if (id == undefined ) {throw new Error("id debe existir para borrar")};

            const borrado = await this.persistencia.borrar(id);
            return borrado;
        } catch (error) {throw error;}
    }

    async eliminarProductoDeCarrito(idCarrito, idProducto) { 
        try { 
            if (idCarrito == undefined || idProducto == undefined) {throw new Error("idCarrito y idProducto debe existir para borrarlo")};

            const carrito = await this.obtenerPorId(idCarrito);
            const producto = await this.productoServicio.obtenerPorId(idProducto);
           
            const indice = this.verificarProductoEnCarrito(carrito, producto)
            if (indice == -1) { 
                throw new Error("El producto que intentas borrar no se encuentra dentro del carrito")
            } else {
                carrito.products.splice(indice, 1);// elimina 1 elemento a partir de ese indice incluyendolo.
                const borrado = await this.persistencia.modificar(carrito);    
                return borrado;
            }
        } catch (error) {throw error;}
    }

    async eliminarTodoDeCarrito(idCarrito) { 
        try { 
            if (idCarrito == undefined) {throw new Error("idCarrito y idProducto debe existir para borrarlo")};

            let carrito = await this.obtenerPorId(idCarrito);
            carrito.products = [];
            const borrado = await this.persistencia.modificar(carrito);    
            return borrado;
            
        } catch (error) {throw error;}
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
            if (carrito.products[i].productId == producto.id) // solucion generica en distintas bbdd
            if (carrito.products[i].productId == producto.id) { // no se me ocurrio que hacer pq me obligan a usar populate y me turbulenta los tipos de dato
                indice = i;
                break;
            }
        }
        return indice;
    }

    validarProductoDeCarrito(p){
        try {
            if (p.productId == undefined ) {throw new Error("id para producto de carrito debe existir")}
            if (p.quantity == undefined || typeof p.quantity !== "number" ) {throw new Error("cantidad para producto de carrito debe existir y ser numerico")}
            Validador.validarRangoInt(p.quantity);
            Validador.validarRangoInt(p.productId);
        } catch(error) {throw error;}
    }
}