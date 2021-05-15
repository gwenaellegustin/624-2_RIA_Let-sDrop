class Level5{
    static createLevel(thisGame){
        thisGame.level = 5;

        //Remove all objects drawn
        thisGame.clearCanvas();

        //Remove all images
        thisGame.clearImages();

        //Change background
        document.getElementById('bg').style.backgroundImage = "url('/ressources/images/game/Level5/Level5.png')";

        //Place Droppy
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
            thisGame.timer

            //Monsters
        ];

    }
}