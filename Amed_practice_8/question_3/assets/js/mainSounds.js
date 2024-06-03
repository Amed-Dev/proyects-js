import { MediosTransporte } from "./data.js";
import { $, $$ } from "./utils/dom.js";

const terrestresContainer = $("section #terrestres .container-medios");
const aereosContainer = $("section #aereos .container-medios");
const acuaticosContainer = $("section #acuaticos .container-medios");
const reproductor = $("#reproductor_audio");

MediosTransporte.forEach((medio, i) => {
  let containerTransport = document.createElement("div");
  containerTransport.className = "medio_transporte";

  let imgMedioTransporte = document.createElement("img");
  imgMedioTransporte.src = medio.img;
  imgMedioTransporte.id = medio.nombre;
  imgMedioTransporte.dataset.index = i;
  containerTransport.appendChild(imgMedioTransporte);

  let transportName = document.createElement("p");
  transportName.className = "text-capitalize my-2";
  transportName.innerText = medio.nombre;
  containerTransport.appendChild(transportName);

  if (medio.tipoMedio === "terrestre") {
    terrestresContainer.appendChild(containerTransport);
  } else if (medio.tipoMedio === "acuático") {
    acuaticosContainer.appendChild(containerTransport);
  } else {
    aereosContainer.appendChild(containerTransport);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const imgsClickeables = $$(
    "section .tipo_medio .container-medios .medio_transporte img"
  );

  imgsClickeables.forEach((img) => {
    img.addEventListener("click", (e) => {
      let i = e.target.dataset.index;
      let audioSrc = MediosTransporte[i].audio;
      reproductor.src = audioSrc;
      reproductor.play();
    });
  });
});
