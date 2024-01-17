class Game {
    static DRAGON_MAX_LIVES = 10;
    static BAT_SPEED_MAX_LEVEL = 10;

    constructor() {
        console.log("Game: created")
        this.batCounter = 0;
        this.totalBatsKilled = 0;
        this.totalBatsReachedDragon = 0;
        this.goodBreathCount = 0;
        this.score = 0;
        this.totalLivesLeft = Game.DRAGON_MAX_LIVES;
        this.batSpeedLevel = 1;     // base speed

        // starting the game button 
        this.button = document.getElementById("buttonId");

        // stats table
        this.scoreStats = document.getElementById("score");
        this.totalLivesLeftStat = document.getElementById("totalLivesLeft");
        this.lastInhaleTimeStats = document.getElementById("lastInhaleTime");
        this.lastExhaleTimeStats = document.getElementById("lastExhaleTime");
        // this.goodBreathCountStats = document.getElementById("goodBreathCount");
        this.batSpeedLevelStats = document.getElementById("batSpeedLevel");

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

        // save last inhale time
        this.inhaleTime = 0;

        // save last exhale time
        this.exhaleTime = 0;

        // set the dragon to inhale
        this.dragon.inhaleReset();

        // timeout ID for stopping the fire
        this.fireOffTimeoutId = 0;
    }

    updateStats() {
        this.lastInhaleTimeStats.innerHTML = this.inhaleTime.toString();
        this.lastExhaleTimeStats.innerHTML = this.exhaleTime.toString();

        this.score = this.totalBatsKilled * 10;
        this.scoreStats.innerHTML = this.score.toString();
        this.totalLivesLeft = Game.DRAGON_MAX_LIVES - this.totalBatsReachedDragon;
        this.totalLivesLeftStat.innerHTML = this.totalLivesLeft.toString();
        // this.goodBreathCountStats.innerHTML = this.goodBreathCount.toString();
        this.batSpeedLevelStats.innerHTML = this.batSpeedLevel.toString();
    }

    initGame() {
        this.batCounter = 0;
        this.totalBatsKilled = 0;
        this.totalBatsReachedDragon = 0;
        this.goodBreathCount = 0;
        this.score = 0;
        this.totalLivesLeft = Game.DRAGON_MAX_LIVES;
        this.inhaleTime = 0;
        this.exhaleTime = 0;
        this.batSpeedLevel = 1;

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

        this.updateStats();
        // set the dragon to inhale
        this.dragon.inhaleReset();

        // stop fire
        this.stopFire();
    }

    // start the game
    start() {
        console.log("Game: start")
        this.initGame()

        this.gameRunning = true;
        // change button to indicate game is running
        this.button.value = "Stop breathing game";
        this.button.style.backgroundColor = "red";

        // start creating bats
        this.createBat()

        // request animation
        this.animate();
    }

    createBat() {
        let bat = new Bat();
        this.batCounter += 1;

        this.flyingBats.push(bat)
        console.log("Create bat %d", bat.imageElement.id);

        if (this.batCounter % 10 == 0) {
            // reduce bat spawn timeout to make it faster after spawning every 10 bats
            this.batSpawnTimeout -= this.batSpawnTimeoutSpeedUp;
            console.log("Total %d bat created, reduce bat creation timeout to %d", this.batCounter, this.batSpawnTimeout);
            if (this.batSpawnTimeout < this.batSpawnTimeoutMin) {
                // console.log("Fix bat creation timeout to", this.batSpawnTimeout);
                // use a minimum Timeout
                this.batSpawnTimeout = this.batSpawnTimeoutMin;
            }

            if (this.batSpeedLevel < Game.BAT_SPEED_MAX_LEVEL) {
                // bat speed increased one level
                this.batSpeedLevel += 1;
                this.speedUpBats();
            }
        }

        // start a new timout to create next bat
        this.timeoutId = setTimeout(this.createBat.bind(this), this.batSpawnTimeout);
    }

    // stop the game
    stop(message) {
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

        // set the dragon to inhale
        this.dragon.inhaleReset();

        // stop fire
        this.stopFire();

        // change button to indicate game is stopped
        this.button.value = message; // "Start breathing game";
        this.button.style.backgroundColor = "green";
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
                console.log("Bat %d is not visible any more ", bat.id);
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

        // update stats table
        this.updateStats();

        if (this.totalLivesLeft <= 0) {
            // game over
            this.stop("Game over, play again!");
        }

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
                this.totalBatsKilled += 1;
                bat.imageElement.style.display = "none";
                console.log("Bat %d is killed by fire!, total bats killed: %d", bat.id, this.totalBatsKilled);

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
                this.totalBatsReachedDragon += 1;
                bat.imageElement.style.display = "none";
                console.log("Bat %d reached the dragon, total bats reached dragon: %d!", bat.id, this.totalBatsReachedDragon);

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
                console.log("Bat %d collided with bucket!!!", bat.id)

                // remove this bat from the flying ones
                this.flyingBats.splice(i, 1);
                // add this bat to the burning ones
                this.burningBats.push(bat);

                // remove image from document
                bat.imageElement.remove()
            }
        }
    }

    speedUpBats() {
        // check collision with dragaon
        console.log("speed up all bats");
        for (let i = this.flyingBats.length - 1; i >= 0; i--) {
            let bat = this.flyingBats[i];
            bat.speedup();
        }
    }

    inhaleStart() {
        console.log("Breathing inhale started");
        this.dragon.inhaleReset();
    }

    inhaleEnd(inhaleTime) {
        console.log("Breathing inhale ended, inhaleTime: %d ms", inhaleTime);
        // record inhale time, to show
        this.inhaleTime = inhaleTime;
        this.updateStats();
    }

    exhaleStart() {
        console.log("Breathing exhale started");
        this.dragon.exhaleReset();
        this.startFire();
    }

    exhaleEnd(exhaleTime) {
        // record exhale time
        this.exhaleTime = exhaleTime;
        this.updateStats();

        console.log("Breathing exhale ended, exhaleTime: %d ms", exhaleTime);
        if (this.inhaleTime > this.exhaleTime) {
            console.log("Great! Inhale (%dms) longer as exhale (%dms)", this.inhaleTime, this.exhaleTime);
            // give bonus point!
            this.goodBreathCount += 1;
        }

        // dragon goes back to inhale
        this.dragon.inhaleReset();

        // stop fire right away
        this.stopFire();
    }

    startFire() {
        console.log("start fire, will stop it after inhaleTime=%d", this.inhaleTime *2) 
        this.fire.start();

        // stop the fire after inhale time
        this.fireOffTimeoutId = setTimeout(this.stopFireTimeout.bind(this), this.inhaleTime * 2);
    }

    stopFireTimeout()  {
        console.log("timeout after inhale time, stop fire")
        this.fire.stop();
        this.fireOffTimeoutId = 0;  // timeout expired here
    }

    stopFire() {
        if (this.fire.isVisible()) {
            console.log("stop fire at end of exhale")
            this.fire.stop();
        }
        else {
            console.log("fire is already stopped")
        }

        if (this.fireOffTimeoutId != 0) {
            clearTimeout(this.fireOffTimeoutId);
            this.fireOffTimeoutId = 0;
        }
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
        currentGame.stop("Start breathing game");
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
