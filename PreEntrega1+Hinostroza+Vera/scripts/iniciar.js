document.addEventListener("DOMContentLoaded", function () {
    const iniciarButton = document.getElementById("iniciar-button");
    const usuarioInput = document.getElementById("usuario");
    const passwordInput = document.getElementById("password");
    const mensajeDiv = document.getElementById("mensaje");
    const entradaInput = document.getElementById("entrada");
    const botonAceptar = document.getElementById("botonAceptar");

    iniciarButton.addEventListener("click", function () {
        const usuarioIngresado = usuarioInput.value;
        const passwordIngresado = passwordInput.value;

        
        fetch('file:///C:/Users/Dario/OneDrive/Escritorio/PreEntrega1+Hinostroza+Vera/pages/html.html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario: usuarioIngresado, contrasena: passwordIngresado }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.autenticado) {
                showMessage(`¡Bienvenido, ${usuarioIngresado}! Has iniciado sesión correctamente.`);
                login();
            } else {
                showMessage("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
            }
        })
        .catch(error => {
            showMessage(`Error en la solicitud: ${error.message}`);
        });
    });

});






document.addEventListener("DOMContentLoaded", function () {
    const iniciarButton = document.getElementById("iniciar-button");
    const usuarioInput = document.getElementById("usuario");
    const passwordInput = document.getElementById("password");
    const mensajeDiv = document.getElementById("mensaje");
    const entradaInput = document.getElementById("entrada");
    const botonAceptar = document.getElementById("botonAceptar");

    iniciarButton.addEventListener("click", function () {
        const usuarioIngresado = usuarioInput.value;
        const passwordIngresado = passwordInput.value;

        const usuarioGuardadoJSON = localStorage.getItem("usuario");

        if (usuarioGuardadoJSON) {
            const usuarioGuardado = JSON.parse(usuarioGuardadoJSON);

            if (usuarioIngresado === usuarioGuardado.nombre && passwordIngresado === usuarioGuardado.contrasena) {
                showMessage(`¡Bienvenido, ${usuarioIngresado}! Has iniciado sesión correctamente.`);

                login();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "incorrecto",
                    text: "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.",
                  });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "incorrecto",
                text: "No hay datos de usuario almacenados. Por favor, regístrate primero.",
              });
        }
    });

    function showMessage(message) {
        mensajeDiv.textContent = message;
        mensajeDiv.style.display = "block";
        entradaInput.style.display = "none";
        botonAceptar.style.display = "none";
    }

    function getUserInput(promptMessage, validationFunction) {
        mensajeDiv.textContent = promptMessage;
        mensajeDiv.style.display = "block";
        entradaInput.style.display = "block";
        botonAceptar.style.display = "block";

        return new Promise((resolve) => {
            botonAceptar.addEventListener("click", function () {
                const input = entradaInput.value;
                if (validationFunction(input)) {
                    resolve(input);
                    showMessage(""); // Limpiar el mensaje
                } else {
                    showMessage("Entrada inválida. Por favor, inténtalo de nuevo.");
                }
            });
        });
    }

    async function login() {
        showMessage("Cajero Virtual");
        let saldo = 1000;

        while (true) {
            const opcion = await getUserInput("Elige una de las opciones: (1)-Retirar  (2)-Ingresar  (3)-Salir", input => ["1", "2", "3"].includes(input));

            if (opcion === "1") {
                let monto = parseInt(await getUserInput("Ingrese el monto a retirar:", input => !isNaN(input) && saldo >= parseInt(input)));
                saldo -= monto;
                showMessage("Su saldo actual es de: $" + saldo);
                console.log("Su saldo actual es de: $" + saldo);
            } else if (opcion === "2") {
                let monto = parseInt(await getUserInput("Ingrese el monto a depositar:", input => !isNaN(input)));
                saldo += monto;
                showMessage("Su saldo actual es de: $" + saldo);
                console.log("Su saldo actual es de: $" + saldo);
            } else if (opcion === "3") {
                Swal.fire({
                    title: "<strong>Gracias por su visita</strong>",
                    icon: "info",
                    html: `
             
                    `,
                    showCloseButton: true,
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: `
                      <i class="fa fa-thumbs-up"></i> Great!
                    `,
                    confirmButtonAriaLabel: "Thumbs up, great!",
                    cancelButtonText: `
                      <i class="fa fa-thumbs-down"></i>
                    `,
                    cancelButtonAriaLabel: "Thumbs down"
                  });

                break;
            }
        }
    }
});
