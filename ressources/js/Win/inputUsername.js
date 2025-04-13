/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/

class InputUsername {
  constructor(context, timer, thisGame, db) {
    this.context = context;
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

    window.addEventListener("keydown", (event) => {
      //If the input.value is empty, no need to save nothing
      if (event.code === "Enter" && this.input.value != "") {
        thisGame.writeUserData(
          this.input.value,
          thisGame.timer.timeWithMilliSeconds,
          thisGame.timer.end,
          db
        );
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

  // update(secondsPassed) {}

  // storeUsernameInJsonFile(thisGame) {
  //   this.results = new Array();

  //   //Create object
  //   let userObject = {
  //     username: this.input.value,
  //     time: this.timer.diff,
  //     timeString: this.timer.timeWithMilliSeconds,
  //   };

  //   //Instanciate a new XMLHttpRequest and then open a new request
  //   let request = new XMLHttpRequest();
  //   request.withCredentials = false;
  //   request.open("GET", this.requestURL);

  //   //Tell the server that we're expecting an answer in .json type then send request
  //   request.responseType = "json";
  //   request.send();

  //   //Store the answer into a native variable
  //   request.onload = () => {
  //     let hallOfFameJson = request.response;
  //     this.results = hallOfFameJson;

  //     //Add last result to the array
  //     this.results.push(userObject);

  //     this.fillInHOFArray(this.results);

  //     HallOfFame.createLevel(thisGame, this.results);
  //   };

  //   //In order to highlight the user record, I need to know who it is
  //   localStorage.setItem("CurrentUsername", this.input.value);
  //   localStorage.setItem("CurrentTime", this.timer.timeWithMilliSeconds);
  // }

  // fillInHOFArray(jsonObject) {
  //   let request = new XMLHttpRequest();
  //   request.withCredentials = false;
  //   request.open("PUT", this.requestURL, true);

  //   request.setRequestHeader("Content-Type", "application/json");
  //   request.setRequestHeader("x-ms-version", "2020-04-08");
  //   request.setRequestHeader("x-ms-blob-type", "BlockBlob");

  //   request.send(JSON.stringify(jsonObject));
  // }
}
