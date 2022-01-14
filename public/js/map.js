class DrailMap {
    /**
     * 
     * @param {string} contract_name Nom de la ville
     * @param {array} coordinateCity Coordonnées GPS, latitude et longitude
     */

    constructor(contract_name, coordinateCity) {
        this.contract_name = contract_name;
        this.coordinateCity = coordinateCity;
        this.infoStation = {
            "stationName" : "",
            "stationAddress" : "",
            "stationCapacity" : 0,
            "bikeAvailable" : 0,
            "stationStatus" : ""
        };
        this.urlApi = "https://api.jcdecaux.com/vls/v1/stations?contract=" + contract_name + "&apiKey=b50ed66177fcd40de5851b8bc3cd7a92082060c8";
        this.mymap = L.map('mapid').setView(this.coordinateCity, 14);
        console.log(this.urlApi);
        // icones
        this.dispoIco = L.icon({
            iconUrl: 'public/images/marker-dispo.png',
            shadowUrl: 'public/images/marker-shadow.png',
            iconSize:     [25, 41],
            shadowSize:   [27, 41],
            iconAnchor:   [12, 40], // point d'ancrage à la localisation
            shadowAnchor: [4, 40],
            popupAnchor:  [0, -40] // popup relative au point d'ancrage
        });
        this.warningIco = L.icon({
            iconUrl: 'public/images/marker-warning.png',
            shadowUrl: 'public/images/marker-shadow.png',
            iconSize:     [25, 41],
            shadowSize:   [27, 41],
            iconAnchor:   [12, 40],
            shadowAnchor: [4, 40],
            popupAnchor:  [0, -40]
        });
        this.closedIco = L.icon({
            iconUrl: 'public/images/marker-closed.png',
            shadowUrl: 'public/images/marker-shadow.png',
            iconSize:     [25, 41],
            shadowSize:   [27, 41],
            iconAnchor:   [12, 40],
            shadowAnchor: [4, 40],
            popupAnchor:  [0, -40]
        });

        this.getData();
        this.displayMap(contract_name);
    }
    
    getData() {
        fetch(this.urlApi)
            .then(response => response.json())
            .then(data => {
                for (this.station of data) {
                    // console.log(this.station.name);
                    let coordinateStation = this.station.position;
                    this.infoStation["stationName"] = this.station.name;
                    this.infoStation["stationAddress"] = this.station.address;
                    this.infoStation["stationCapacity"] = this.station.bike_stands;
                    this.infoStation["bikeAvailable"] = this.station.available_bikes;
                    this.infoStation["stationStatus"] = this.station.status;
                    this.displayIcon(coordinateStation, this.infoStation);
                }
            })
            .catch((err) => console.log("Erreur : " + err));
    }

    displayMap(contract_name) {
        // afficher le titre de la carte
        let titleMap = $("#titleMap");
        // mettre une majuscule à la première lettre de la ville
        let cityToUpcase = contract_name[0].toUpperCase() + contract_name.slice(1);
        titleMap.text("Trouvez un vélo à " + cityToUpcase);
        // affiche la tuile Mapbox
        let mapBoxUrl = 'https://api.mapbox.com/styles/v1/sebviaformation/ckrlodff2afsk17nyv458ibjw/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}';
        let mapBoxToken = 'pk.eyJ1Ijoic2VidmlhZm9ybWF0aW9uIiwiYSI6ImNrcjZjcTA3bjNlaXgycG82aG0ycHU1ajIifQ.lnnCAbBQCSKIIGaaEi1GwA';
        let mapBoxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

        let tileMap = L.tileLayer(mapBoxUrl, {
            attribution: mapBoxAttribution,
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken:  mapBoxToken
        });

        tileMap.addTo(this.mymap);
    }

    displayIcon(coordinateStation, infoStation) {
        // marqueur vert : vélos disponible
        // marqueur jaune : attention, il reste 3 vélo ou moins
        // marqueur rouge : pas de vélo dispo
        let iconStatus = this.dispoIco;
        let bikeAvailable = this.infoStation["bikeAvailable"];
        let nameStation = this.infoStation["stationName"];
        let addressStation = this.infoStation["stationAddress"];
        let capacityStation = this.infoStation["stationCapacity"];
        let stationStatus = this.infoStation["stationStatus"];

        if (stationStatus == "OPEN") {
            stationStatus = '<span class="badge bg-primary">Station ouverte</span>';
        } else {
            stationStatus = '<span class="badge bg-danger">Station fermée</span>';
        }

        if (bikeAvailable <= 0) {
            iconStatus = this.closedIco;
        } else if (bikeAvailable < 4) {
            iconStatus = this.warningIco;
        } else {
            iconStatus = this.dispoIco;
        }
        let markerPosition = L.marker(coordinateStation, {icon: iconStatus}).addTo(this.mymap).bindPopup(nameStation + "<br>" + stationStatus);
        markerPosition.on("click", (e) => {
            const reservation = new Reservation(nameStation, addressStation, capacityStation, bikeAvailable, stationStatus);
        });
    }
}