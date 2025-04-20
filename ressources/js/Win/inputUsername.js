/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/

class InputUsername {
  constructor(thisGame, timer, db) {
    this.context = thisGame.context;
    this.x = 200;
    this.y = 280;
    this.timer = timer;
    this.results;

    //Create input for username
    let marginCanvas = document.getElementById("canvas").offsetLeft;
    this.input = document.createElement("INPUT");
    this.input.id = "usernameInput";
    this.input.style.position = "absolute";
    this.input.style.top = `${this.y + 40}px`;
    this.input.style.left = `${marginCanvas + 100}px`;
    this.input.style.height = "30px";
    this.input.style.width = "200px";
    this.input.style.paddingLeft = "10px";
    document.getElementById("bg").appendChild(this.input);
    this.input.focus();

    window.addEventListener("keydown", (event) => {
      //If the input.value is empty, no need to save nothing
      if (event.code === "Enter" && this.input.value != "") {
        this.enterName(thisGame, db);
        this.input.value = "";
      }
    });

    //Recalculate each time the input is modified
    document
      .getElementById("usernameInput")
      .addEventListener("input", (event) => {
        if (event.defaultPrevented) {
          return; //Do nothing if event already handled
        }

        thisGame.clearCanvas();

        Winner.drawText(thisGame);
        this.draw();

        //Consume the event so it doesn't get handled twice
        event.preventDefault();
      });
  }

  draw() {
    this.context.fillStyle = "black";
    this.context.fillText("Your name: ", this.x, this.y);
  }

  enterName(thisGame, db) {
    let results = thisGame.hallOfFame;
    let sameNameResult = results.filter(
      (result) => result.user == this.input.value
    );
    if (
      sameNameResult.length > 0 &&
      sameNameResult[0].time < this.timer.timeWithMilliSeconds
    ) {
      if (
        confirm(
          "A higher score has already been achieved with this name. Would you like to continue?"
        )
      ) {
        this.saveResult(thisGame, db);
      } else {
        this.input.value = "";
      }
    } else {
      this.saveResult(thisGame, db);
    }
  }

  saveResult(thisGame, db) {
    const id = thisGame.writeUserData(
      this.input.value,
      thisGame.timer.timeWithMilliSeconds,
      thisGame.timer.end,
      db
    );

    //In order to highlight the user record, I need to know who it is
    localStorage.setItem("CurrentUsername", this.input.value);
    localStorage.setItem("CurrentTime", this.timer.timeWithMilliSeconds);
    localStorage.setItem("CurrentID", id); //TODO: not use for now

    HallOfFame.createLevel(thisGame);
  }
}
