/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/
class Fire {
  constructor(context, x, y, thisGame, canMoveX, canMoveY) {
    this.context = context;
    this.fireReady = false;
    this.fireImage = new Image();
    this.x = x;
    this.y = y;
    this.directionY = 1;
    this.directionX = 1;
    this.angle = 0;
    this.speed = 55;
    this.width = null;
    this.height = null;
    this.droppy = thisGame.gameObjects[0];
    this.thisGame = thisGame;
    this.canMoveX = canMoveX;
    this.canMoveY = canMoveY;

    this.fireImage.addEventListener("load", (event) => {
      if (event.defaultPrevented) {
        return; //Do nothing if event already handled
      }

      this.width = this.fireImage.width;
      this.height = this.fireImage.height;
      this.fireReady = true; //The image has been loaded, we can draw it

      //Consume the event so it doesn't get handled twice
      event.preventDefault();
    });

    this.fireImage.src = "ressources/images/game/Level3/Fire30x35.png";

    this.interval = 0; //Time between each little fire
  }

  draw() {
    //Reappear here after a restore
    this.context.save();

    //Move the origin to the fire center
    this.context.translate(this.x, this.y);
    this.context.rotate(this.angle);

    if (this.fireReady) {
      this.context.drawImage(this.fireImage, -this.width / 2, -this.height / 2); //Fire rotate from middle right (bottom of the yellow part)
    }

    this.context.restore();
  }

  update(secondsPassed) {
    this.interval += secondsPassed;

    //Shoot little fires each ~2 seconds
    if (this.interval > 2) {
      let littleFire = new LittleFire(
        this.context,
        this.x,
        this.y,
        this.droppy
      );
      this.thisGame.gameObjects.push(littleFire);
      this.interval = 0;
    }

    //Construct angle
    let dx = this.x - this.droppy.x;
    let dy = this.y - this.droppy.y;
    let theta = Math.atan2(dy, dx);
    this.angle = theta;

    if (this.canMoveX) {
      let x;
      let y, y1, y2;

      //LEFT
      x = this.x - 17;
      y = this.y; //LEFT/RIGHT - TOP
      y1 = this.y + this.height / 2; //LEFT/RIGHT - MIDDLE
      y2 = this.y + this.height; //LEFT/RIGHT - BOTTOM
      if (
        Level3.isPixelBlack(x, y) ||
        Level3.isPixelBlack(x, y1) ||
        Level3.isPixelBlack(x, y2)
      ) {
        this.directionX *= -1;
      }

      //RIGHT
      x = this.x + this.width - 10;
      if (
        Level3.isPixelBlack(x, y) ||
        Level3.isPixelBlack(x, y1) ||
        Level3.isPixelBlack(x, y2)
      ) {
        this.directionX *= -1;
      }

      this.x += this.speed * this.directionX * secondsPassed;
    } else if (this.canMoveY) {
      let x, x1, x2;
      let y;
      x = this.x; //TOP/BOTTOM - LEFT
      x1 = this.x + this.width / 2; //TOP/BOTTOM - MIDDLE
      x2 = this.x + this.width; //TOP/BOTTOM - RIGHT
      y = this.y - 20;
      if (
        Level3.isPixelBlack(x, y) ||
        Level3.isPixelBlack(x1, y) ||
        Level3.isPixelBlack(x2, y)
      ) {
        //I don't want y to be updated more than once
        this.directionY *= -1;
      }

      //BOTTOM
      y = this.y + this.height; //SAME FOR ALL RIGHT
      if (
        Level3.isPixelBlack(x, y) ||
        Level3.isPixelBlack(x1, y) ||
        Level3.isPixelBlack(x2, y)
      ) {
        this.directionY *= -1;
      }

      this.y += this.speed * this.directionY * secondsPassed;
    }
  }
}
