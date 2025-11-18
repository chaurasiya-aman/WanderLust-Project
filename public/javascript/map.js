let map = L.map("map").setView([coordinates[1], coordinates[0]], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

console.log(coordinates); // [lon, lat]

L.marker([coordinates[1], coordinates[0]])
  .addTo(map)
  .bindPopup(`${loc[0]}, ${loc[1]}`)
  .openPopup();
