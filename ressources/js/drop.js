class Drop {
    constructor (context, x, y, size, color){
        this.context = context;
        this.dropReady = false;
        this.dropImage = new Image();
        this.x = x;
        this.y = y;
        this.width;
        this.height;
        this.size = size;
        this.color = color;
        this.speed = this.size * 30 + 60;
        this.interval = 0; 
        this.canPress2Keys = true;
        this.factorWidth = 1;
        this.factorHeight = 1;
        this.isTouched = false;
        this.isColliding = false;

        this.dropImage.addEventListener('load', (event) => {
            if (event.defaultPrevented) {
                return; // Do nothing if event already handled
            }

            this.width = this.dropImage.width;
            this.height = this.dropImage.height;
            this.dropReady = true;

            // Consume the event so it doesn't get handled twice
            event.preventDefault();
        });
    }

    draw(){
        this.dropImage.src = "/ressources/images/game/Drop/DropSize" + this.size + this.color + ".png";

        if(this.dropReady){
            this.context.drawImage(this.dropImage, this.x, this.y, this.width*this.factorWidth, this.height*this.factorHeight);
        }
        
        //Draw life
        this.drawLife();
    }

    update(secondsPassed){
        this.interval += secondsPassed;
        
        //Documentation: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
        if(this.canPress2Keys){
            if (Key.isDown(Key.UP)){
                this.y -= this.speed * secondsPassed;
            }
            if (Key.isDown(Key.LEFT)){
                this.x -= this.speed * secondsPassed;
            }
            if (Key.isDown(Key.DOWN)){
                this.y += this.speed * secondsPassed;
            }
            if (Key.isDown(Key.RIGHT)){
                this.x += this.speed * secondsPassed;
            }
        } else{ //Only one key at the same time
            if (Key.isDown(Key.UP)){
                this.y -= this.speed * secondsPassed;
            }
            else if (Key.isDown(Key.LEFT)){
                this.x -= this.speed * secondsPassed;
            }
            else if (Key.isDown(Key.DOWN)){
                this.y += this.speed * secondsPassed;
            }
            else if (Key.isDown(Key.RIGHT)){
                this.x += this.speed * secondsPassed;
            }
        }
    }

    droppyLosesALife(blinkingSize){
        //Store old size to blink
        let oldSize = this.size;
        this.size = blinkingSize;

        //Waiting 100ms before blinking at oldSize
        setTimeout(()=>{
            this.size = oldSize;
        }, 50);

        setTimeout(()=>{
            this.size = blinkingSize;
        }, 100);

        //Waiting 100ms before blinking at oldSize
        setTimeout(()=>{
            this.size = oldSize;
        }, 150);

        //Waiting 100ms more before disappear
        setTimeout(()=>{
            this.size = blinkingSize;
        }, 200);

        //Waiting 100ms before blinking at oldSize
        setTimeout(()=>{
            this.size = oldSize;
        }, 250);

        //Waiting 100ms more before blinking at new size + reset speed
        setTimeout(()=>{
            this.size = oldSize+1;
            if(!(this.isTouched)) {
                this.speed = this.size * 30 + 60;
            } 
        }, 300);

        //Waiting 1000ms before Droppy can be touched again
        setTimeout(()=>{
            this.isColliding = false;
        }, 1000);
    }

    droppyRetrieveALife(blinkingSize){
        let oldSize = this.size;

        //Waiting 100ms before blinking at oldSize
        setTimeout(()=>{
            this.size = oldSize;
        }, 50);

        setTimeout(()=>{
            this.size = blinkingSize;
        }, 100);

        //Waiting 100ms before blinking at oldSize
        setTimeout(()=>{
            this.size = oldSize;
        }, 150);

        //Waiting 100ms more before disappear
        setTimeout(()=>{
            this.size = blinkingSize;
        }, 200);

        //Waiting 100ms before blinking at oldSize
        setTimeout(()=>{
            this.size = oldSize;
        }, 250);

         //Waiting 100ms more before blinking at new size + reset speed
         setTimeout(()=>{
            this.size = oldSize-1;
            if(!(this.isTouched)) {
                this.speed = this.size * 30 + 60;
            }
        }, 300);

        //Waiting 1000ms before Droppy can be touched again
        setTimeout(()=>{
            this.isColliding = false;
        }, 1000);
    }

    changeColorAndBlink(thisGame) {
        let level = thisGame.level;
        let colorWhenTouched;

        switch (level) {
            case 1:
                colorWhenTouched = "green";
                break;
            case 2:
                colorWhenTouched = "white";
                break;
        }

        let oldSize = this.size;
        
        //Waiting 100ms before blinking at oldSize
         setTimeout(()=>{
            this.color = colorWhenTouched;
            this.size = 0;
        }, 50);

        //Waiting 100ms more before disappear
        setTimeout(()=>{
            this.size = oldSize;
        }, 100);

        //Waiting 100ms more before blinking at oldSize
         setTimeout(()=>{
            this.size = 0;
        }, 150);

        //Waiting 100ms more before disappear
        setTimeout(()=>{
            this.size = oldSize;
        }, 200);

        //Waiting 100ms more before blinking at oldSize
        setTimeout(()=>{
            this.size = 0;
        }, 250);

        //Waiting 100ms more before blinking at oldSize
        setTimeout(()=>{
            this.size = oldSize;
        }, 300);

        //Waiting 1000ms before Droppy can be touched again
        setTimeout(()=>{
            this.isColliding = false;
        }, 1000);

        //Waiting 3000ms before Droppy is blue again
        setTimeout(()=>{
            this.color = "blue";
        }, 5000);
    }

    isUpsideDown() {
        this.upsideDownCommands();

        setTimeout(()=>{
            this.normalCommands();
        },5000);
    }

    upsideDownCommands() {
        Key.DOWN = 38;
        Key.UP = 40;
        Key.LEFT = 39;
        Key.RIGHT = 37;
    }

    normalCommands() {
        Key.LEFT = 37;
        Key.UP = 38;
        Key.RIGHT = 39;
        Key.DOWN = 40;
    }

    slowDownSpeed() {
        this.speed = 60;
        this.isTouched = true; //to prevent loseALife or retrieveALife to change speed
        
        //Droppy's speed is back to normal again even in a new level
        setTimeout(()=>{
            this.isTouched = false;
            this.speed = this.size * 30 + 60;
        },5000);
    }

    drawLife(){
        let lifeImage = new Image();

        lifeImage.src = "/ressources/images/game/LifeSmall.png"; //TODO: renamme image

        let destinationX = 900;
        let destinationY = 10;
        let cuttingX;
        let imageWidth = lifeImage.width;
        let imageHeight = lifeImage.height;
        
        //Depending on the number of lives, the image is crop
        switch (this.size) {
            case 1:
                this.context.drawImage(lifeImage, destinationX, destinationY);
                break;
            case 2:
                cuttingX = 47/2;
                this.context.drawImage(lifeImage, cuttingX, 0, imageWidth, imageHeight, destinationX+cuttingX, destinationY, imageWidth, imageHeight);
                break;
            case 3:
                cuttingX = 88/2;
                this.context.drawImage(lifeImage, cuttingX, 0, imageWidth, imageHeight, destinationX+cuttingX, destinationY, imageWidth, imageHeight);
                break;
            case 4:
                cuttingX = 125/2;
                this.context.drawImage(lifeImage, cuttingX, 0, imageWidth, imageHeight, destinationX+cuttingX, destinationY, imageWidth, imageHeight);
                break;
            default:
                break;
        }
    }
}

let Key = {
    pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    

    isDown: function(keyCode) {
        return this.pressed[keyCode];
    },

    onKeydown: function(event) {
        this.pressed[event.keyCode] = true;
    },

    onKeyup: function(event) {
        delete this.pressed[event.keyCode];
    }
};

window.addEventListener("keyup", (event) => {Key.onKeyup(event);}, false);

window.addEventListener("keydown", (event) => {Key.onKeydown(event);}, false);