//data
import { MediosTransporte } from "./data.js";
import { $, $$ } from "./utils/dom.js";

const containerMediosTransporte = $("#medios-transporte");
const containerMediosTransporteSombras = $("#sombras");
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
  imgMedioTransporteSombras.className = "droppable dropzone";
  imgMedioTransporteSombras.setAttribute("draggable", "false");

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

  e.target.style.cursor = "move";
  e.target.style.opacity = "1";
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

    checkGameEnd();
  } else {
    e.stopPropagation();
    e.dataTransfer.dropEffect = "none";
    reproductor.src = "./assets/audio/wrong.mp3";
    reproductor.play();
    returnElement(id);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const elementsDraggables = $$(".draggable[draggable='true']");
  const elementsDroppables = $$(".droppable");

  elementsDraggables.forEach((eDraggable) => {
    eDraggable.addEventListener("mouseenter", () => {
      $("html").style.cursor = "move";
    });

    eDraggable.addEventListener("mouseleave", () => {
      $("html").style = "";
    });

    eDraggable.addEventListener("dragstart", (e) => {
      eDraggable.style.cursor = "move";
      drag(e);
      elementsDroppables.forEach((droppable) => {
        droppable.classList.add("drop-active");
      });
    });
    eDraggable.addEventListener("drag", () => {
      eDraggable.style.cursor = "move";
      eDraggable.style.opacity = "1";
    });

    eDraggable.addEventListener("dragend", (e) => {
      e.target.style.visibility = "visible";
      e.target.style.opacity = "1";
      elementsDroppables.forEach((droppable) => {
        droppable.classList.remove("drop-active");
      });
    });
  });

  elementsDroppables.forEach((eDroppable) => {
    eDroppable.addEventListener("dragover", (e) => {
      e.target.classList.add("drop-target");
      allowDrop(e);
    });
    eDroppable.addEventListener("dragleave", (e) => {
      e.target.classList.remove("drop-target");
    });
    eDroppable.addEventListener("drop", (e) => {
      e.target.classList.remove("drop-target");
      drop(e);
    });
  });
});

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function returnElement(id) {
  const element = $(`#${id}`);
  const originalParent = element.parentElement;
  const originalPosition = originalParent.getBoundingClientRect();
  const elementPosition = element.getBoundingClientRect();
  const offsetX = elementPosition.left - originalPosition.left;
  const offsetY = elementPosition.top - originalPosition.top;

  element.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
  element.classList.add("return-animation");

  setTimeout(() => {
    element.classList.remove("return-animation");
    element.style.transform = "";
  }, 500);
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
scoreBoard.addEventListener("hidden.bs.modal", () => {
  location.reload();
});
