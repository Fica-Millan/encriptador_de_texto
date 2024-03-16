const txtAencriptar = document.querySelector(".campo-texto");
const txtEncriptado = document.querySelector(".texto");

//matriz que contiene las reglas de encriptación
const matrizCodigo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
];

function btnEncriptar() {
    //Obtiene el texto ingresado en el campo de texto (txtAencriptar) y lo convierte a minúsculas.
    const texto = encriptar(txtAencriptar.value.toLowerCase());

    // Verificar si el texto contiene acentos
    if (texto.match(/[áéíóú]/)) {
        // Mostrar el modal
        const modal = document.getElementById("myModal");
        modal.style.display = "block";

        // Cuando el usuario haga clic en al "x", cerrar el modal
        const span = document.getElementsByClassName("close")[0];
        span.onclick = function () {
            modal.style.display = "none";
            txtAencriptar.value = ""; 
        };

        // O cuando el usuario haga clic en cualquier parte fuera del modal, cerrar el modal
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                txtAencriptar.value = ""; 
            }
        };

        return; // Salir de la función si se encuentra un acento
    }

    // Si no hay acentos, proceder con la encriptación
    txtEncriptado.value = texto;
    txtAencriptar.value = "";

    // Ocultar la sección que contiene la imagen y el texto
    document.getElementById("seccion-derecha").style.display = "none";

    // Mostrar la sección encriptada
    document.querySelector(".seccion-encriptada").style.display = "block";
}

function encriptar(textoEncriptado) {
    for (let i = 0; i < matrizCodigo.length; i++) {
        if (textoEncriptado.includes(matrizCodigo[i][0])) {
            textoEncriptado = textoEncriptado.replaceAll(
                matrizCodigo[i][0],
                matrizCodigo[i][1])
        }
    }
    return textoEncriptado;
}

function btnDesencriptar() {
    const texto = desencriptar(txtAencriptar.value.toLowerCase());
    txtEncriptado.value = texto;
    txtAencriptar.value = "";
}

function desencriptar(textoEncriptado) {
    for (let i = 4; i >= 0; i--) {
        if (textoEncriptado.includes(matrizCodigo[i][1])) {
            textoEncriptado = textoEncriptado.replaceAll(
                matrizCodigo[i][1],
                matrizCodigo[i][0])
        }
    }
    return textoEncriptado;
}

document.getElementById("boton-copiar").addEventListener("click", function () {
    txtEncriptado.select();

    // Escribir el texto seleccionado en el portapapeles
    navigator.clipboard.writeText(txtEncriptado.value)
        .then(function () {
            console.log("Texto copiado al portapapeles correctamente.");
        })
        .catch(function (err) {
            console.error("Error al intentar copiar el texto al portapapeles:", err);
        });

    // Quitar el enfoque del textarea después de copiar
    txtEncriptado.blur();
});

document.getElementById("boton-limpiar").addEventListener("click", function() {
    // Redirigir de vuelta al index.html
    window.location.href = "index.html";
});