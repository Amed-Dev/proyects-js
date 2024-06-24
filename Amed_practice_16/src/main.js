var map = L.map("map").setView([-13.57, -71.89], 9);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var icon = L.icon({
  iconUrl: "./assets/img/marker-arqueologico.png",
  iconSize: [30, 40],
});
var iconMuseum = L.icon({
  iconUrl: "./assets/img/marker-museos.png",
  iconSize: [30, 40],
});

fetch("./src/recursos.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((point) => {
      L.marker([point.latitud, point.longitud], { icon: icon })
        .bindPopup(`<b>${point.nombre}</b><br>${point.categoria}`)
        .addTo(map);
    });
  });

fetch("./src/provincias.json")
  .then((response) => response.json())
  .then((data) => {
    const provinciaSelect = document.querySelector("#provinciaSelect");
    const provinciasMap = new Map();

    data.forEach((provincia) => {
      if (!provinciasMap.has(provincia.provincia)) {
        provinciasMap.set(provincia.provincia, provincia);

        const option = document.createElement("option");
        option.value = provincia.provincia;
        option.text = provincia.provincia;
        option.setAttribute("data-latitud", provincia.latitud);
        option.setAttribute("data-longitud", provincia.longitud);
        option.setAttribute("data-zoom", provincia.zoom);
        provinciaSelect.appendChild(option);
      }
    });

    provinciaSelect.addEventListener("change", (e) => {
      const selectedIndex = e.target.selectedIndex; 
      const optionSelected = e.target.options[selectedIndex];

      const latitud = optionSelected.getAttribute("data-latitud");
      const longitud = optionSelected.getAttribute("data-longitud");
      const zoom = optionSelected.getAttribute("data-zoom");

      if (latitud && longitud) {
        map.setView([latitud, longitud], zoom);
      }
    });
  });
