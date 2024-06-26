const iconMappings = {
  Música: L.icon({
    iconUrl: "./assets/music.png",
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  Literatura: L.icon({
    iconUrl: "./assets/literature.png",
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  Negocios: L.icon({
    iconUrl: "./assets/business.png",
    iconSize: [30, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  Fotografía: L.icon({
    iconUrl: "./assets/photography.png",
    iconSize: [30, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  Ciencia: L.icon({
    iconUrl: "./assets/ciencia.png",
    iconSize: [30, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  Arte: L.icon({
    iconUrl: "./assets/art.png",
    iconSize: [30, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  Cultura: L.icon({
    iconUrl: "./assets/danza.png",
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  Gastronomía: L.icon({
    iconUrl: "./assets/gastronomia.png",
    iconSize: [60, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  Tecnología: L.icon({
    iconUrl: "./assets/tech.png",
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  Deportes: L.icon({
    iconUrl: "./assets/deporte.png",
    iconSize: [35, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  Cine: L.icon({
    iconUrl: "./assets/cine.png",
    iconSize: [60, 60],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  // Agrega más categorías según tus necesidades
  default: L.icon({
    iconUrl: "./assets/default.png",
    iconSize: [30, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
};
class Map {
  constructor(options) {
    this.map = L.map(options.container).setView(options.center, options.zoom);
    L.tileLayer(options.tileLayer, options.tileLayerOptions).addTo(this.map);
  }

  setView(center, zoom) {
    this.map.setView(center, zoom);
  }

  addCurrentLocation(center, zoom) {
    this.map.setView(center, zoom);
    L.marker(center, { alt: "location" })
      .addTo(this.map)
      .bindPopup("Current location");
  }

  clearMarkers() {
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
  }

  addEventMarker(event) {
    const icon = iconMappings[event.category] || iconMappings.default;
    if (event.latitude && event.longitude) {
      L.marker([event.latitude, event.longitude], { icon })
        .bindPopup(
          `<b>${event.name}</b><br>${event.description}<br>${event.address}<br>${event.date} ${event.time}`
        )
        .addTo(this.map);
    }
  }
}

export default Map;
