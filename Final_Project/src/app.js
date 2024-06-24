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
          this.map.setView(userCoords, 12);
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
    events.forEach((event) => {
      this.map.addEventMarker(event);
    });
  }

  bindEvents() {
    $("#searchBtn").addEventListener("click", () => {
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
    console.log(filteredEvents);
    this.renderEvents(filteredEvents);
  }
}

const app = new App();
