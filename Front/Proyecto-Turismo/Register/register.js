document.getElementById('registerForm').addEventListener('submit', function (e) {

    let formularioValido = true;

    if (!(validarObligatorio('nombre') && validarSoloLetras('nombre'))) {
        formularioValido = false;
    }

    if (!(validarObligatorio('apellido') && validarSoloLetras('apellido'))) {
        formularioValido = false;
    }

    if (!validarEmail('email')) {
        formularioValido = false;
    }


    if (!(validarObligatorio('password') && validarCaracteresMinimos('password'))) {
        formularioValido = false;
    }

    if (validarObligatorio('confirmar')) {
        formularioValido = false;
    }

    if (!validarPassword()) {
        formularioValido = false;
    }

    if (!terminosYcondicionesAceptados()) {
        formularioValido = false;
    }


    if (!formularioValido) {
        e.preventDefault();
    }

})


function validarObligatorio(nombreCampo) {

    const campo = document.getElementById(nombreCampo).value;
    const error = document.getElementById(nombreCampo + 'Error')

    if (campo === null || campo === undefined || campo === '') {
        error.innerHTML = "El campo es obligatorio.";
        return false;
    } else {
        error.innerHTML = "";
        return true;
    }
}

function validarSoloLetras(nombreCampo) {
    const campo = document.getElementById(nombreCampo).value;
    const error = document.getElementById(nombreCampo + 'Error')
    const patron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!patron.test(campo)) {
        error.innerHTML = "El campo solo acepta letras.";
        return false;
    } else {
        error.innerHTML = "";
        return true;
    }
}

function validarEmail(nombreCampo) {
    const campo = document.getElementById(nombreCampo).value;
    const error = document.getElementById(nombreCampo + 'Error');
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (validarObligatorio(nombreCampo)) {
        if (!regex.test(campo)) {
            error.innerHTML = "El correo debe contener @ y .(dominio)";
            return false;
        } else {
            error.innerHTML = "";
            return true;
        }
    }
}

function validarPassword() {
    const password = document.getElementById('password').value;
    const confirmar = document.getElementById('confirmar').value;
    const error = document.getElementById('confirmarError');

    if (password !== confirmar) {
        error.innerHTML = "Las contraseñas no coinciden.";
        return false;
    } else {
        error.innerHTML = "";
        return true;
    }
}

function terminosYcondicionesAceptados() {
    const aceptado = document.getElementById('terminos');
    const error = document.getElementById('terminosError');
    if (!aceptado.checked) {
        error.innerHTML = "Se debe aceptar los terminos y condiciones";
    } else {
        error.innerHTML = "";
        return true;
    }
}


function validarCaracteresMinimos(nombreCampo) {
    const campo = document.getElementById(nombreCampo).value;
    const error = document.getElementById(nombreCampo + 'Error')
    console.log(`lenght: ${campo.lenght}`)
    if (campo.length < 8) {
        error.innerHTML = "El campo debe tener minimo 8 caracteres.";
        return false;
    } else {
        error.innerHTML = "";
        return true;
    }
}