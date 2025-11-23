class Validador {
    static CastearInt(val) {
        if (parseInt(val) == NaN) {throw new Error("Nan");}
        else {return parseInt(val);}
    }
}
module.exports = Validador;