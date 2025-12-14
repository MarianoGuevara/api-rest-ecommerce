// esto es la logica del cliente socket. En una app real va en la parte react de la app

const socket = io();

const lista = document.getElementById("lista");
const formulario = document.getElementById("formulario");
const formularioDos = document.getElementById("formularioDos");
const inputTitle = document.getElementById("title");

socket.on("error", e => {
    alert(e.mensaje);
});

socket.on("productos", productos => {
    lista.innerHTML = "";

    productos.forEach(p => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${p.title}
        `;
        console.log(p.status);
        lista.appendChild(li);
    });
});


formulario.addEventListener("submit", e => {
    e.preventDefault();

    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        price: Number(document.getElementById("price").value),
        stock: Number(document.getElementById("stock").value),
        category: document.getElementById("category").value,
        thumbnails: document
            .getElementById("thumbnails")
            .value
            .split(",")
            .map(t => t.trim()),
        status: true
    };

    socket.emit("crearProducto", producto);

    formulario.reset();
});

formularioDos.addEventListener("submit", e => {
    e.preventDefault();
    const id = document.getElementById("id").value
    socket.emit("eliminarProducto", id);
    formularioDos.reset();
})
function eliminar(id) {
    
}