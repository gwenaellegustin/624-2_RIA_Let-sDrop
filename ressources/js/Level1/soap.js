class Soap {
    constructor (context, x, y){
        this.context = context;
        this.soapReady = false;
        this.soapImage = new Image();
        this.x = x;
        this.y = y + 150;  //The soap can't appear on a edge of the canvas
        this.width = null;
        this.height = null;

        this.soapImage.addEventListener("load", (event) => {
            if (event.defaultPrevented) {
                return; //Do nothing if event already handled
            }

            this.height = this.soapImage.height;
            this.width = this.soapImage.width;
            this.soapReady = true; //The image has been load, we can draw it

            //Consume the event so it doesn't get handled twice
            event.preventDefault();
        });

        this.soapImage.src = "/ressources/images/game/Level1/Soap34x34.png";
    }

    draw(){
        if(this.soapReady){
            this.context.drawImage(this.soapImage, this.x, this.y);
        }
    }

    update(secondsPassed){}
}