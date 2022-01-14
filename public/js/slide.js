// https://keycode.info/

class Slider {
    constructor(auto) {
        this.auto = auto;
        this.time = null;
        this.selectedIndex = 0;
        this.slides = $('.item');
        this.total = this.slides.length;
        this.prevButton = $('.prev');
        this.nextButton = $('.next');
        this.playButton = $(".play");
        this.pauseButton = $('.pause');
        this.initController();
        if(this.auto) {
            this.playAuto();     
        }
    }

    initController() {
        this.prevButton.on("click", function() {
            slider.prev();
        });
        $("body").on("keydown", function(e) {
            if (e.key == "ArrowLeft") {
                slider.prev();
            }
        });  
        $(".slider").on("mouseover", function() {
            slider.pause();
        });
        $(".slider").on("mouseout", function() {
            slider.playAuto();
        });
        this.nextButton.on("click", function() {
            slider.next();
        });
        $("body").on("keydown", function(e) {
            if (e.key == "ArrowRight") {
                slider.next();
            }
        }); 
    }

    playAuto() {
        this.time = setInterval(function(){
            slider.slideTheImage();
        },5000);
    }

    toggleActive() {
        for (let i = 0; i < this.slides.length; i++) {
            $(this.slides[i]).removeClass("active");
        }
        $(this.slides[this.selectedIndex]).addClass("active");
    }

    slideTheImage() {
        this.selectedIndex++;
        if(this.selectedIndex >= this.total) {
            this.selectedIndex = 0;
        }
        this.toggleActive();
    }

    pause() {
        clearInterval(this.time);
    }

    prev() {
        clearInterval(this.time);
        this.selectedIndex--;
        if (this.selectedIndex < 0) {
            this.selectedIndex = this.total -1;
        }
        this.toggleActive();
    }

    next() {
        clearInterval(this.time);
        this.selectedIndex++;
        if (this.selectedIndex >= this.total) {
            this.selectedIndex = 0;
        }
        this.toggleActive();
    }
}