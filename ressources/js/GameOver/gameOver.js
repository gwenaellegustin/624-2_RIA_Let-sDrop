class GameOver{
    static createLevel(thisGame){
        let stoppedTimer = thisGame.timer.time;
        thisGame.canReload = true;

        //Remove all objects drawn
        thisGame.clearCanvas();

        //Remove all images
        thisGame.clearImages();
    
        //Display game over background
        document.getElementById('bg').style.backgroundImage = thisGame.bgGameOverUrl ;

        //Music
        thisGame.level1Music.muted = true;
        thisGame.gameOverMusic.play();
        thisGame.gameOverSound.play();
                
        //Result
        //Check if level with s or not
        let levelOrLevels;
        if(thisGame.level-1 <= 1){
            levelOrLevels = 'level';
        }
        else{
            levelOrLevels = 'levels'
        }

        let firstLine = `${thisGame.level-1} ${levelOrLevels} completed in ${stoppedTimer}`;
        let secondLine = `Press SPACEBAR to restart`;

        thisGame.context.fillText(firstLine, thisGame.canvas.width/2, 400);
        thisGame.context.fillText(secondLine, thisGame.canvas.width/2, 400 + 70); // 70 = space between lines
    }
}