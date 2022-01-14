class Reservation {
    /**
     * 
     * @param {string} nameStation Nom de la station
     * @param {string} addressStation Adresse de la station
     * @param {number} capacityStation Capacité de parking de vélo
     * @param {number} bikeAvailable Vélos disponible
     */
    constructor(nameStation, addressStation, capacityStation, bikeAvailable, stationStatus) {
        this.nameStation = nameStation;
        this.addressStation = addressStation;
        this.capacityStation = capacityStation;
        this.bikeAvailable = bikeAvailable;
        this.stationStatus = stationStatus;
        this.infostation = $("#infostation");
        this.displayInfosStation();
        this.validateForm();
        this.validateSignature();
    }

    displayAlert() {
        // Activation du formulaire
        let formDisabled = $("#formDisabled");
        formDisabled.removeAttr("disabled");
        this.infostation.hide();
        // Affichage Alert
        let alertDispo = $("#alertDispo");
        alertDispo.hide();
        if (this.bikeAvailable < 1) {
            alertDispo.removeClass("alert-primary");
            alertDispo.addClass("alert-danger");
            alertDispo.text("Aucun vélo n'est disponible, veuillez choisir une autre station.");
            alertDispo.show();
            formDisabled.prop("disabled", true);
        }
    }

    displayInfosStation() {
        this.displayAlert();
        // Affichage des informations
        let displayName = $("#displayName");
        displayName.text("Station " + this.nameStation);
        let displayAddress = $("#displayAddress");
        displayAddress.text("Adresse de la station : " + this.addressStation);
        let displayCapacity = $("#displayCapacity");
        displayCapacity.text("Capacité de la station :  " + this.capacityStation + " vélos");
        let displayAvailability = $("#displayAvailability");
        // Affichage du singulier ou pluriel
        if (this.bikeAvailable <= 1) {
            displayAvailability.text(this.bikeAvailable + " vélo disponible");
        } else {
            displayAvailability.text(this.bikeAvailable + " vélos disponibles");
        }
        this.infostation.show(250);
    }

    validateForm() {
        let firstName = $("#firstname");
        let lastName = $("#lastname");
        // on affiche les données utilisateur si il est déjà venu sur le site
        let storageFirstName = localStorage.getItem("Prénom");
        let storageLastName = localStorage.getItem("Nom");
        firstName.val(storageFirstName);
        lastName.val(storageLastName);
        // Validation du formulaire
        // Stockage du nom et prénom
        let form = $("form");
        form.submit(function (e) { 
            e.preventDefault();
            // affichage du canvas
            let displaySignature = $("#signature");
            displaySignature.removeClass("d-none");
            displaySignature.addClass("d-block");
            // stockage des données
            localStorage.setItem("Prénom", firstName.val());
            localStorage.setItem("Nom", lastName.val());
        });
    }

    validateSignature() {
        const canvas = new Signature("canvas");
        let reserver = $("#reserver");
        reserver.on("click", (e) => {
            //e.preventDefault();
            let signAlert = $("#alertSignature");
            // si il y a une signature alors on réserve
            if (canvas.signatureOk) {
                // on retire la signature
                canvas.effacer();
                $("#signature").removeClass("d-block");
                $("#signature").addClass("d-none");
                // timer
                this.displayCountDown(20);
                this.displaySuccess();
                // suppression de l'alerte s'il y en a une
                if (signAlert.hasClass("d-block")) {
                    signAlert.removeClass("d-block");
                    signAlert.addClass("d-none");
                }
            } else {
                // sinon on affiche une alerte
                signAlert.removeClass("d-none");
                signAlert.addClass("d-block");
            }
        });
    }

    displayCountDown(nbMinutes) {
        let countdown = nbMinutes * 60 * 1000;
        let timer = setInterval(function(){
            countdown -= 1000;
            let min = Math.floor(countdown / (60 * 1000));
            let sec = Math.floor((countdown - (min * 60 * 1000)) / 1000);

            if (countdown <= 0) {
                clearInterval(timer);
                sessionStorage.clear();
            } else {
                $("#countDown").text(min + "min " + sec + " s");
            }
        }, 1000); //1000ms. = 1sec.
    }

    displaySuccess() {
        let reservationSuccess = $("#reservationSuccess");
        reservationSuccess.removeClass("d-none");
        reservationSuccess.addClass("d-block");
        sessionStorage.setItem("station", this.nameStation);
        let recapReservation = $("#recapReservation");
        recapReservation.text("Votre vélo est réservé à la station " + this.nameStation + " au nom de " + localStorage.getItem("Prénom") + " " + localStorage.getItem("Nom"));
    }
}