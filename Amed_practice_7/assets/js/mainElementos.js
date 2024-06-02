import { $, $$ } from "./utils/dom.js";

async function showElements() {
  try {
    const urlDataElements = "./assets/data/elementos.json";
    const response = await fetch(urlDataElements);
    if (response.ok) {
      let data = await response.json();
      showElementsInfo(data);
    }
  } catch (e) {
    console.error(`No hemos podido cargar los datos - ${e.message}`);
  }
}
showElements();

function showElementsInfo(data) {
  let contentElements = document.createDocumentFragment();
  let elementField = document.createElement("ol");
  elementField.id = "Ptable";
  elementField.className = "bg-dark-subtle rounded rounded-1";
  let groups = `
    <div class="Group"></div>
    <div class="Group" data-num="1">1</div>
    <div class="Group" data-num="2">2</div>
    <div class="Group G3" data-num="3">3</div>
    <div class="Group" data-num="4">4</div>
    <div class="Group" data-num="5">5</div>
    <div class="Group" data-num="6">6</div>
    <div class="Group" data-num="7">7</div>
    <div class="Group" data-num="8">8</div>
    <div class="Group" data-num="9">9</div>
    <div class="Group" data-num="10">10</div>
    <div class="Group" data-num="11">11</div>
    <div class="Group" data-num="12">12</div>
    <div class="Group" data-num="13">13</div>
    <div class="Group" data-num="14">14</div>
    <div class="Group"><span data-num="15">15</span><a href="https://es.wikipedia.org/wiki/Grupo_del_nitr%C3%B3geno">Pnictogens</a></div>
    <div class="Group"><span data-num="16">16</span><a href="https://es.wikipedia.org/wiki/Anf%C3%ADgeno">Anfígeno</a></div>
    <div class="Group"><span data-num="17">17</span><a href="https://es.wikipedia.org/wiki/Hal%C3%B3genos">Halógenos</a></div>
    <div class="Group" data-num="18">18</div> 

    <div id="KeyRegion" class="KeyRegion" dir="ltr"></div> 
    <div class="WideKeyRegion d-none"></div>
    <div class="OldSlider"></div>
    <div id="Legend" class="Legend">
      <b>Atomic</b>
      <abbr>Símbolo</abbr>
      <em>Nombre</em>
      <data>peso</data>
    </div>
  `;

  elementField.innerHTML = groups;

  let currentPeriod = 1;
  let periodDiv = document.createElement("div");
  periodDiv.className = "Period";
  periodDiv.setAttribute("data-num", currentPeriod);
  periodDiv.textContent = currentPeriod;
  elementField.appendChild(periodDiv);

  // Definir los elementos que marcan el final de un periodo
  const periodEndingElements = ["He", "Ne", "Ar", "Kr", "Xe", "Rn"];

  data.map((e) => {
    let listItem = document.createElement("li");
    let type = Array.isArray(e.tipo);
    listItem.className = type ? e.tipo.map((t) => t).join(" ") : e.tipo;
    listItem.innerHTML = `
      <b>${e.numero_atomico}</b>
      <abbr>${e.simbolo}</abbr>
      <em>${e.nombre}</em>
      <data data-abridged="${e.masa}">${e.masa}</data>
    `;
    elementField.appendChild(listItem);

    if (periodEndingElements.includes(e.simbolo)) {
      currentPeriod++;
      let periodDiv = document.createElement("div");
      periodDiv.className = "Period";
      periodDiv.setAttribute("data-num", currentPeriod);
      periodDiv.textContent = currentPeriod;
      elementField.appendChild(periodDiv);
    }

    if (e.numero_atomico === 56) {
      let verticalInner = document.createElement("div");
      verticalInner.className = "VerticalInner";
      verticalInner.id = "VerticalInner";
      elementField.appendChild(verticalInner);

      let label57to71 = document.createElement("div");
      label57to71.className = "Label57to71";
      label57to71.innerHTML = `<span data-num="57">57</span>–<span data-num="71">71</span>`;
      elementField.appendChild(label57to71);

      let periodRemoved = document.createElement("div");
      periodRemoved.className = "Period Removed6";
      periodRemoved.setAttribute("data-num", "6");
      periodRemoved.textContent = "6";
      elementField.appendChild(periodRemoved);
    }
    if (e.numero_atomico === 88) {
      let label89to103 = document.createElement("div");
      label89to103.className = "Label89to103";
      label89to103.innerHTML = `<span data-num="89">89</span>–<span data-num="103">103</span>`;
      elementField.appendChild(label89to103);

      let periodRemoved = document.createElement("div");
      periodRemoved.className = "Period Removed7";
      periodRemoved.setAttribute("data-num", "7");
      periodRemoved.textContent = "7";
      elementField.appendChild(periodRemoved);
    }
  });
  let containerInner = document.createElement("div");
  containerInner.className = "PosterLogo";
  elementField.appendChild(containerInner);

  let posterInfo = document.createElement("div");
  posterInfo.className = "Parentheses";
  posterInfo.id = "Parentheses";
  posterInfo.setAttribute(
    "data-default",
    "En el caso de los elementos con isotopos no estables, entre parentesis se encuentran las masas de aquellos isótopos que son más estables o más abundantes."
  );
  posterInfo.textContent =
    "En el caso de los elementos con isotopos no estables, entre parentesis se encuentran las masas de aquellos isótopos que son más estables o más abundantes.";
  contentElements.appendChild(elementField);
  elementField.appendChild(posterInfo);

  $("#elementsChemistryContainer").appendChild(contentElements);
}
