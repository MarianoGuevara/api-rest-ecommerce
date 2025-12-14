export default class Validador {
    static castearInt(val) {
        if (isNaN(parseInt(val))) {throw new Error("Nan");}
        else {return parseInt(val);}
    }

    static validarLargoString(val, min){
        if (val.length < min) {throw new Error("String demasiado corto");}
    }

    static validarRangoInt(val, min=1){
        if (val < min) {throw new Error("Numeros no menores a " + min);}
    }
}