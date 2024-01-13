class Game {
    static BatCounter = 0;
    constructor() {
        console.log("Game: constructor")
        this.batCounter = 0;
        Bat.BatCounter += 1;

        // starting the game button 
        this.button = document.getElementById("buttonId");
        console.log("Game: constructor", this.button)

        // create dragon object
        this.dragon = new Dragon(0, 0, 0, "currentDragon");

        // get the buckt image
        this.bucketImageElement = document.getElementById("bucket");

        // create fire object, let fire know about dragon
        this.fire = new Fire(this.dragon);

        // array of bats, flying ones
        this.flyingBats = new Array();

        // array of bats, burning ones after collide with dragon fire
        this.burningBats = new Array();

        // indicate if audio context has been enabled
        this.audioStarted = false;

        // timer for creating new bats, reduce this timer as game speeds up
        this.batSpawnTimeoutSpeedUp = 1000;
        this.batSpawnTimeoutMin = 1000;

        // save the requested animation ID so we can cancel it to stop the game
        this.animationId = 0;

        // use this variable to stop the animation
        this.gameRunning = false;

        // timeout ID for creating bats
        this.timeoutId = 0;
    }

    initGame() {
        // timer for creating new bats, reduce this timer as game speeds up
        this.batSpawnTimeout = 5000;

        if (!this.audioStarted) {
            // start breath detection
            // Create audioContext
            window.AudioContext = window.AudioContext ||
                window.webkitAudioContext ||
                window.mozAudioContext ||
                window.oAudioContext ||
                window.msAudioContext;

            audioContext = new AudioContext();
            audioContext.resume();
            breathingAlgorithm.run({ 'runjQuery': true });

            this.audioStarted = true;
        }
    }

    // start the game
    start() {
        console.log("Game: start")
        this.initGame()

        this.gameRunning = true;
        // change button to indicate game is running
        this.button.value = "Stop breathing game";

        // start creating bats
        this.createBat()

        // request animation
        this.animate();
    }

    createBat() {
        let bat = new Bat();
        this.flyingBats.push(bat)
        console.log("Game: createBat", bat.imageElement.id, Bat.BatCounter);

        if (Bat.BatCounter % 10 == 0) {
            // reduce bat spawn timeout to make it faster after spawning every 10 bats
            this.batSpawnTimeout -= this.batSpawnTimeoutSpeedUp;
            console.log("reduce bat creation timeout to", this.batSpawnTimeout);
            if (this.batSpawnTimeout < this.batSpawnTimeoutMin) {
                // console.log("Fix bat creation timeout to", self.batSpawnTimeout);
                // use a minimum Timeout
                this.batSpawnTimeout = this.batSpawnTimeoutMin;
            }
        }
        // start a new timout to create next bat
        this.timeoutId = setTimeout(this.createBat.bind(this), this.batSpawnTimeout);
    }

    // stop the game
    stop() {
        console.log("Game: stop")
        this.gameRunning = false;

        // cancel animation
        cancelAnimationFrame(this.animationId);
        this.animationId = 0;

        // stop bat spawn timer
        clearTimeout(this.timeoutId);

        // remove all bats
        for (let i=this.flyingBats.length - 1; i >= 0; i--) {
            let bat = this.flyingBats[i];
            bat.imageElement.remove();
            this.flyingBats.splice(i, 1);
        }

        // change button to indicate game is stopped
        this.button.value = "Start breathing game";
    }


    animate() {
        // console.log("Game: animate")
        // update dragon state, breathing in, breathing out
        // update fire size
        //      if breathing out, increase firesize
        //      if breath in, change firezie to 0

        // update flying bats position
        // if any bats collide with fire, move it to burning bats list
        for (let i=this.flyingBats.length - 1; i >= 0; i--) {
            // move each bat
            let bat = this.flyingBats[i];

            let batVisible = bat.move();
            if (!batVisible) {
                console.log("bat not visible ", bat.id, bat.imageElement)
                // remove this bat from the flying ones
                this.flyingBats.splice(i, 1);

                // remove image from document
                bat.imageElement.remove()
            }
        }

        // check for bat collision
        this.checkForCollision();

        // update burning bats size, shrink them
        // if bats is shrinked to size 0, remove it from the burning bats list

        // request a new animation
        if (this.gameRunning) {
            // game not stopped, keep animating
            this.animationId = requestAnimationFrame(this.animate.bind(this));
        }
    }

    checkImageOverlap(imageElement1, imageElement2) {
        if (
            parseInt(imageElement1.style.left) <= parseInt(imageElement2.style.left) + parseInt(imageElement2.style.width) &&
            parseInt(imageElement1.style.left) + parseInt(imageElement1.style.width) >= parseInt(imageElement2.style.left) &&
            parseInt(imageElement1.style.top) <= parseInt(imageElement2.style.top) + parseInt(imageElement2.style.height) &&
            parseInt(imageElement1.style.top) + parseInt(imageElement1.style.height) >= parseInt(imageElement2.style.top)
        ) {
            // console.log("image overlap");
            return true;
        }
        else {
            // console.log("bat NOT collide with fire");
            return false;
        }
    }


    // return true if bat collides with fire
    checkFireAndBatCollision(fire, bat) {
        return this.checkImageOverlap(bat.imageElement, fire.imageElement);
    }

    checkForCollision() {
        for (let i = this.flyingBats.length - 1; i >= 0; i--) {
            let bat = this.flyingBats[i];

            if (this.fire.isVisible() && this.checkFireAndBatCollision(this.fire, bat)) {
                bat.imageElement.style.display = "none";
                console.log("bat burnt by fire!!!", bat.id);

                // remove this bat from the flying ones
                this.flyingBats.splice(i, 1);
                // add this bat to the burning ones
                this.burningBats.push(bat);

                // remove image from document
                bat.imageElement.remove()
            }
        }

        // check collision with dragaon
        for (let i = this.flyingBats.length - 1; i >= 0; i--) {
            let bat = this.flyingBats[i];

            if (this.checkImageOverlap(bat.imageElement, this.dragon.imageElement)) {
                bat.imageElement.style.display = "none";
                console.log("bat collide with dragon!!!!!!!", bat.id);

                // remove this bat from the flying ones
                this.flyingBats.splice(i, 1);
                // add this bat to the burning ones
                this.burningBats.push(bat);

                // remove image from document
                bat.imageElement.remove()
            }
        }

        // check collision with bucket
        for (let i = this.flyingBats.length - 1; i >= 0; i--) {
            let bat = this.flyingBats[i];

            if (this.checkImageOverlap(bat.imageElement, this.bucketImageElement)) {
                bat.imageElement.style.display = "none";
                console.log("bat collide with bucket !!!!!!!", bat.id)

                // remove this bat from the flying ones
                this.flyingBats.splice(i, 1);
                // add this bat to the burning ones
                this.burningBats.push(bat);

                // remove image from document
                bat.imageElement.remove()
            }
        }
    }

    inhaleReset() {
        console.log("Game inhale reset");
        this.dragon.inhaleReset();
    }

    exhaleReset(inhaleTime) {
        console.log("Game exhale reset");
        this.dragon.exhaleReset();
        this.fire.show(inhaleTime);
    }

    upKeyPressed() {
        this.dragon.moveUp();
        this.fire.moveUp(this.dragon);
    }

    downKeyPressed() {
        this.dragon.moveDown();
        this.fire.moveDown(this.dragon);
    }
}

function startGame() {
    if (currentGame.gameRunning) {
        // stop the game
        currentGame.stop();
    }
    else {
        // start the game
        currentGame.start();
    }
}

function getWhichKeyPressed() {
    //alert('event type' + event.type);
    var aKeyPressed = event.which || event.keyCode
    //alert(aKeyPressed); //w = 119, a = 97, s = 115, d = 100, q = 113, e = 101, z = 122, c = 99, - = 45, + = 61, < = 44, > = 46, [ = 91, ] = 93

    //imgTopValue.value = flyingSaucer.style.top; 
    //imgLeftValue.value = flyingSaucer.style.left; 
    console.log("key pressed", aKeyPressed)
    if (aKeyPressed == 119) {
        currentGame.upKeyPressed();
    }

    if (aKeyPressed == 115) {
        currentGame.downKeyPressed();
    }
}


// create the global game object
var currentGame = new Game();
