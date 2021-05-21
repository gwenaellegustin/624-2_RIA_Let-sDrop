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


        this.isColliding = false;

        this.dropImage.addEventListener('load', (event) => {
            this.width = this.dropImage.width;
            this.height = this.dropImage.height;
            this.dropReady = true; 
        });
    }

    draw(){
        this.dropImage.src = "/ressources/images/game/Drop/DropSize" + this.size + this.color + ".png";

        //Just to see for impact
        //this.context.fillStyle = this.isColliding ? '#ff8080': '#ADFF2F';
        //this.context.fillRect(this.x, this.y, this.width, this.height);

        if(this.dropReady){
            this.context.drawImage(this.dropImage, this.x, this.y);
        }
        
        //Draw life
        this.drawLife();
    }

    update(secondsPassed){
        // documentation: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
        
        if(Key.pressed.length==2){
            if (Key.isDown(Key.DOWN) && Key.isDown(Key.RIGHT)){
                this.y += this.speed * secondsPassed;
                this.x += this.speed * secondsPassed;
            }
    
            if (Key.isDown(Key.DOWN) && Key.isDown(Key.LEFT)){
                this.y += this.speed * secondsPassed;
                this.x -= this.speed * secondsPassed;
            }
    
            if (Key.isDown(Key.UP) && Key.isDown(Key.RIGHT)){
                this.y -= this.speed * secondsPassed;
                this.x += this.speed * secondsPassed;
            }
    
            if (Key.isDown(Key.UP) && Key.isDown(Key.LEFT)){
                this.y -= this.speed * secondsPassed;
                this.x -= this.speed * secondsPassed;
            }
        } else{
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
        }
    }

    droppyLosesALife(){
        //Store old size to blink
        let oldSize = this.size;
                                
        this.size = 0;

        //Waiting 100ms before blinking at oldSize
        setTimeout(()=>{
            this.size = oldSize;
        }, 100);

        //Waiting 100ms more before disappear
        setTimeout(()=>{
            this.size = 0;
        }, 200);

        //Waiting 100ms more before blinking at new size + reset speed
        setTimeout(()=>{
            this.size = oldSize+1;
            this.speed = this.size * 30 + 60;
        }, 300);

        //Waiting 1000ms before Droppy can be touched again
        setTimeout(()=>{
            this.isColliding = false;
        }, 1000);
    }

    droppyRetrieveALife(){
        let oldSize = this.size;
        this.size = 0;

         //Waiting 100ms before blinking at oldSize
         setTimeout(()=>{
            this.size = oldSize;
        }, 100);

        //Waiting 100ms more before disappear
        setTimeout(()=>{
            this.size = 0;
        }, 200);

         //Waiting 100ms more before blinking at new size + reset speed
         setTimeout(()=>{
            this.size = oldSize-1;
            this.speed = this.size * 30 + 60;
        }, 300);

        //Waiting 1000ms before Droppy can be touched again
        setTimeout(()=>{
            this.isColliding = false;
        }, 1000);
    }

    upsideDownCommands() {
        // TODO: random vector with numbers
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
            case 4:
                colorWhenTouched = "red";
                break;
        }

        let oldSize = this.size;
        
        this.size = 0;

         //Waiting 100ms before blinking at oldSize
         setTimeout(()=>{
            this.color = colorWhenTouched;
            this.size = oldSize;
        }, 100);

        //Waiting 100ms more before disappear
        setTimeout(()=>{
            this.size = 0;
        }, 200);

        //Waiting 100ms more before blinking at oldSize
         setTimeout(()=>{
            this.size = oldSize;
        }, 300);

        //Waiting 100ms more before disappear
        setTimeout(()=>{
            this.size = 0;
        }, 400);

        //Waiting 100ms more before blinking at oldSize
        setTimeout(()=>{
            this.size = oldSize;
        }, 500);

        //Waiting 100ms more before disappear
        setTimeout(()=>{
            this.size = 0;
        }, 600);

        //Waiting 100ms more before blinking at oldSize
        setTimeout(()=>{
            this.size = oldSize;
        }, 700);

        //Waiting 100ms more before disappear
        setTimeout(()=>{
            this.size = 0;
        }, 800);

        //Waiting 100ms more before blinking at oldSize
        setTimeout(()=>{
            this.size = oldSize;
        }, 900);

        //Waiting 1000ms before Droppy can be touched again
        setTimeout(()=>{
            this.isColliding = false;
        }, 1000);

        //Waiting 3000ms before Droppy is blue again
        setTimeout(()=>{
            this.color = "blue";
        }, 5000);
    }

    slowDownSpeed(thisGame) {
        thisGame.droppy.speed = 60;
        
        // Droppy's speed is back to normal again even in a new level
        setTimeout(()=>{
            thisGame.droppy.speed = this.size * 30 + 60;
        },5000);
    }

    drawLife(){
        let lifeImage = new Image();

        lifeImage.src = "/ressources/images/game/LifeSmall.png";

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

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);