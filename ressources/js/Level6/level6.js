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

        //Launch the timer
        thisGame.timer = new Timer(thisGame.context);

        //Music
        thisGame.level1Music.play(); // TODO: uncomment when finishing issue

        //Title
        thisGame.levelName = 'Pinch the drop';
        
        thisGame.gameObjects = [
            
            thisGame.droppy,
            
            thisGame.timer,

            //Monsters
            //TODO:
        ];
    }

    static detectCollisionsMonsters(thisGame){
        //TODO:
    }
}