/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/
class MonsterHand {
  constructor(context, x, y, directionX, directionY, speed) {
    this.context = context;
    this.monsterReady = false;
    this.monsterImage = new Image();
    this.x = x;
    this.y = y + 150; //The soap can't appear on a edge of the canvas
    this.width = null;
    this.height = null;
    this.speed = speed;
    this.directionX = directionX;
    this.directionY = directionY;

    this.monsterImage.addEventListener("load", (event) => {
      if (event.defaultPrevented) {
        return; //Do nothing if event already handled
      }

      this.width = this.monsterImage.width;
      this.height = this.monsterImage.height;
      this.monsterReady = true; //The image has been loaded, we can draw it

      //Consume the event so it doesn't get handled twice
      event.preventDefault();
    });

    this.monsterImage.src =
      "/ressources/images/game/ressources/images/game/Level1/MonsterHand48x48.png";
  }

  draw() {
    if (this.monsterReady) {
      this.context.drawImage(this.monsterImage, this.x, this.y);
    }
  }

  update(secondsPassed) {
    this.x += this.speed * this.directionX * secondsPassed;
    this.y += this.speed * this.directionY * secondsPassed;

    //Touching edges
    if (this.x < 0) {
      //Left side
      this.x = this.context.canvas.width - this.width;
    } else if (this.x > this.context.canvas.width - this.width) {
      //Right side
      this.x = 0;
    }

    if (this.y < 150) {
      this.y = this.context.canvas.height - this.height;
    } else if (this.y > this.context.canvas.height - this.height) {
      //Bottom side
      this.y = 150;
    }
  }
}
