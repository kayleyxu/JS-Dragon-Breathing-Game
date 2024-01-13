class Bat {
    static BatCounter = 0;      // how many bats have been created
    constructor() {
        this.element = document.createElement('img'); //reminder to change this
        this.element.src = 'images/bat.png'; // Replace with the correct path to your bat image
        this.element.classList.add('bat');
        this.element.id = Bat.BatCounter;
        Bat.BatCounter += 1;

        document.body.appendChild(this.element);
        this.initPosition();
    }

    initPosition() {
        this.element.style.position = 'absolute';
        this.element.style.left = '1400px'; // Start from the right side of the screen
        this.element.style.top = `${Math.random() * 800}px`;
        this.element.style.height = '100px';
        this.element.style.width = '100px';
        this.element.style.display = 'block';
    }

    // move the bat at the current speed
    // remove 
    move() {
        const baseSpeed = 1; // Initial base speed
        const speedIncrement = 0.1; // Speed increment
        const minSpawnRate = 5000; // Minimum spawn rate in milliseconds
        const spawnRateIncrement = 1000; // Spawn rate increment

        let currentSpeed = baseSpeed;
        let batLeft = parseFloat(this.element.style.left) || window.innerWidth;

        batLeft -= currentSpeed 
        this.element.style.left = `${batLeft}px`;

        if (batLeft < - this.element.width) { //when it goes off the screen
            // bat is invisible now
            // remove the image from the document
            this.element.remove()
            return false;
        }

        return true;
    }
/*
    checkForCollision() {
        for (let i = 0; i < bats.length; i++) {
            console.log("which bat", i);
            console.log("Bat Left:", bats[i].bat.style.left);
            console.log("bat top: ", bats[i].bat.style.top);
            console.log("bat width: ", bats[i].bat.style.width);
            console.log("bat height: ", bats[i].bat.style.height);
            console.log("Fire top: ", intervalFire.style.top);
            console.log("Fire width: ", fireWidth);
            console.log("Fire height: ", fireHeight);
            console.log("Fire Left:", intervalFire.style.left); 
            if (
                parseInt(bats[i].bat.style.left) <= parseInt(intervalFire.style.left) + parseInt(fireWidth) &&
                parseInt(bats[i].bat.style.left) + parseInt(bats[i].bat.style.width) >= parseInt(intervalFire.style.left) &&
                parseInt(bats[i].bat.style.top) <= parseInt(intervalFire.style.top) + parseInt(fireHeight) &&
                parseInt(bats[i].bat.style.top) + parseInt(bats[i].bat.style.height) >= parseInt(intervalFire.style.top)
            ){
                console.log("bat dead, style.display: ", bats[i].bat.style.display);
                bats[i].bat.style.display = "none";
                console.log("bat dead, style.display: ", bats[i].bat.style.display);
                
            }
        }
    }
    */
}