class Life{
    constructor (context, x, y) {
        this.context = context;
        this.lifeReady = false;
        this.lifeImage = new Image();
        this.x = x;
        this.y = y;
        this.width = null;
        this.height = null;

        this.lifeImage.addEventListener('load', (event) => {
            if (event.defaultPrevented) {
                return; // Do nothing if event already handled
            }

            this.width = this.lifeImage.width;
            this.height = this.lifeImage.height;
            this.lifeReady = true; //The image has been load, we can draw it

            // Consume the event so it doesn't get handled twice
            event.preventDefault();
        });

        this.lifeImage.src = "/ressources/images/game/Health17x20.png";
    }

    draw(){
        //Just to see for impact TODO: delete at the end
        this.context.fillStyle = '#ADFF2F';
        this.context.fillRect(this.x, this.y, this.width, this.height);

        if(this.lifeReady){
            this.context.drawImage(this.lifeImage, this.x, this.y);
        }
    }

    update(secondsPassed) {}
}