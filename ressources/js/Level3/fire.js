class Fire{
    constructor (context, x, y, image) {
        this.context = context;
        this.fireReady = false;
        this.fireImage = new Image();
        this.x = x;
        this.y = y;
        this.width = null;
        this.height = null;

        this.fireImage.addEventListener('load', (event) => {
            this.width = this.fireImage.width;
            this.height = this.fireImage.height;
            this.fireReady = true; //The image has been load, we can draw it
        });

        this.fireImage.src = "/ressources/images/game/Level3/Fire30x35.png";
    }

    draw(){
        if(this.fireReady){
            this.context.drawImage(this.fireImage, this.x, this.y);
        }
    }

    update(secondsPassed) {}
}