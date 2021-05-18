class Fire{
    constructor (context, x, y, thisGame) {
        this.context = context;
        this.fireReady = false;
        this.fireImage = new Image();
        this.x = x;
        this.y = y;
        this.width = null;
        this.height = null;
        this.droppy = thisGame.gameObjects[0];
        this.thisGame = thisGame;

        this.fireImage.addEventListener('load', (event) => {
            this.width = this.fireImage.width;
            this.height = this.fireImage.height;
            this.fireReady = true; //The image has been load, we can draw it
        });

        this.fireImage.src = "/ressources/images/game/Level3/Fire30x35.png";

        this.interval = 0; //Time between each little fire
    }

    draw(){
        if(this.fireReady){
            this.context.drawImage(this.fireImage, this.x, this.y);
        }
    }

    update(secondsPassed) {

        this.interval += secondsPassed;

        if(this.collisionCircleRect(this.x, this.y, 200, this.droppy.x, this.droppy.y, this.droppy.width, this.droppy.height)){
            console.log("AROUND")

            if(this.interval > 4){
                console.log('SHOT FIRE');
                let littleFire = new LittleFire(this.context, this.x, this.y, this.droppy);
                this.thisGame.gameObjects.push(littleFire);
                this.interval = 0;
                console.log(this.thisGame.gameObjects);
            }
        }
    }

    collisionCircleRect(circlex, circley, radius, rectx, recty, rectwidth, rectheight){
        // temporary variables to set edges for testing
        let testX = circlex;
        let testY = circley;

        // which edge is closest?
        if (circlex < rectx) {// test left edge
            testX = rectx;
        }
        else if (circlex > rectx+rectwidth) {// right edge
            testX = rectx+rectwidth;
        }   

        if (circley < recty) {// top edge
            testY = recty;
        }
        else if (circley > recty+rectheight) {// bottom edge
            testY = recty+rectheight;   
        }

        // get distance from closest edges
        let distX = circlex-testX;
        let distY = circley-testY;
        let distance = Math.sqrt( (distX*distX) + (distY*distY) );

        // if the distance is less than the radius, collision!
        if (distance <= radius) {
            return true;
        }
        return false;
    }
}