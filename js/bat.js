class Bat {
    static BatCounter = 0;      // how many bats have been created
    constructor() {
        this.imageElement = document.createElement('img'); //reminder to change this
        this.imageElement.src = 'images/bat.png'; // Replace with the correct path to your bat image
        this.imageElement.classList.add('bat');
        this.imageElement.id = Bat.BatCounter;
        this.id = Bat.BatCounter;
        Bat.BatCounter += 1;

        document.body.appendChild(this.imageElement);
        this.initPosition();
    }

    initPosition() {
        this.imageElement.style.position = 'absolute';
        this.imageElement.style.left = '1400px'; // Start from the right side of the screen
        this.imageElement.style.top = `${Math.random() * 800}px`;
        this.imageElement.style.height = '100px';
        this.imageElement.style.width = '100px';
        this.imageElement.style.display = 'block';
    }

    // move the bat at the current speed
    // remove 
    move() {
        const baseSpeed = 1; // Initial base speed
        const speedIncrement = 0.1; // Speed increment
        const minSpawnRate = 5000; // Minimum spawn rate in milliseconds
        const spawnRateIncrement = 1000; // Spawn rate increment

        let currentSpeed = baseSpeed;
        let batLeft = parseInt(this.imageElement.style.left) || window.innerWidth;

        batLeft -= currentSpeed 
        this.imageElement.style.left = `${batLeft}px`;

        if (batLeft <= 0) { //when it goes off the screen
            // bat is invisible now
            // console.log("bat invisible now", this.id);
            return false;
        }

        return true;
    }
}