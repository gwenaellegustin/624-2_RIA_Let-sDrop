class Winner{
    static createLevel(thisGame){
        let stoppedTimer = thisGame.timer

        //Remove all objects drawn
        thisGame.clearCanvas();

        //Remove all images
        thisGame.clearImages();

        //Display winner screen background
        document.getElementById('bg').style.backgroundImage = "url('/ressources/images/game/Win/Win.png')";

        //Music
        thisGame.level1Music.muted = true;
        thisGame.winnerMusic.play();
        thisGame.winnerSound.play();

        //Text
        let firstLine = `You released Droppy in ${stoppedTimer.time} !`;
        let secondLine = `Press SPACEBAR to try faster`;

        thisGame.context.fillStyle = "black";
        thisGame.context.fillText(firstLine, thisGame.canvas.width/2, 20);
        thisGame.context.fillText(secondLine, thisGame.canvas.width/2, 20 + 70); // 70 = space between lines

        //Input
        let input = new InputUsername(thisGame.context, stoppedTimer, thisGame);
        input.draw();
    }
}