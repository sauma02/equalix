
function buscar(){
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search-form").addEventListener("submit", function (e) {
        e.preventDefault();

        // Obtener el número de cédula ingresado
        const cedula = document.getElementById("numero_documento").value.trim();

        // Verificar si la cédula existe en el almacenamiento
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

        if (usuarios[cedula]) {
            // Guardar la cédula en localStorage para usarla en la siguiente página
            localStorage.setItem("cedula_actual", cedula);

            // Redirigir a la página de detalles
            window.location.href = "informe.html";
        } else {
            alert("Número de documento no encontrado. Por favor, ingrese una cédula válida.");
        }
    });
});
}