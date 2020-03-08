import {addMarker} from "./map.js";
import {clearMarkers} from "./map.js";

let filter = "";

export function select(sel) {
    switch (sel) {
        case 1:
            display('http://api.openeventdatabase.org/event/?what=health.blood.collect&when=today&limit=1000');
            break;
        case 2:
            display('http://api.openeventdatabase.org/event/?what=health.blood.collect&when=nextweek&limit=1000');
            break;
    }
}

export function clear() {
    filter = "";
    $('#liste').empty();
    clearMarkers()
}


export function display(url) {
    axios.get(url)
        .then((data) => {
            data.data.features.forEach(infos => {createCard(infos);});
        })
        .catch(() => {
            console.log("Erreur");
        });
}

export function search(city) {
    clear();
    filter = city;
    select(2);
}

function createCard(infos) {
    if (infos.properties['where:name'].includes(filter.toUpperCase())
        || infos.properties['where:name'].includes(filter.toLowerCase())) {

        let liste = $('#liste');
        let card = $('<div class="card ml-2 mr-2 mb-2">');
        let card_body = $('<div class="card-body">');
        let div_title = $('<div class="d-flex justify-content-between">');
        let title = $('<h5 class="card-title">' + infos.properties['where:name'] + '</h5>');
        let don = $('<button type="button" class="badge-danger btn btn-secondary">Voir sur la carte</button>');
        don.ready(
            don.click(() => {
                clearMarkers();
                addMarker(infos);
            }));
        div_title.append(title);
        div_title.append(don);
        card_body.append(div_title);

        let lieu = $('<h6 class="card-subtitle mb-2 text-muted">' + infos.properties.name + '</h6>');
        card_body.append(lieu);
        let date_date = new Date(infos.properties.start.split('CET')[0]);
        console.log(date_date.getDate())
        let jour = date_date.getDate() + "";
        if (jour.length == 1) jour = "0" + jour;

        let mois = (date_date.getMonth() + 1) + "";
        if (mois.length == 1) mois = "0" + mois;

        let date = jour + '/' + mois + "/" + date_date.getFullYear();

        let heure = date_date.getHours() + "";
        if (heure.length == 1) heure = "0" + heure;

        let min = date_date.getMinutes() + "";
        if (min == null || min.length == 1) min = "0" + min;

        let h_deb = heure + ":" + min;

        date_date = new Date(infos.properties.stop.split('CET')[0]);
        heure = date_date.getHours() + "";
        if (heure.length == 1) heure = "0" + heure;

        min = date_date.getMinutes() + "";
        if (min == null || min.length == 1) min = "0" + min;

        let h_fin = heure + ":" + min;

        card_body.append($("<p class=\"card-text\">Le " + date + " de " + h_deb + " à " + h_fin + "</p>"));
        card.append(card_body);
        liste.append(card);
        addMarker(infos)
    }
}