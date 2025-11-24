class Validador {
    static CastearInt(val) {
        if (isNaN(parseInt(val))) {throw new Error("Nan");}
        else {return parseInt(val);}
    }

    static ValidarString(val, min){
        if (val.length < min) {throw new Error("String demasiado corto");}
    }

    static ValidarInt(val, min=1){
        if (val < min) {throw new Error("Numeros no menores a ",min);}
    }
}
module.exports = Validador;