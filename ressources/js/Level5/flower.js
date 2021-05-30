class Flower{
    constructor (context, x, y, image) {
        this.context = context;
        this.flowerReady = false;
        this.flowerImage = new Image();
        this.x = x;
        this.y = y;
        this.imageSrc = image;
        this.width = null;
        this.height = null;

        this.flowerImage.addEventListener('load', (event) => {
            if (event.defaultPrevented) {
                return; // Do nothing if event already handled
            }

            this.width = this.flowerImage.width;
            this.height = this.flowerImage.height;
            this.flowerReady = true; //The image has been load, we can draw it

            // Consume the event so it doesn't get handled twice
            event.preventDefault();
        });

        switch (this.imageSrc) {
            case 1:
                this.flowerImage.src = "/ressources/images/game/Level5/Plantation.png";
                break;
            case 2:
                this.flowerImage.src = "/ressources/images/game/Level5/Leaves.png";
                break;
            case 3:
                this.flowerImage.src = "/ressources/images/game/Level5/Daisy.png";
                break;
            case 4:
                this.flowerImage.src = "/ressources/images/game/Level5/Tulip.png";
                break;
            case 5:
                this.flowerImage.src = "/ressources/images/game/Level5/Orchid.png";
                break;
        }
    }

    draw(){
        //Just to see for impact TODO: delete at the end
        this.context.fillStyle = this.isColliding ? '#ff8080': '#ADFF2F';
        this.context.fillRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10);

        if(this.flowerReady){
            this.context.drawImage(this.flowerImage, this.x, this.y);
        }
    }

    update(secondsPassed) {}


}