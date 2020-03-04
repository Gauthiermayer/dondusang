var lat = 46.768346;
var lon = 2.433274;
var carte = null;


let markers = [];

export function initMap() {

    carte = L.map('map').setView([lat, lon], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 5,
        maxZoom: 20
    }).addTo(carte);
}

export function addMarker(data) {
    var marker = L.marker([data.geometry.coordinates[1],data.geometry.coordinates[0]]).addTo(carte);
    marker.bindPopup(data.properties['where:name'] + " - " + data.properties.name);
    markers.push(marker);
}

export function clearMarkers() {
    markers.forEach(marker => marker.remove());
}
