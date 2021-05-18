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
        this.pipeImage.src = '/ressources/images/game/Level3/test.png';

        this.pipeImage.addEventListener('load', (event) => {
            this.pipeImageReady = true; //The image has been load, we can draw it
        });
    }

    static detectCollisionsMonsters(thisGame){}

    static detectCollisionsEdge(thisGame){
        if(this.pipeImageReady){
            thisGame.context.drawImage(this.pipeImage, 0, 0);
        }
        
        //TOP
        let pixelData = thisGame.context.getImageData(thisGame.droppy.x, thisGame.droppy.y-1, 1, 1).data;
        if(pixelData[0]==pixelData[1] && pixelData[1]==pixelData[2] && pixelData[2]===0 ){
            thisGame.droppy.y += thisGame.droppy.speed * thisGame.secondsPassed;
        }

        //RIGHT
        pixelData = thisGame.context.getImageData(thisGame.droppy.x+thisGame.droppy.width+1, thisGame.droppy.y, 1, 1).data;
        if(pixelData[0]==pixelData[1] && pixelData[1]==pixelData[2] && pixelData[2]===0 ){
            thisGame.droppy.x -= thisGame.droppy.speed * thisGame.secondsPassed;
        }

        //BOTTOM
        pixelData = thisGame.context.getImageData(thisGame.droppy.x, thisGame.droppy.y+thisGame.droppy.height+1, 1, 1).data;
        if(pixelData[0]==pixelData[1] && pixelData[1]==pixelData[2] && pixelData[2]===0 ){
            thisGame.droppy.y -= thisGame.droppy.speed * thisGame.secondsPassed;
        }

        //LEFT
        pixelData = thisGame.context.getImageData(thisGame.droppy.x, thisGame.droppy.y, 1, 1).data;
        if(pixelData[0]==pixelData[1] && pixelData[1]==pixelData[2] && pixelData[2]===0 ){
            thisGame.droppy.x += thisGame.droppy.speed * thisGame.secondsPassed;
        }

        //BOTTOM RIGHT
        pixelData = thisGame.context.getImageData(thisGame.droppy.x+thisGame.droppy.width+1, thisGame.droppy.y+thisGame.droppy.height+1, 1, 1).data;
        if(pixelData[0]==pixelData[1] && pixelData[1]==pixelData[2] && pixelData[2]===0 ){
            thisGame.droppy.x -= thisGame.droppy.speed * thisGame.secondsPassed;
            thisGame.droppy.y -= thisGame.droppy.speed * thisGame.secondsPassed;
        }

        //BOTTOM LEFT
        pixelData = thisGame.context.getImageData(thisGame.droppy.x-1, thisGame.droppy.y+thisGame.droppy.height+1, 1, 1).data;
        if(pixelData[0]==pixelData[1] && pixelData[1]==pixelData[2] && pixelData[2]===0 ){
            thisGame.droppy.x += thisGame.droppy.speed * thisGame.secondsPassed;
            thisGame.droppy.y -= thisGame.droppy.speed * thisGame.secondsPassed;
        }
    }
}