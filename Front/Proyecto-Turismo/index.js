/* BOTONES ANTERIOR Y SIGUIENTE DE SECCION LUGARES */
/* document.addEventListener("DOMContentLoaded", function(){
    let pag1= document.getElementById("pag1");
    let pag2= document.getElementById("pag2");
    let siguientebtn = document.getElementById("siguiente");
    let anteriorbtn = document.getElementById("anterior");

        siguientebtn.addEventListener("click", function(){
        pag1.style.display= "none";
        pag1.style.visibility= "hidden";
        
        pag2.style.display= "flex";
        pag2.style.visibility= "visible";

        window.scrollTo(0, 0);
    })

    anteriorbtn.addEventListener("click", function(){
        pag2.style.display= "none";
        pag2.style.visibility= "hidden";

        pag1.style.display= "flex";
        pag1.style.visibility= "visible";

        window.scrollTo(0, 0);
    })
})  */


// const apiUrl = "apiLugares.json";

// function makeCards(data) {
//     const { nombre, imagen } = data;
//     const cardsContainer = document.querySelector(".lugares");

//     // Crear elementos para el nuevo lugar
//     const lugar = document.createElement("div");
//     lugar.classList.add("lugar");
//     lugar.setAttribute("data-aos", "fade-up");
//     lugar.setAttribute("data-aos-duration", "3000");

//     const link = document.createElement("a");
//     link.href = "detalleLugar.html";

//     const imagenLugar = document.createElement("img");
//     imagenLugar.classList.add("imagen-lugar");
//     imagenLugar.src = imagen;
//     imagenLugar.alt = nombre;

//     const titleLugar = document.createElement("h4");
//     titleLugar.classList.add("nombre-lugar");
//     titleLugar.textContent = nombre;

//     link.appendChild(imagenLugar);
//     link.appendChild(titleLugar);
//     lugar.appendChild(link);
//     cardsContainer.appendChild(lugar);
// }

// async function getLugares() {
//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         const lugares = data.lugares;

//         for (let i = 0; i < lugares.length; i++) {
//             makeCards(lugares[i]);
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }

// getLugares();


function backToHome() {
    window.location.href = "index.html";
}