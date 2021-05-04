class Drop {
    constructor (context, x, y, size){
        this.context = context;
        this.dropReady = false;
        this.dropImage = new Image();
        this.x = x;
        this.y = y;
        this.width;
        this.height;
        this.size = size;
        this.speed;

        this.isColliding = false;
    }

    draw(){
        this.dropImage.addEventListener('load', (event) => {
            this.width = this.dropImage.width; //Reduce width of the drop
            this.height = this.dropImage.height;
            this.dropReady = true; //The image has been load, we can draw it
        });

        this.dropImage.src = "/ressources/images/game/DropSize" + this.size + ".png";

        //Just to see for impact
        this.context.fillStyle = this.isColliding ? '#ff8080': '#ADFF2F';
        this.context.fillRect(this.x, this.y, this.width, this.height);

        if(this.dropReady){
            this.context.drawImage(this.dropImage, this.x, this.y);
        }

        this.speed = this.size * 30 + 60;

        //Draw life
        this.drawLife();
    }

    update(secondsPassed){
        // TODO keyboard reaction
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

    drawLife(){
        let lifeImage = new Image();

        lifeImage.src = "/ressources/images/game/Life.png";

        let destinationX = 700;
        let destinationY = 10;
        let cuttingX;
        let imageWidth = lifeImage.width;
        let imageHeight = lifeImage.height;
        
        //Depending on the number of lifes, the image is crop
        switch (this.size) {
            case 1:
                this.context.drawImage(lifeImage, 700, 10);
                break;
            case 2:
                cuttingX = 47;
                this.context.drawImage(lifeImage, cuttingX, 0, imageWidth, imageHeight, destinationX+cuttingX, destinationY, imageWidth, imageHeight);
                break;
            case 3:
                cuttingX = 88;
                this.context.drawImage(lifeImage, cuttingX, 0, imageWidth, imageHeight, destinationX+cuttingX, destinationY, imageWidth, imageHeight);
                break;
            case 4:
                cuttingX = 125;
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