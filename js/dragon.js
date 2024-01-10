class dragon {
    constructor(xPos, yPos, imgHeight, imageID) {
        this.x = xPos;
        this.y = yPos;
        this.height = imgHeight;
        this.imageID = imageID;
        this.imageElement = document.getElementById(imageID);
        //x, y, height, width, image: properties/attributes
        //parameters are part of definition, arguments are the actual value
    }

    inhaleReset(){
        this.imageElement.src = "images/dragonInhale.png";
        this.imageElement.style.left = "50px";
        this.imageElement.style.height = "400px";
        this.imageElement.style.top = "360px";
    }

    exhaleReset(){
        this.imageElement.src = "images/dragonExhale.png";
        this.imageElement.style.left = "50px";
        this.imageElement.style.height = "400px";
        this.imageElement.style.top = "360px";
    }
}

    
function moveDragonUp()
    {
        currentDragon.imageElement.style.top = parseInt(currentDragon.imageElement.style.top) - 10 + 'px'; 
        intervalFire.style.top = currentDragon.imageElement.style.top; 
    }

function moveDragonDown()
    {
        //console.log(currentDragon);
        currentDragon.imageElement.style.top = parseInt(currentDragon.imageElement.style.top) + 10 + 'px'; 
        intervalFire.style.top = currentDragon.imageElement.style.top; 
    }


function getWhichKeyPressed()
    {
        //alert('event type' + event.type);
        var aKeyPressed = event.which || event.keyCode
        //alert(aKeyPressed); //w = 119, a = 97, s = 115, d = 100, q = 113, e = 101, z = 122, c = 99, - = 45, + = 61, < = 44, > = 46, [ = 91, ] = 93

        //imgTopValue.value = flyingSaucer.style.top; 
        //imgLeftValue.value = flyingSaucer.style.left; 
        if (aKeyPressed == 119)
        {
            //move ship up
            moveDragonUp();
        }

        if (aKeyPressed == 115)
        {
            //move ship down
            moveDragonDown();
        }
    }




