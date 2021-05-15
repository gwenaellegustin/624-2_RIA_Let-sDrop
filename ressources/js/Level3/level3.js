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
        thisGame.droppy.x = 0;
        thisGame.droppy.y = 100;

        //Title
        thisGame.levelName = 'Burn the drop';

        thisGame.gameObjects = [
            thisGame.droppy,
            thisGame.timer,

            //Monster
            new Fire(thisGame.context, 122, 87),
            new Fire(thisGame.context, 495, 432),
            new Fire(thisGame.context, 660, 59),
            new Fire(thisGame.context, 740, 330)
        ]
    }

    static detectCollisionsMonsters(thisGame){}

    static detectCollisionsEdge(thisGame){
        
    }
}