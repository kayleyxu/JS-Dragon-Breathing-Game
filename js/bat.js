let bats = [];

class Bat {
    static BatCounter = 0;
    constructor() {
        this.bat = document.createElement('img'); //reminder to change this
        this.bat.src = 'images/bat.png'; // Replace with the correct path to your bat image
        this.bat.classList.add('bat');

        this.bat.id = Bat.BatCounter;
        Bat.BatCounter += 1;
        document.body.appendChild(this.bat);
        bats.push(this);
        this.initPosition();
        this.moveBat(0); // Start bat movement with count 0
        this.checkForCollision();
    }

    initPosition() {
        this.bat.style.position = 'absolute';
        this.bat.style.left = '1400px'; // Start from the right side of the screen
        this.bat.style.top = `${Math.random() * 800}px`;
        this.bat.style.height = '100px';
        this.bat.style.width = '100px';
        this.bat.style.display = 'block';
    }

    moveBat(batCount) {
        const baseSpeed = 1; // Initial base speed
        const speedIncrement = 0.1; // Speed increment
        const minSpawnRate = 5000; // Minimum spawn rate in milliseconds
        const spawnRateIncrement = 1000; // Spawn rate increment

        let currentSpeed = baseSpeed;
        let currentSpawnRate = minSpawnRate;

        function animate(bat) {
            let batLeft = parseFloat(bat.style.left) || window.innerWidth;

            bat.style.left = `${batLeft - currentSpeed}px`;

            if (batLeft < -bat.width) { //when it goes off the screen
                bat.remove();
                batCount++;

                if (batCount % 10 === 0) {
                    currentSpeed += speedIncrement; // increase speed for every 10 bats
                }
            } else {
                requestAnimationFrame(() => animate(bat));
            }
        }

        animate(this.bat);

        setTimeout(() => {
            currentSpawnRate -= spawnRateIncrement; // Decrease spawn rate
            currentSpawnRate = Math.max(currentSpawnRate, minSpawnRate); // Cap spawn rate

            if (document.contains(this.bat)) {
                new Bat(); // Spawn the next bat
            }
        }, currentSpawnRate); // Adjust spawn rate after each bat
    }

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

}

// Start generating bats
new Bat();
