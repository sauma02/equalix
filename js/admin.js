let usuarios = new Map(); // Ahora sí es un HashMap


document.addEventListener("DOMContentLoaded", () => {
    let data = localStorage.getItem("usuarios");
    if (data) {
        usuarios = new Map(JSON.parse(data)); // Convertir JSON a Map
        actualizarLista();
    }
});

function guardarEnLocalStorage() {
    localStorage.setItem("usuarios", JSON.stringify([...usuarios])); // Convertir Map a JSON
}



// Función para mostrar alertas
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Capturar el formulario
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cedulas-form").addEventListener("submit", (e) => {
        e.preventDefault();
        añadirUsuario();
    });
});

function añadirUsuario() {
    let nombre = document.getElementById("nombre").value.trim();
    let cedula = document.getElementById("cedula").value.trim();

    if (!nombre || !cedula) {
        showAlert("Todos los campos son obligatorios", "danger");
        return;
    }

    if (usuarios.has(cedula)) {
        showAlert("Esta cédula ya está registrada", "danger");
        return;
    }

    // Agregar usuario al HashMap
    usuarios.set(cedula, nombre);
    guardarEnLocalStorage();
    actualizarLista();
    document.getElementById("cedulas-form").reset(); // Limpiar formulario
}

function actualizarLista() {
    const listaUsuarios = document.getElementById("lista");
    listaUsuarios.innerHTML = ""; // Limpiar lista antes de agregar datos

    usuarios.forEach((nombre, cedula) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${nombre}</td>
            <td>${cedula}</td>
            <td>
                <a href="#" onclick="actualizar('${cedula}')" class="btn btn-warning btn-sm edit">Editar</a>
                <a href="#" onclick="eliminarUsuario('${cedula}')" class="btn btn-danger btn-sm delete">Borrar</a>
            </td>
        `;
        listaUsuarios.appendChild(tr);
    });
}

function eliminarUsuario(cedula) {
    usuarios.delete(cedula);
    guardarEnLocalStorage();
    actualizarLista();
}

function actualizar(cedula) {
    let nombreActual = usuarios.get(cedula);
    let nuevoNombre = prompt("Editar nombre:", nombreActual);
    let nuevaCedula = prompt("Editar cédula:", cedula);

    if (!nuevoNombre || nuevoNombre.trim() === "" || !nuevaCedula || nuevaCedula.trim() === "") {
        showAlert("No puedes dejar campos vacíos", "danger");
        return;
    }

    // Eliminar la clave anterior y agregar la nueva
    usuarios.delete(cedula);
    usuarios.set(nuevaCedula, nuevoNombre.trim());
    guardarEnLocalStorage();
    actualizarLista();
}