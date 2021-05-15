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

        this.context.fillStyle = 'rgba(255, 255, 255, 0.2)';
        this.context.fillRect(0, 50, 90, 180); //x,y,longueur,hauteur

        this.context.fillRect(85, 230, 175, 120); //x,y,longueur,hauteur

        this.context.beginPath();
        this.context.arc(90, 230, 160, 1.5*Math.PI, 0.5*Math.PI); //x,y,radius,starting angle,ending angle
        this.context.fill();
    }

    update(secondsPassed) {}
}