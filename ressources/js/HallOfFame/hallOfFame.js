/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/
class HallOfFame {
  static async createLevel(thisGame) {
    //Remove all objects drawn
    thisGame.clearCanvas();

    //Remove all images
    thisGame.clearImages();

    if (thisGame.level) {
      //Delete input from html
      document.getElementById("usernameInput").remove();
      //Stop sound of droppy on the boat and start ocean + seagulls
      thisGame.level1Music.muted = true;
      thisGame.endSound.play();
    } else {
      //Remove dropZone and geolocation
      document.getElementById("dropzone").remove();
      document.getElementById("help").remove();
      document.getElementById("geolocation").remove();
      thisGame.winnerSound.muted = true;
    }

    //Display winner screen background
    document.getElementById("bg").style.backgroundImage =
      thisGame.bgHallOfFameUrl;

    let results = await thisGame.hallOfFame;

    this.draw(thisGame, results);

    thisGame.canReload = true;
  }

  static draw(thisGame, results) {
    //Draw hall of fame rect
    thisGame.context.fillStyle = "rgba(255,255,255,0.7)";
    thisGame.context.fillRect(
      50,
      50,
      thisGame.canvas.width - 100,
      thisGame.canvas.height - 50
    );

    //Title
    thisGame.context.fillStyle = "black";
    thisGame.context.textAlign = "left";
    thisGame.context.textBaseline = "top";
    thisGame.context.fillText("Hall of fame", 80, 70);

    //Display each row (10max)
    thisGame.context.font = "28px Delius";
    let numberOfMatches = 0;
    for (let i = 0; i < results.length && i < 10; i++) {
      const element = results[i];
      let position;

      let j = i + 1; //because i=0 for the 1st position
      j -= numberOfMatches; //For example if there are 2 2nd, the 4th element will be 3rd

      if (
        i != 0 &&
        new Date(element.time).getTime() ===
          new Date(results[i - 1].time).getTime()
      ) {
        j--; //3rd should be 2nd if a match
        numberOfMatches++;
      }

      switch (j) {
        case 1:
          position = "1st";
          break;
        case 2:
          position = "2nd";
          break;
        case 3:
          position = "3rd";
          break;
        default:
          position = j + "th";
          break;
      }

      //@Todo: use id
      if (
        localStorage.getItem("CurrentUsername") === element.user &&
        localStorage.getItem("CurrentTime") === element.time
      ) {
        thisGame.context.fillStyle = "#ff3232"; //Color in red current
      } else {
        thisGame.context.fillStyle = "black";
      }

      //If username is longer than 12, make it like "AntonyMarque..."
      if (element.user.length > 20) {
        element.user = element.user.substring(0, 20) + "...";
      }

      const date = new Date(element.timestamp);
      const dateString = date.toLocaleDateString();
      const timeString = date.toLocaleTimeString();

      thisGame.context.fillText(`${position}`, 80, 150 + i * 35);
      thisGame.context.fillText(`${element.user}`, 180, 150 + i * 35);
      thisGame.context.fillText(`${element.time}`, 450, 150 + i * 35);
      thisGame.context.fillText(
        `${dateString} ${timeString}`,
        650,
        150 + i * 35
      );
    }
  }
}
