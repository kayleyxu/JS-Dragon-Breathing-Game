class Bat {
    static BatCounter = 0;      // how many bats have been created
    static BASE_SPEED = 1;
    static SPEED_INCREMENT = 1;
    static MAX_SPEED = 10;

    constructor() {
        this.imageElement = document.createElement('img'); //reminder to change this
        this.imageElement.src = 'images/bat.png'; // Replace with the correct path to your bat image
        this.imageElement.classList.add('bat');
        this.imageElement.id = Bat.BatCounter;
        this.id = Bat.BatCounter;
        Bat.BatCounter += 1;

        this.speed = Bat.BASE_SPEED;

        document.body.appendChild(this.imageElement);
        this.initPosition();
    }

    initPosition() {
        this.imageElement.style.position = 'absolute';
        this.imageElement.style.left = '1400px'; // Start from the right side of the screen
        this.imageElement.style.top = `${Math.random() * 800 + 100}px`;
        this.imageElement.style.height = '100px';
        this.imageElement.style.width = '100px';
        this.imageElement.style.display = 'block';
    }

    speedup() {
        this.speed += Bat.SPEED_INCREMENT;
        if (this.speed >= Bat.MAX_SPEED) {
            this.speed = Bat.MAX_SPEED;
        }
    }

    // move the bat at the current speed
    // remove 
    move() {
        let batLeft = parseInt(this.imageElement.style.left) || window.innerWidth;

        batLeft -= this.speed 
        this.imageElement.style.left = `${batLeft}px`;

        if (batLeft <= 0) { //when it goes off the screen
            // bat is invisible now
            // console.log("bat invisible now", this.id);
            return false;
        }

        return true;
    }
}