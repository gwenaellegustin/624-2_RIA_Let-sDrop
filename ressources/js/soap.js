class Soap {
    constructor (context, x, y){
        this.context = context;
        this.soapReady = false;
        this.soapImage = new Image();
        this.x = x;
        this.y = y + 148;  //The soap can't appear on a edge of the canvas

        //this.isColliding = false;

        this.soapImage.addEventListener('load', (event) => {
            this.soapReady = true; //The image has been load, we can draw it
        });

        this.soapImage.src = "/ressources/images/game/Level1/Soap48x48.png";
    }

    draw(){
        if(this.soapReady){
            this.context.drawImage(this.soapImage, this.x, this.y);
        }        
    }

    update(secondsPassed){}
}