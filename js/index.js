import Anuncio_Auto from "./anuncio_auto.js";


// ------>  Variables
const dataLocalStorage = "lista";
let listado = getData() || [];
let elementId = document.getElementById("element-id");
let titulo = document.getElementById("titulo");
let tipoTransaccion = document.getElementById("transaccion");
let descripcion = document.getElementById("descripcion");
let precio = document.getElementById("precio");
let puertas = document.getElementById("puertas");
let kilometraje = document.getElementById("km");
let potencia = document.getElementById("potencia");

// Botones
const guardar = document.getElementById('btnGuardar');




// ------>  Event Listeners

window.addEventListener("DOMContentLoaded", () => {
    displayTabla();

  });

// Evento click
guardar.addEventListener('click', guardarNuevoElemento);

// Evento enter
guardar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        alert('Enter presionado');
        guardarNuevoElemento(e);
    }
});


// ------>  Funciones


//Manipulación Local Storage
function getData () {
    return JSON.parse(localStorage.getItem("lista"));
}

function postLocalStorage (clave, info) {
    localStorage.setItem(clave, JSON.stringify(info));
}

//Manipulación Tabla

function displayTabla () {
    const tabla = crearTabla(listado);
    const contenedor = document.getElementById("tabla");
    contenedor.removeChild(contenedor.firstChild);
    contenedor.appendChild(tabla);
  }

function crearTabla (lista) {
    //Crear tabla
    const tabla = document.createElement("table");
    tabla.classList.add('responsiveTable');
    //Crear headers
    tabla.appendChild(tablaCrearHeaders(lista[0]));
    //Crear body
    tabla.appendChild(tablaCrearBody(lista));
    return tabla;
}

function tablaCrearHeaders (lista) {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    for (const key in lista) {
      if (key != "id") {
        const th = document.createElement("th");
        th.textContent = key;
        tr.appendChild(th);
      }
    }
    thead.appendChild(tr);
    return thead;
}

function tablaCrearBody (lista) {
    const tbody = document.createElement("tbody");
    lista.forEach((element) => {
      const tr = document.createElement("tr");
      for (const key in element) {
        if (key === "id") {
          tr.setAttribute("data-id", element[key]);
        } else {
          const td = document.createElement("td");
          td.setAttribute("data-label", key);
          td.textContent = element[key];
          tr.appendChild(td);
        }
      }
      tbody.appendChild(tr);
    });
    return tbody;
}




// Manipulación Elementos

function guardarNuevoElemento (e) {
    e.preventDefault();

    // console.log(elementId.value);
    // console.log(titulo.value);
    // console.log(tipoTransaccion.value);
    // console.log(descripcion.value);
    // console.log(precio.value);
    // console.log(puertas.value);
    // console.log(kilometraje.value);
    // console.log(potencia.value);

    if (elementId.value == '' && 
        titulo.value.trim() != '' &&
        tipoTransaccion.value.trim() != '' &&
        descripcion.value.trim() != '' &&
        precio.value.trim() != '' &&
        puertas.value.trim() != '' &&
        kilometraje.value.trim() != '' &&
        potencia.value.trim() != ''
    ) {
        let newId = Date.now();
        console.log("if");
        let element = new Anuncio_Auto(newId, titulo.value, tipoTransaccion.value, descripcion.value, precio.value, puertas.value, kilometraje.value, potencia.value);
        listado.push(element);
        postLocalStorage(dataLocalStorage, listado);
        displayTabla(listado);
    }
}
