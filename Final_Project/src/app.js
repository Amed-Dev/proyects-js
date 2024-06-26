import Map from "./maps/map.js";
import events from "./events/events.js";
import { $ } from "./utils/dom.js";

class App {
  constructor() {
    this.initMap();
    this.bindEvents();
  }

  initMap() {
    this.map = new Map({
      container: "map",
      center: [40.73061, -73.935242], // Coordenadas por defecto
      zoom: 12,
      tileLayer: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      tileLayerOptions: {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      },
    });

    // Pedir la ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          this.map.addCurrentLocation(userCoords, 9);
        },
        (error) => {
          console.error("Error al obtener la ubicación: ", error);
        }
      );
    } else {
      console.error("La geolocalización no es soportada por este navegador.");
    }
    this.laodEvents();
  }

  laodEvents() {
    try {
      events.forEach((event) => {
        this.map.addEventMarker(event);
      });
    } catch (error) {
      console.error("Error laoding events", error);
    }
  }

  renderEvents(events) {
    this.map.clearMarkers();

    if (Array.isArray(events)) {
      events.forEach((event) => {
        this.map.addEventMarker(event);
      });
    } else{
      this.map.addEventMarker([events])
    }
  }

  listEvents(events) {
    const listContainer = $("#listEvents");
    listContainer.innerHTML = "";

    let list = document.createElement("ul");
    list.className = "list-group";
    let label = document.createElement("li");
    label.className = "list-group-item disabled";
    label.setAttribute("aria-disabled", "true");
    label.textContent = "Events Found";
    list.appendChild(label);

    events.forEach((event) => {
      let eventItem = document.createElement("li");
      eventItem.className = "list-group-item";
      eventItem.style.cursor = "pointer";
      eventItem.innerHTML = `<span>${event.name}</span> - <b>${event.category}</b>`;

      eventItem.addEventListener("click", () => {
        this.map.clearMarkers();
        const eventCoords = [event.latitude, event.longitude];
        this.map.addEventMarker(event);
        this.map.setView(eventCoords, 14);
      });
      list.appendChild(eventItem);
    });

    $("#listEvents").appendChild(list);
  }

  bindEvents() {
    $("#searchBtn").addEventListener("click", () => {
      this.searchEvents();
    });
    $("#searchInput").addEventListener("input", () => {
      this.searchEvents();
    });
    $("#searchForm").addEventListener("submit", () => {
      e.preventDefault();
      this.searchEvents();
    });
  }

  searchEvents() {
    const searchText = $("#searchInput").value.toLowerCase();
    const filteredEvents = events.filter((event) => {
      return (
        event.name.toLowerCase().includes(searchText) ||
        event.category.toLowerCase().includes(searchText)
      );
    });

    if (filteredEvents.length > 0) {
      const firstMatchCoords = [
        filteredEvents[0].latitude,
        filteredEvents[0].longitude,
      ];

      this.map.setView(firstMatchCoords, 14);
    }

    this.renderEvents(filteredEvents);
    this.listEvents(filteredEvents);
  }
}

const app = new App();
