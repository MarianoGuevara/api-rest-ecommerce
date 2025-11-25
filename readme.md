documentacion de capas:
-Vistas: maneja los endpoint

-Controlador: se comunica con vista y modelo; intermediario. Nombre comienza por handle que es manejar. Estaticos porque no necesito 
instancias. No hacen reglas de negocio, si tiene que castear castea datos de la vista para que el modelo los reciba de manera ok

-Modelo
   -Entidad: Interfaz de los objetos utilizados
   -Repositorio: 
      .nombres de metodos genericos, mismos que servicio en OPERACIONES BASICAS (luego podran implementar los suyos).
      .Se comunica con la forma de persistencia (sql,mongo,archivos,firebase), 
      .la persistencia no debe devolver error si no encuentra un registro; en exito devuelve el OBJETO, si no encontro algo, UNDEFINED
   -Servicio: 
      .nombres de metodos genericos, mismos que repositorio en OPERACIONES BASICAS (luego podran implementar los suyos). 
      .Aplica todas las reglas de negocio.
      .genera excepciones de negocio