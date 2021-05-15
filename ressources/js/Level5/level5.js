class Level5{
    static createLevel(thisGame){
        thisGame.level = 5;

        //Remove all objects drawn
        thisGame.clearCanvas();

        //Remove all images
        thisGame.clearImages();

        //Change background
        document.getElementById('bg').style.backgroundImage = "url('/ressources/images/game/Level5/Level5.png')";

        //Place Droppy depending on his height
        thisGame.droppy.x = 0;
        switch(thisGame.droppy.size) {
            case 1:
                thisGame.droppy.y = 155;
                break;
            case 2:
                thisGame.droppy.y = 162;
                break;
            case 3:
                thisGame.droppy.y = 176;
                break;
            case 4:
                thisGame.droppy.y = 180;
                break;
        }

        //Title
        thisGame.levelName = 'Slurp the drop';

        thisGame.gameObjects = [
            thisGame.droppy,
            thisGame.timer,

            //Monsters
            new Snail(thisGame.context, (Math.random() * 250)+700, 150, -1, 0, 20),
            new Snail(thisGame.context, (Math.random() * 250)+700, 280, -1, 0, 10),
            new Snail(thisGame.context, (Math.random() * 250)+700, 410, -1, 0, 15),
            new Snail(thisGame.context, Math.random() * 200, 215, 1, 0, 15),
            new Snail(thisGame.context, Math.random() * 100, 345, 1, 0, 10),
            new Snail(thisGame.context, Math.random() * 300, 475, 1, 0, 25)
        ];
    }

    static detectCollisionsMonsters(thisGame){
        //SNAIL COLLISIONS
        for (let i = 0; i < thisGame.gameObjects.length; i++)
        {
            if(thisGame.gameObjects[i] instanceof Snail){
                let snail = thisGame.gameObjects[i];

                let hit = thisGame.collisionRectRect(snail.x, snail.y, snail.width, snail.height, thisGame.droppy.x, thisGame.droppy.y, thisGame.droppy.width, thisGame.droppy.height);
                if(hit && thisGame.droppy.isColliding === false){
                    thisGame.droppy.isColliding = true;
                    
                    if(thisGame.droppy.size<4){
                        thisGame.droppy.droppyLosesALife();
                    }
                    else{
                        thisGame.isGameOver = true;
                    }
                }
            }

            // implement flowers here
            
        }
    }
}