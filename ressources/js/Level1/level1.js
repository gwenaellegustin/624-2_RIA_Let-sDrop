/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/
class Level1 {
  static createLevel(thisGame) {
    thisGame.level = 1;

    //Change background
    document.getElementById("bg").style.backgroundImage = thisGame.bglevel1url;

    //Remove all images
    thisGame.clearImages();

    //Remove dropZone and geolocation
    document.getElementById("dropzone").remove();
    document.getElementById("help").remove();
    document.getElementById("geolocation").remove();

    //Calcul placement according to ininital width of window
    let marginCanvas = document.getElementById("canvas").offsetLeft;
    let marginTap = 0;
    if (marginCanvas < 250) {
      marginTap = marginCanvas;
    } else {
      marginTap = 250;
    }

    //Tap over hero and monsters
    let tap = document.createElement("img");
    tap.src = "/ressources/images/game/ressources/images/game/Level1/Tap.png";
    tap.style.position = "absolute";
    tap.style.top = 0;
    tap.style.marginLeft = `${marginTap}px`;
    document.getElementById("bg").appendChild(tap);

    //Launch the timer
    thisGame.timer = new Timer(thisGame.context);

    //Launch Music
    thisGame.level1Music.play();

    //Title
    thisGame.levelName = "Clean the drop";

    thisGame.gameObjects = [
      thisGame.droppy,
      thisGame.timer,

      //Monsters
      new Soap(
        thisGame.context,
        50,
        Math.random() * (thisGame.canvas.height - 48 - 150)
      ), //Random between space usable
      new Soap(
        thisGame.context,
        150,
        Math.random() * (thisGame.canvas.height - 48 - 150)
      ),
      new Soap(
        thisGame.context,
        250,
        Math.random() * (thisGame.canvas.height - 48 - 150)
      ),
      new Soap(
        thisGame.context,
        350,
        Math.random() * (thisGame.canvas.height - 48 - 150)
      ),
      new Soap(
        thisGame.context,
        450,
        Math.random() * (thisGame.canvas.height - 48 - 150)
      ),
      new Soap(
        thisGame.context,
        550,
        Math.random() * (thisGame.canvas.height - 48 - 150)
      ),
      new Soap(
        thisGame.context,
        650,
        Math.random() * (thisGame.canvas.height - 48 - 150)
      ),
      new Soap(
        thisGame.context,
        750,
        Math.random() * (thisGame.canvas.height - 48 - 150)
      ),
      new Soap(
        thisGame.context,
        850,
        Math.random() * (thisGame.canvas.height - 48 - 150)
      ),
      new MonsterHand(
        thisGame.context,
        100,
        Math.random() * (thisGame.canvas.height - 128 - 150),
        -1,
        1,
        25
      ),
      new MonsterHand(
        thisGame.context,
        300,
        Math.random() * (thisGame.canvas.height - 128 - 150),
        1,
        -1,
        30
      ),
      new MonsterHand(
        thisGame.context,
        500,
        Math.random() * (thisGame.canvas.height - 128 - 150),
        -1,
        -1,
        40
      ),
      new MonsterHand(
        thisGame.context,
        700,
        Math.random() * (thisGame.canvas.height - 128 - 150),
        1,
        1,
        50
      ),
      new MonsterHand(
        thisGame.context,
        800,
        Math.random() * (thisGame.canvas.height - 128 - 150),
        -1,
        1,
        55
      ),
    ];
  }

  static detectCollisionsMonsters(thisGame) {
    //MONSTER HANDS COLLISIONS : Checking collisions between Droppy and Monster Hands
    for (let i = 0; i < thisGame.gameObjects.length; i++) {
      if (thisGame.gameObjects[i] instanceof MonsterHand) {
        let monsterHand = thisGame.gameObjects[i];

        //10 --> only sponge, not hand
        let hit = thisGame.collisionRectRect(
          monsterHand.x,
          monsterHand.y,
          monsterHand.width,
          monsterHand.height - 10,
          thisGame.droppy.x,
          thisGame.droppy.y,
          thisGame.droppy.width,
          thisGame.droppy.height
        );
        if (hit && thisGame.droppy.isColliding === false) {
          thisGame.droppy.isColliding = true;

          if (thisGame.droppy.size < 4) {
            thisGame.droppy.droppyLosesALife(0);
          } else {
            thisGame.isGameOver = true;
          }
        }
      }

      //SOAP COLLISIONS : Checking collisions between Droppy and Soaps
      if (thisGame.gameObjects[i] instanceof Soap) {
        let soap = thisGame.gameObjects[i];

        //15 --> only soap, not bubbles
        let hit = thisGame.collisionRectRect(
          soap.x,
          soap.y + 15,
          soap.width,
          soap.height - 15,
          thisGame.droppy.x,
          thisGame.droppy.y,
          thisGame.droppy.width,
          thisGame.droppy.height
        );
        if (hit && thisGame.droppy.isColliding === false) {
          thisGame.droppy.isColliding = true;
          let soapNb = i;
          let soapX = soap.x;

          //soap disappear and appear again somewhere else on the same x axe
          thisGame.gameObjects.splice(
            soapNb,
            1,
            new Soap(
              thisGame.context,
              soapX,
              Math.random() * (thisGame.canvas.height - 48 - 150)
            )
          );
          this.droppyIsUpsideDown(thisGame);
        }
      }
    }
  }

  static droppyIsUpsideDown(thisGame) {
    thisGame.droppy.changeColorAndBlink(thisGame);
    thisGame.droppy.isUpsideDown();
  }
}
