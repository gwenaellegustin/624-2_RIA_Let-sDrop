class Level3 {
    static createLevel(thisGame){
        thisGame.level = 3;

        //Remove all objects drawn
        thisGame.clearCanvas();

        //Remove all images
        thisGame.clearImages();

        //Change background
        document.getElementById('bg').style.backgroundImage = "url('/ressources/images/game/Level3/Level3.png')";

        //Place Droppy
        thisGame.droppy.x = 3;
        thisGame.droppy.y = 100;

        //Title
        thisGame.levelName = 'Burn the drop';

        thisGame.gameObjects = [
            thisGame.droppy,
            thisGame.timer,

            //Monster
            new Fire(thisGame.context, 122, 87, thisGame),
            new Fire(thisGame.context, 495, 432, thisGame),
            new Fire(thisGame.context, 660, 59, thisGame),
            new Fire(thisGame.context, 740, 330, thisGame)
        ]

        this.pipeImage = new Image();
        this.pipeImage.src = '/ressources/images/game/Level3/Level3_canvas.png';

        this.pipeImage.addEventListener('load', (event) => {
            this.pipeImageReady = true; //The image has been load, we can draw it
        });
    }

    static detectCollisionsMonsters(thisGame){}

    static detectCollisionsEdge(thisGame){
        if(this.pipeImageReady){
            thisGame.context.drawImage(this.pipeImage, 0, 0);
        }
        
        let x, x1, x2;
        let y, y1, y2;

        //VERSION 1///////////////////////////////////////////////////////////////////////////////////////////////

        //TOP
        ///* JUST UN.COMMENT THE FIRST 2 //
        x = thisGame.droppy.x; //TOP/BOTTOM - LEFT
        x1 = thisGame.droppy.x + thisGame.droppy.width / 2; //TOP/BOTTOM - MIDDLE
        x2 = thisGame.droppy.x + thisGame.droppy.width; //TOP/BOTTOM - RIGHT
        y = thisGame.droppy.y - 1;
        if(this.isPixelBlack(thisGame, x, y) || this.isPixelBlack(thisGame, x1, y) || this.isPixelBlack(thisGame, x2, y)){ //I don't want y to be updated more than one time
            console.log("TOP")
            thisGame.droppy.y += thisGame.droppy.speed * thisGame.secondsPassed;
        }

        //BOTTOM
        y = thisGame.droppy.y + thisGame.droppy.height + 1; //SAME FOR ALL RIGHT
        if(this.isPixelBlack(thisGame, x, y) || this.isPixelBlack(thisGame, x1, y) || this.isPixelBlack(thisGame, x2, y)){
            console.log("BOTTOM")
            thisGame.droppy.y -= thisGame.droppy.speed * thisGame.secondsPassed;
        }
        //*/

        //VERSION 2///////////////////////////////////////////////////////////////////////////////////////////////
        

        //TOP
        /* JUST UN.COMMENT THE FIRST 2 //
        x1 = thisGame.droppy.x + thisGame.droppy.width / 2; //TOP/BOTTOM - MIDDLE
        y = thisGame.droppy.y - 1;
        if(this.isPixelBlack(thisGame, x1, y)){ //I don't want y to be updated more than one time
            console.log("TOP")
            thisGame.droppy.y += thisGame.droppy.speed * thisGame.secondsPassed;
        }

        //BOTTOM
        y = thisGame.droppy.y + thisGame.droppy.height + 1; //SAME FOR ALL RIGHT
        if(this.isPixelBlack(thisGame, x1, y)){
            console.log("BOTTOM")
            thisGame.droppy.y -= thisGame.droppy.speed * thisGame.secondsPassed;
        }
        //*/
        

        //LEFT
        x = thisGame.droppy.x - 1;
        y = thisGame.droppy.y; //LEFT/RIGHT - TOP
        y1 = thisGame.droppy.y + thisGame.droppy.height / 2; //LEFT/RIGHT - MIDDLE
        y2 = thisGame.droppy.y + thisGame.droppy.height; //LEFT/RIGHT - BOTTOM
        if(this.isPixelBlack(thisGame, x, y) || this.isPixelBlack(thisGame, x, y1) || this.isPixelBlack(thisGame, x, y2)){
            console.log("LEFT")
            thisGame.droppy.x += thisGame.droppy.speed * thisGame.secondsPassed;
        }

        //RIGHT
        x = thisGame.droppy.x + thisGame.droppy.width + 1;
        if(this.isPixelBlack(thisGame, x, y) || this.isPixelBlack(thisGame, x, y1) || this.isPixelBlack(thisGame, x, y2)){
            console.log("RIGHT")
            thisGame.droppy.x -= thisGame.droppy.speed * thisGame.secondsPassed;
        }
    }

    static isPixelBlack(thisGame, x, y){
        let pixelData = thisGame.context.getImageData(x, y, 1, 1).data;
        return pixelData[0]==pixelData[1] && pixelData[1]==pixelData[2] && pixelData[2]===0;
    }
}