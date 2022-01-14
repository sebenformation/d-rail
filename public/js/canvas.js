class Signature {
    /**
     * 
     * @param {string} canvas Selector du canvas
     */
    constructor(canvas) {
        this.jeSigne = false;
        this.signatureOk = false;
        this.canvas = $(canvas);
        this.ctx = this.canvas[0].getContext("2d");
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        this.effacer();

        // -- Signature à la souris --
        this.canvas.on("mousedown", (e) => { 
            // Je signe quand le bouton de la souris est enfoncé
            this.jeSigne = true;
            this.startX = e.clientX - this.canvas[0].getBoundingClientRect().left;
            this.startY = e.clientY - this.canvas[0].getBoundingClientRect().top;
        });

        this.canvas.on("mousemove", (e) => {
            // Si je signe
            if (this.jeSigne) {
                let drawX = e.clientX - this.canvas[0].getBoundingClientRect().left;
                let drawY = e.clientY - this.canvas[0].getBoundingClientRect().top;
                this.draw(this.startX, this.startY, drawX, drawY);
                this.startX = drawX;
                this.startY = drawY;
            }
        });

        this.canvas.on("mouseup", () => {
            // bouton relaché, je ne signe plus
            this.jeSigne = false;
        });  

        this.canvas.on("mouseout", () => {
            // si je sors du canvas, je ne signe plus
            this.jeSigne = false;
        });

        // -- Signature sur écran tactile --
        this.canvas.on("touchstart", (e) => { 
            // Je signe quand je touche l'écran
            this.jeSigne = true;
            this.startX = e.touches[0].clientX - this.canvas[0].getBoundingClientRect().left;
            this.startY = e.touches[0].clientY - this.canvas[0].getBoundingClientRect().top;
        });

        this.canvas.on("touchmove", (e) => {
            // Si je signe
            if (this.jeSigne) {
                let drawX = e.touches[0].clientX - this.canvas[0].getBoundingClientRect().left;
                let drawY = e.touches[0].clientY - this.canvas[0].getBoundingClientRect().top;
                this.draw(this.startX, this.startY, drawX, drawY);
                this.startX = drawX;
                this.startY = drawY;
                // console.log(e.clientX);
            }
        });

        this.canvas.on("touchend", () => {
            // si j'enlève le doigt, je ne signe plus
            this.jeSigne = false;
        }); 

        this.canvas.on("touchleave", () => {
                // si je sors du canvas, je ne signe plus
                this.jeSigne = false;
        });

    }

    draw(depX, depY, destX, destY) {
        this.ctx.beginPath();
        this.ctx.moveTo(depX, depY);
        this.ctx.lineTo(destX, destY);
        this.ctx.closePath();
        this.ctx.stroke();
        this.signatureOk = true;
    }

    effacer() {
        let effacer = $("#effacer");
        effacer.on("click", (e) => {
            e.preventDefault();
            this.signatureOk = false;
            this.ctx.clearRect(0, 0, this.canvas.width(), this.canvas.height());
        });
        if (this.signatureOk) {
            this.signatureOk = false;
            this.ctx.clearRect(0, 0, this.canvas.width(), this.canvas.height());
        }
    }

}