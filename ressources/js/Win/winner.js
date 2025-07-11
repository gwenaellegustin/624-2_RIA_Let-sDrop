/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/

class Winner {
  static createLevel(thisGame, db) {
    this.stoppedTimer = thisGame.timer;

    //Remove all objects drawn
    thisGame.clearCanvas();

    //Remove all images
    thisGame.clearImages();

    //Display winner screen background
    document.getElementById("bg").style.backgroundImage = thisGame.bgWinUrl;

    //Music
    thisGame.level1Music.muted = true;
    thisGame.winnerMusic.play();
    thisGame.winnerSound.play();

    //Input
    this.input = new InputUsername(thisGame, this.stoppedTimer, db);

    this.drawText(thisGame);

    this.input.draw();
  }

  static drawText(thisGame) {
    //Text
    let firstLine = `You released Droppy in ${this.stoppedTimer.time} !`;
    let secondLine;

    thisGame.context.fillStyle = "black";
    thisGame.context.fillText(firstLine, thisGame.canvas.width / 2, 20);

    //If you enter nothing or a space (wanna reload the game)
    if (this.input.input.value === "" || this.input.input.value === " ") {
      thisGame.canReload = true;
      secondLine = `Press SPACEBAR to try faster`;
    } else {
      thisGame.canReload = false;
      secondLine = `Press ENTER to save your name`;
    }

    thisGame.context.fillText(secondLine, thisGame.canvas.width / 2, 20 + 70); //70 = space between lines
  }
}
