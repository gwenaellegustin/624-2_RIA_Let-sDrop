/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/
class Crab {
  constructor(context, x, y, droppy) {
    this.context = context;
    this.monsterReady = false;
    this.monsterImage = new Image();
    this.x = x;
    this.y = y;
    this.width = null;
    this.height = null;
    this.speed = 250;
    this.direction = "Left";
    this.directionX = -1;
    this.directionY = 1;
    this.isColliding = false;
    this.droppy = droppy;
    this.life = 8;

    this.monsterImage.addEventListener("load", (event) => {
      if (event.defaultPrevented) {
        return; //Do nothing if event already handled
      }

      this.width = this.monsterImage.width;
      this.height = this.monsterImage.height;
      this.monsterReady = true;

      //Consume the event so it doesn't get handled twice
      event.preventDefault();
    });

    this.monsterImage.src =
      "/ressources/images/game/ressources/images/game/Level6/Crab" +
      this.direction +
      "110x130.png";
  }

  draw() {
    if (this.monsterReady) {
      this.context.drawImage(this.monsterImage, this.x, this.y);
    }

    //Draw life
    this.drawLife();
  }

  update(secondsPassed) {
    if (this.life > 0) {
      //is alive -> move
      this.x += (this.speed / 5) * this.directionX * secondsPassed;
      this.y += this.speed * this.directionY * secondsPassed;

      //Grab Droppy
      if (this.isColliding == true) {
        this.speed = 150;
        this.monsterImage.src =
          "/ressources/images/game/ressources/images/game/Level6/Crab" +
          this.direction +
          "Closed110x130.png";
      } else {
        this.speed = 250;
        this.monsterImage.src =
          "/ressources/images/game/ressources/images/game/Level6/Crab" +
          this.direction +
          "110x130.png";
      }

      //Touching edges
      if (this.x < 0) {
        //Left side
        this.x = 0;
      } else if (this.x > this.context.canvas.width - this.width) {
        //Right side
        this.x = this.context.canvas.width - this.width;
      }
      if (this.y < 50) {
        //Top side
        this.y = 50;
        this.directionY = 1;
      } else if (this.y > this.context.canvas.height - this.height) {
        //Bottom side
        this.y = this.context.canvas.height - this.height;
        this.directionY = -1;
      }

      //Direction
      if (this.droppy.x + this.droppy.width / 2 > this.x + this.width / 2) {
        this.directionX = 1;
        this.direction = "Right";
      } else {
        this.directionX = -1;
        this.direction = "Left";
      }
    } else {
      //is dead -> doesn't move + dead image
      this.monsterImage.src =
        "/ressources/images/game/ressources/images/game/Level6/Crab" +
        this.direction +
        "Dead110x130.png";
      this.x = this.x;
      this.y = this.y;
    }
  }

  drawLife() {
    let lifeImage = new Image();
    lifeImage.src =
      "/ressources/images/game/ressources/images/game/Level6/CrabLife.png";

    let destinationX = 700;
    let destinationY = 20;
    let cuttingX = 20; //width of a crablife
    let imageWidth = lifeImage.width;
    let imageHeight = lifeImage.height;

    this.context.drawImage(
      lifeImage,
      cuttingX * (8 - this.life),
      0,
      imageWidth,
      imageHeight,
      destinationX + cuttingX * (8 - this.life),
      destinationY,
      imageWidth,
      imageHeight
    );
  }
}
