class Drop 
{
    constructor (context, x, y, size){
        this.context = context;
        this.dropReady = false;
        this.dropImage = new Image();
        this.x = x;
        this.y = y;
        this.width;
        this.height;
        this.size = size;
        this.speed = 256;

        //this.isColliding = false;

        
        
    }

    draw(){
        this.dropImage.addEventListener('load', (event) => {
            this.width = this.dropImage.width; //Reduce width of the drop
            this.height = (this.dropImage.height/this.dropImage.width)*this.width; //Reduce height of the drop by keeping same ratio
            this.dropReady = true
        });

        this.dropImage.src = "/ressources/images/game/DropSize" + this.size + ".png";

        if(this.dropReady){
            this.context.drawImage(this.dropImage, this.x, this.y, this.width, this.height);
        }
    }

    update(secondsPassed){
        // TODO keyboard reaction
        // documentation: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
    }
}

