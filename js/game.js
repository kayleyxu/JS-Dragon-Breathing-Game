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

        // create fire object, let fire know about dragon
        this.fire = new Fire(this.dragon);

        // array of bats, flying ones
        this.flyingBats = new Array();

        // array of bats, burning ones after collide with dragon fire
        this.burningBats = new Array();

        // timer for creating new bats, reduce this timer as game speeds up
        this.batSpawnTimeout = 5000;
    }

    // start the game
    start() {
        console.log("Game: start")

        // start breath detection
        //Create audioContext
        window.AudioContext = window.AudioContext ||
            window.webkitAudioContext ||
            window.mozAudioContext ||
            window.oAudioContext ||
            window.msAudioContext;

        audioContext = new AudioContext();
        audioContext.resume();
        breathingAlgorithm.run({ 'runjQuery': true });

        // change button to indicate game is running
        this.button.value = "Having fun!"

        // request animation
    }


    // stop the game
    stop() {
        console.log("Game: stop")
        // change button to indicate game is stopped

        // stop animation
    }


    animate() {
        console.log("Game: animate")
        // update dragon state, breathing in, breathing out
        // update fire size
        //      if breathing out, increase firesize
        //      if breath in, change firezie to 0
        // update flying bats position
        // if any bats collide with fire, move it to burning bats list


        // update burning bats size, shrink them
        // if bats is shrinked to size 0, remove it from the burning bats list

        // create new bats if time passed specified interval
        // add new bats to flying bats list

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
    console.log("clicked, start game")

    // start the game
    currentGame.start()
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
