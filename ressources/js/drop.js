const DROPIMAGE = new Image();
class Drop 
{
    constructor (context, x, y, size){
        this.context = context;
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = 256;

        //this.isColliding = false;
    }

    draw(){
        this.context.beginPath();
        DROPIMAGE.src = "ressources/images/game/DropSize" + this.size + ".png";
        this.context.drawImage(DROPIMAGE, this.x, this.y)

    }

    update(secondsPassed){
        // TODO keyboard reaction
        // documentation: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
    }
}

