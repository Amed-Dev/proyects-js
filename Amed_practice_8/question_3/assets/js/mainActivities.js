//data
import { MediosTransporte } from "./data.js";

// dom
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => context.querySelectorAll(selector);

const containerMediosTransporte = $(".container-medios-transporte");
const containerMediosTransporteSombras = $(".container-sombras");
const reproductor = $("#reproductor_audio");
const totalElements = MediosTransporte.length;
const scoreBoard = $("#scoreBoard");
let finalScore = 0;
let completedItems = 0;

shuffleArray(MediosTransporte);

MediosTransporte.forEach((medio) => {
  let container = document.createElement("div");
  container.className = "draggable-container";

  let imgMedioTransporte = document.createElement("img");
  imgMedioTransporte.src = medio.img;
  imgMedioTransporte.id = medio.nombre;
  imgMedioTransporte.className = "draggable";
  imgMedioTransporte.draggable = "true";
  container.appendChild(imgMedioTransporte);

  let icon = document.createElement("i");
  icon.className = "fas fa-check valid-icon";
  container.appendChild(icon);
  containerMediosTransporte.appendChild(container);
});

shuffleArray(MediosTransporte);

MediosTransporte.forEach((medio) => {
  let imgMedioTransporteSombras = document.createElement("img");
  imgMedioTransporteSombras.src = medio.sombras;
  imgMedioTransporteSombras.id = medio.nombre;
  imgMedioTransporteSombras.className = "droppable";

  containerMediosTransporteSombras.appendChild(imgMedioTransporteSombras);
});

function allowDrop(e) {
  e.preventDefault();
}

function drag(e) {
  e.dataTransfer.setData("image", e.target.src);
  e.dataTransfer.setData("id", e.target.id);

  const rect = e.target.getBoundingClientRect();
  e.dataTransfer.setData("offsetX", e.clientX - rect.left);
  e.dataTransfer.setData("offsetY", e.clientY - rect.top);
}

function drop(e) {
  e.preventDefault();
  var id = e.dataTransfer.getData("id");
  var data = e.dataTransfer.getData("image");

  if (id === e.target.id) {
    e.target.setAttribute("src", data);
    e.target.style.border = "#54ff54 solid 4px";
    reproductor.src = "./assets/audio/correct.mp3";
    reproductor.play();
    let draggableElement = $(`#${id}`);
    draggableElement.classList.add("is-valid", "disabled");
    draggableElement.setAttribute("draggable", "false");
    finalScore += 1;
    completedItems++;
    console.log(finalScore);
    console.log(completedItems);

    checkGameEnd();
  } else {
    e.stopPropagation();
    e.dataTransfer.dropEffect = "none";
    reproductor.src = "./assets/audio/wrong.mp3";
    reproductor.play();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const elementsDraggables = $$(".draggable");
  const elementsDroppables = $$(".droppable");

  elementsDraggables.forEach((eDraggable) => {
    eDraggable.addEventListener("dragstart", (e) => {
      eDraggable.style.cursor = "move";
      drag(e);
    });
    eDraggable.addEventListener("dragend", (e) => {
      e.target.style.visibility = "visible"; // Aseguramos que el elemento sea visible
    });
  });

  elementsDroppables.forEach((eDroppable) => {
    eDroppable.addEventListener("dragover", (e) => {
      allowDrop(e);
    });
    eDroppable.addEventListener("drop", (e) => {
      drop(e);
    });
  });
});

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function checkGameEnd() {
  if (completedItems === totalElements) {
    $(".score #scoreIndicator").innerText = `${finalScore} puntos`;
    const scoreModal = new bootstrap.Modal(scoreBoard);
    scoreModal.show();
    reproductor.src = "./assets/audio/feliz.mp3";
    reproductor.play();
  }
}

$("#btn-reload").addEventListener("click", () => {
  location.reload();
});
