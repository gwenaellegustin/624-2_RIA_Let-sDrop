class Soap {
    constructor (context, x, y){
        this.context = context;
        this.soapReady = false;
        this.soapImage = new Image();
        this.x = x;
        this.y = y + 148;  //The soap can't appear on a edge of the canvas

        //this.isColliding = false;
    }

    draw(){
        /*
        this.soapImage.addEventListener('load', (event) => {
            this.soapReady = true; //The image has been load, we can draw it
        });

        this.soapImage.src = "/ressources/images/game/Level1/Soap48x48.png";

        if(this.soapReady){
            this.context.drawImage(this.soapImage, this.x, this.y);
        }
        */

        // Draw a simple square
        this.context.fillStyle = '#0099b0';
        this.context.beginPath();
        this.context.arc(this.x, this.y, 50, 0, 2 * Math.PI); //x,y,radius,starting angle,ending angle
        this.context.fill();
        
    }

    update(secondsPassed){}
}