async function handleGetLugarPorNombre(event) {
    event.preventDefault();
    const name = document.getElementById('buscarNombreInput').value;
    if (name) {
        await getLugaresPorNombre(name);
    } else {
        getTodosLosLugares();
    }
}

async function getLugaresPorNombre(name) {

    try {
        const response = await fetch(`http://localhost:8080/apiturismo/lugar/nombre/${name}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const responseData = await response.json();
        const data = responseData.data;
        console.log(data);
        let newDiv = "";
        data.forEach(lug => newDiv += crearLugarDiv(lug));
        document.getElementById('lugares').innerHTML = newDiv;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

async function getTodosLosLugares() {

    try {
        const response = await fetch(`http://localhost:8080/apiturismo/lugar`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const responseData = await response.json();
        const data = responseData.data;
        console.log(data);
        let newDiv = "";
        data.forEach(lug => newDiv += crearLugarDiv(lug));
        document.getElementById('lugares').innerHTML = newDiv;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


function crearLugarDiv(lugar) {
    console.log(`Lugar: ${lugar}`);
    return `
            <div class="lugar-Card">
                <a href="detalleLugar.html?id=${lugar.id}">
                    <img src="data:image/jpeg;base64,${lugar.imagen}" alt="" srcset="">
                    <span class="lupa-icon">
                    ${lugar.nombre}
                    </span>
                </a>
            </div>
        `
}



async function getLugaresPorId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    try {
        const response = await fetch(`http://localhost:8080/apiturismo/lugar/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const responseData = await response.json();
        const data = responseData.data;
        setDetail("detalleTitulo", data.nombre);
        setDetail("detalleUbicacion", data.ubicacion);
        setDetail("detalleDescripcion", data.descripcion);
        document.getElementById("detalleImagen").src = `data:image/jpeg;base64,${data.imagen}`;
        // setDetail("detalleImagen", data.imagen);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }

}

async function buscarPorId(id) {
    try {
        const response = await fetch(`http://localhost:8080/apiturismo/lugar/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const responseData = await response.json();
        const data = responseData.data;
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function setDetail(field, detail) {
    console.log("Call setDetail")
    document.getElementById(field).innerHTML = detail;
}


async function completarTablaTodosLosLugares() {

    try {
        const response = await fetch(`http://localhost:8080/apiturismo/lugar`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const responseData = await response.json();
        const data = responseData.data;
        console.log(data);
        data.forEach(lug => agregarFila(lug));
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function agregarFila(lug) {
    var table = document.getElementById("tablaLugares").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);

    // Inserta celdas en la nueva fila
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);

    // Añade contenido a las celdas
    cell1.innerHTML = lug.id;  // Id
    cell2.innerHTML = lug.nombre;  // Nombre
    cell3.innerHTML = lug.descripcion;  // Nombre
    cell4.innerHTML = lug.ubicacion;  // Ubicacion
    cell5.innerHTML = lug.categoria;  // Categoría
    cell6.innerHTML = `<img src="data:image/jpeg;base64,${lug.imagen}" alt="Imagen del lugar" class="imagenTabla">`;
    cell7.innerHTML = `
                    <div>
                        <button class="modificarBoton" onClick="modificar(${lug.id})">Modificar</button>
                        <button class="eliminarBoton" onClick="eliminar(${lug.id})">Eliminar</button>
                    </div>
                    `;
}

async function agregarNuevoLugar() {
    abrirModal('crearModal');
    agregarLugarModal();
}


async function modificar(id) {
    abrirModal('editarModal');
    await editarLugarModal(id);
}

async function eliminar(id) {
    abrirModal('eliminarModal');
    const deleteForm = `
    <div class="deleteContainer">
        <div>¿Desea eliminar el registro de id = ${id}?</div>
        <span>
            <button class="cancel" onclick="cerrarModal('eliminarModal')">Cancelar</button>
            <button class="accept" onclick="confirmarEliminar(${id})">Confirmar</button>
        </span>
    </div>
    `

    document.getElementById('modalEliminar').innerHTML = deleteForm;
}

async function confirmarEliminar(id) {
    let url = `http://localhost:8080/apiturismo/lugar/${id}`;

    let fetchOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        let response = await fetch(url, fetchOptions);
        if (!response.ok) {
            throw new Error('Error al eliminar el lugar: ' + response.statusText);
        } else {
            cerrarModal('eliminarModal');
            window.location.reload();
        }
    } catch (error) {
        console.error('Hubo un problema al eliminar el lugar:', error);
        alert('Hubo un problema al eliminar el lugar. Por favor, intenta de nuevo.');
    }
}

// Función para abrir el modal
function abrirModal(tipo) {
    var modal = document.getElementById(tipo);
    modal.style.display = 'block';

}

// Función para cerrar el modal
function cerrarModal(tipo) {
    var modal = document.getElementById(tipo);
    modal.style.display = 'none';
}


async function editarLugarModal(id) {

    let lug = await buscarPorId(id);
    console.log(lug);


    let editForm = ` <section class="modalSection">
        <input type="hidden" value = ${id} id ="idEdit">
        <h1>Formulario de Creación de Turismo</h1>
        <form enctype="multipart/form-data">
            <h2>Información General</h2>
            <label>Nombre del destino turístico:</label>
            <input type="text" id="nombre" name="nombre" value="${lug.nombre}" required>
    
            <label>Descripción:</label>
            <textarea id="descripcion" name="descripcion" required>${lug.descripcion}</textarea>
    
            <label>Ubicación:</label>
            <input type="text" id="ubicacion" name="ubicacion" value="${lug.ubicacion}" required>
            <label>Categoría:</label>
            <select id="categoria" name="categoria" value="">
                <option value="Playa">Playa</option>
                <option value="Montana">Montaña</option>
                <option value="Ciudad">Ciudad</option>
                <option value="Aventura">Aventura</option>
            </select>
            <label for="">Imagen del lugar:</label>
            <input type="file" id="imagen" name="imagen" value="${lug.imagen}">
            <input type="hidden" value = "${lug.imagen}" id ="oldImg">
            <button type="submit" onclick="confirmarEdicion(event)" >Enviar</button>
        </form>
        <button type="button" onClick="cerrarModal('editarModal')">Volver atrás</button>
    </section>`;

    document.getElementById('modalEditar').innerHTML = editForm;
    document.getElementById('categoria').value = lug.categoria;
}

async function agregarLugarModal() {

    let editForm = ` <section class="modalSection">
        <input type="hidden"  id ="idEdit">
        <h1>Formulario de Creación de Turismo</h1>
        <form enctype="multipart/form-data">
            <h2>Información General</h2>
            <label>Nombre del destino turístico:</label>
            <input type="text" id="nombre" name="nombre" required>
    
            <label>Descripción:</label>
            <textarea id="descripcion" name="descripcion" required></textarea>
    
            <label>Ubicación:</label>
            <input type="text" id="ubicacion" name="ubicacion" required>
            <label>Categoría:</label>
            <select id="categoria" name="categoria" value="">
                <option value="Playa">Playa</option>
                <option value="Montana">Montaña</option>
                <option value="Ciudad">Ciudad</option>
                <option value="Aventura">Aventura</option>
            </select>
            <label for="">Imagen del lugar:</label>
            <input type="file" id="imagen" name="imagen">
            <button type="submit" onclick="confirmarAgregar(event)" >Enviar</button>
        </form>
        <button type="button" onClick="cerrarModal('crearModal')">Volver atrás</button>
    </section>`;

    document.getElementById('modalCrear').innerHTML = editForm;
    document.getElementById('categoria').value = lug.categoria;
}

async function confirmarAgregar(event) {
    event.preventDefault();
    console.log("Confirmar agregar...");

    let pNombre = document.getElementById('nombre').value;
    let pDescripcion = document.getElementById('descripcion').value;
    let pUbicacion = document.getElementById('ubicacion').value;
    let pCategoria = document.getElementById('categoria').value;
    let pImagen = document.getElementById('imagen').files[0]; // Obtenemos el archivo

    // Convertir la imagen a Base64
    let pImagenBase64 = await convertirABase64(pImagen);

    let lugar = {
        nombre: pNombre,
        descripcion: pDescripcion,
        ubicacion: pUbicacion,
        categoria: pCategoria,
        imagen: pImagenBase64
    };

    let url = 'http://localhost:8080/apiturismo/lugar';

    let fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(lugar),
    };

    try {
        let response = await fetch(url, fetchOptions);

        if (!response.ok) {
            throw new Error('Error al agregar el lugar: ' + response.statusText);
        }

        cerrarModal('crearModal');
        window.location.reload();
    } catch (error) {
        console.error('Hubo un problema al agregar el lugar:', error);
        alert('Hubo un problema al agregar el lugar. Por favor, intenta de nuevo.');
    }
}


async function confirmarEdicion(event) {
    event.preventDefault();
    console.log("Confirmar edicion...");
    let pId = document.getElementById('idEdit').value;
    let pNombre = document.getElementById('nombre').value;
    let pDescripcion = document.getElementById('descripcion').value;
    let pUbicacion = document.getElementById('ubicacion').value;
    let pCategoria = document.getElementById('categoria').value;
    let pOldImg = document.getElementById('oldImg').value;
    let pImagen = document.getElementById('imagen').files[0];

    let lugar = {
        id: pId,
        nombre: pNombre,
        descripcion: pDescripcion,
        ubicacion: pUbicacion,
        categoria: pCategoria,
        imagen: pImagen ? await convertirABase64(pImagen) : pOldImg
    };

    // URL del endpoint de tu servidor Spring
    let url = 'http://localhost:8080/apiturismo/lugar';

    // Configuración de la petición fetch
    let fetchOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(lugar),
    };

    try {
        // Realizar la petición fetch
        let response = await fetch(url, fetchOptions);

        if (!response.ok) {
            throw new Error('Error al actualizar el lugar: ' + response.statusText);
        }

        cerrarModal('editarModal'); // Cerrar el modal si la petición fue exitosa
        window.location.reload(); // Recargar la página después de actualizar
    } catch (error) {
        console.error('Hubo un problema al actualizar el lugar:', error);
        alert('Hubo un problema al actualizar el lugar. Por favor, intenta de nuevo.');
    }
}


function convertirABase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}