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
        this.speed = this.size * 30 + 60;

        //this.isColliding = false;
    }

    draw(){
        this.dropImage.addEventListener('load', (event) => {
            this.width = this.dropImage.width; //Reduce width of the drop
            this.height = this.dropImage.height;
            this.dropReady = true; //The image has been load, we can draw it
        });

        this.dropImage.src = "/ressources/images/game/DropSize" + this.size + ".png";

        if(this.dropReady){
            this.context.drawImage(this.dropImage, this.x, this.y);
        }
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
        console.log(event.keyCode);
    },

    onKeyup: function(event) {
        delete this.pressed[event.keyCode];
    }
};

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);