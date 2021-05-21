class Fire{
    constructor (context, x, y, thisGame) {
        this.context = context;
        this.fireReady = false;
        this.fireImage = new Image();
        this.x = x;
        this.y = y;
        this.angle = 0;
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
        //Reapear here after a restore
        this.context.save();

        // move the origin to the fire center
        this.context.translate(this.x, this.y);
        this.context.rotate(this.angle);

        
        if(this.fireReady){
            this.context.drawImage(this.fireImage, -this.width/2, -this.height/2); //If wanna rotate on middle right (middle bottom of fire), -this.width, -this.height/2
        }
        
        //this.context.fillStyle = '#ff8080';
        //this.context.fillRect(0, 0, 100, 75); //x,y,longueur,hauteur
        this.context.restore();
    }

    update(secondsPassed) {
        this.interval += secondsPassed;

        if(this.collisionCircleRect(this.x, this.y, 500, this.droppy.x, this.droppy.y, this.droppy.width, this.droppy.height)){
            if(this.interval > 2.5){
                let littleFire = new LittleFire(this.context, this.x, this.y, this.droppy);
                this.thisGame.gameObjects.push(littleFire);
                this.interval = 0;
            }
        }

        //Construct angle
        const dx = this.x - this.droppy.x;
        const dy = this.y - this.droppy.y;
        let theta = Math.atan2(dy, dx);
        this.angle = theta;
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