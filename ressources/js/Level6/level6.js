class Level6{
    static createLevel(thisGame){
        thisGame.level = 6;

        //Remove all objects drawn
        thisGame.clearCanvas();

        //Remove all images
        thisGame.clearImages();

        // Change background
        document.getElementById('bg').style.backgroundImage = "url('/ressources/images/game/Level6/Level6.png')";
                
        // Palms over hero and monsters
        let palms = document.createElement('img');
        palms.src = "/ressources/images/game/Level6/Palm.png";
        palms.style.position = 'absolute';
        palms.style.top = 0;
        document.getElementById('bg').appendChild(palms);

        //Place Droppy
        thisGame.droppy.x = 0;
        thisGame.droppy.y = 300;

        //Music
        thisGame.level1Music.play(); // TODO: uncomment when finishing issue

        //Title
        thisGame.levelName = 'Pinch the drop';
        
        thisGame.gameObjects = [
            thisGame.droppy,
            thisGame.timer,
            //Monster
            new Crab(thisGame.context, 800, 250, thisGame.droppy)
        ];
    }

    static detectCollisionsMonsters(thisGame){
        let crab = thisGame.gameObjects[2];

        let hit = thisGame.collisionRectRect(crab.x + 5, crab.y + 10, crab.width - 10, crab.height - 20, thisGame.droppy.x, thisGame.droppy.y, thisGame.droppy.width, thisGame.droppy.height);
        if(hit && thisGame.droppy.isColliding === false){
            thisGame.droppy.isColliding = true;

            //Crab is colliding during 1000ms
            crab.isColliding = true;
            setTimeout(()=>{
                crab.isColliding = false;
            }, 1000);
            
            if(thisGame.droppy.size<4){
                thisGame.droppy.droppyLosesALife();
            }
            else{
                thisGame.isGameOver = true;
            }
        }
    }
}