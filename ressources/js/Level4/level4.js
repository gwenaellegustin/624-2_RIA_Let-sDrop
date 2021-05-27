class Level4 {
    static createLevel(thisGame){
        thisGame.level = 4;
        this.thisGame = thisGame;

        //Remove all objects drawn
        thisGame.clearCanvas();

        //Remove all images
        thisGame.clearImages();

        //Change background
        document.getElementById('bg').style.backgroundImage = "url('/ressources/images/game/Level4/Level4.png')";

        //Place Droppy
        thisGame.droppy.x = 87;
        thisGame.droppy.y = 392;

        //Reduce size of all Droppies
        thisGame.droppy.factorWidth = 0.5;
        thisGame.droppy.factorHeight = 0.5;

        //Title
        thisGame.levelName = 'Heat up the drop';

        thisGame.gameObjects = [
            thisGame.droppy,
            thisGame.timer,

            //Health
            new Life(thisGame.context, 880, 452),
            new Life(thisGame.context, 425, 484),
            new Life(thisGame.context, 380, 455),
            new Life(thisGame.context, 825, 453),
            new Life(thisGame.context, 640, 161),
            new Life(thisGame.context, 570, 345),
            new Life(thisGame.context, 379, 403),
            new Life(thisGame.context, 500, 332),
            new Life(thisGame.context, 302, 403),
            new Life(thisGame.context, 160, 113),
            new Life(thisGame.context, 809, 381),
            new Life(thisGame.context, 466, 70),
            new Life(thisGame.context, 880, 330)

        ]

        this.radiatorReady = false;
        this.radiatorImage = new Image();
        this.radiatorImage.src = '/ressources/images/game/Level4/Level4_canvas.png';

        this.radiatorImage.addEventListener('load', (event) => {
            this.radiatorReady = true; //The image has been load, we can draw it
        });
    }

    static detectCollisionsMonsters(thisGame){
    }

    static detectCollisionsEdge(thisGame){
        this.drawRadiatorOnCanvas();
        this.collisionsDroppyWithBlackPixel(thisGame.droppy);

        /*
        //HANDLE DROPPY LEAVING FROM LEFT SIDE
        if (thisGame.droppy.x < 0) {
            thisGame.droppy.x = 0;
        }

        //HANDLE DROPPY LEAVING FROM LEFT SIDE / BOTTOM
        if(thisGame.droppy.x < 3.2 && thisGame.droppy.y + thisGame.droppy.height > 225){
            thisGame.droppy.x = 3.2;
            thisGame.droppy.y = 225 - thisGame.droppy.height;
        }

        //HANDLE DROPPY LEAVING FROM LEFT SIDE / TOP
        if(thisGame.droppy.x < 3.2 && thisGame.droppy.y < 50){
            thisGame.droppy.x = 3.2;
            thisGame.droppy.y = 50;
        }
        */
    }

    static drawRadiatorOnCanvas(){
        if(this.radiatorReady){
            this.thisGame.context.drawImage(this.radiatorImage, 0, 0);
        }
    }

    static collisionsDroppyWithBlackPixel(droppy){
        let x, x1, x2;
        let y, y1, y2;

        //TOP
        x = droppy.x; //TOP/BOTTOM - LEFT
        x1 = droppy.x + droppy.width / 2; //TOP/BOTTOM - MIDDLE
        x2 = droppy.x + droppy.width; //TOP/BOTTOM - RIGHT
        y = droppy.y - 1;
        if(this.isPixelBlack(x, y) || this.isPixelBlack(x1, y) || this.isPixelBlack(x2, y)){ //I don't want y to be updated more than one time
            //console.log("TOP")
            droppy.y += droppy.speed * this.thisGame.secondsPassed;
        }

        //BOTTOM
        y = droppy.y + droppy.height + 1; //SAME FOR ALL RIGHT
        if(this.isPixelBlack(x, y) || this.isPixelBlack(x1, y) || this.isPixelBlack(x2, y)){
            //console.log("BOTTOM")
            droppy.y -= droppy.speed * this.thisGame.secondsPassed;
        }

        //LEFT
        x = droppy.x - 1;
        y = droppy.y; //LEFT/RIGHT - TOP
        y1 = droppy.y + droppy.height / 2; //LEFT/RIGHT - MIDDLE
        y2 = droppy.y + droppy.height; //LEFT/RIGHT - BOTTOM
        if(this.isPixelBlack(x, y) || this.isPixelBlack(x, y1) || this.isPixelBlack(x, y2)){
            //console.log("LEFT")
            droppy.x += droppy.speed * this.thisGame.secondsPassed;
        }

        //RIGHT
        x = droppy.x + droppy.width + 1;
        if(this.isPixelBlack(x, y) || this.isPixelBlack(x, y1) || this.isPixelBlack(x, y2)){
            //console.log("RIGHT")
            droppy.x -= droppy.speed * this.thisGame.secondsPassed;
        }
    }

    static isPixelBlack(x, y){
        let pixelData = this.thisGame.context.getImageData(x, y, 1, 1).data;
        return pixelData[0]==pixelData[1] && pixelData[1]==pixelData[2] && pixelData[2]===0;
    }
}