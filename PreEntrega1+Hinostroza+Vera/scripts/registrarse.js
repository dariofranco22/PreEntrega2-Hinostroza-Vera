// Espera a que el documento HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene una referencia al formulario y al botón de registro
    const formulario = document.getElementById("registro-form");
    const botonRegistrar = document.getElementById("registrar-button");

    // Agrega un controlador de eventos al botón "Registrar"
    botonRegistrar.addEventListener("click", function (e) {
        e.preventDefault(); // Evita el envío del formulario

        // Obtiene los valores de los campos del formulario
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
        const direccion = document.getElementById("direccion").value;
        const dni = document.getElementById("dni").value;
        const contrasena = document.getElementById("contrasena").value;
        const confirmarContrasena = document.getElementById("confirmar_contrasena").value;

        // Verifica si las contraseñas coinciden
        if (contrasena !== confirmarContrasena) {
           /*  alert("Las contraseñas no coinciden."); */
           Swal.fire({
            icon: "error",
            title: "incorrecto",
            text: "Vuelva a intentarlo!",
            footer: `<a href="html.html">ya esta registrado?</a> `
          });


            return;
        }

        // Crea un objeto para almacenar los datos del usuario
        const usuario = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            direccion: direccion,
            dni: dni,
            contrasena: contrasena,
        };

        // Convierte el objeto a JSON
        const usuarioJSON = JSON.stringify(usuario);

        // Guarda el objeto JSON en el almacenamiento local
        localStorage.setItem("usuario", usuarioJSON);

        // Muestra un mensaje de confirmación
        // Muestra un mensaje de confirmación en el elemento 'mensaje-confirmacion'
        const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");
        mensajeConfirmacion.textContent = "Registro exitoso. Los datos se han guardado en el almacenamiento local.";
        mensajeConfirmacion.style.display = "block"; // Mostrar el mensaje

        // Ocultar el mensaje de confirmación después de 5 segundos
        setTimeout(function() {
        mensajeConfirmacion.style.display = "none";
        }, 5000);

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Registrado",
            showConfirmButton: false,
            timer: 1500
          });
  

    });
});



