class Dragon {
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
        this.imageElement.style.width = "357px";
    }

    exhaleReset(){
        this.imageElement.src = "images/dragonExhale.png";
        this.imageElement.style.left = "50px";
        this.imageElement.style.height = "400px";
        this.imageElement.style.top = "360px";
        this.imageElement.style.width = "399px";
    }

    moveUp() {
        this.imageElement.style.top = parseInt(this.imageElement.style.top) - 10 + 'px'; 
    }

    moveDown() {
        //console.log(currentDragon);
        this.imageElement.style.top = parseInt(this.imageElement.style.top) + 10 + 'px'; 
    }
}

    