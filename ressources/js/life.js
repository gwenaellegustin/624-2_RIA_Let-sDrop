/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/
class Life {
  constructor(context, x, y) {
    this.context = context;
    this.lifeReady = false;
    this.lifeImage = new Image();
    this.x = x;
    this.y = y;
    this.width = null;
    this.height = null;

    this.lifeImage.addEventListener("load", (event) => {
      if (event.defaultPrevented) {
        return; //Do nothing if event already handled
      }

      this.width = this.lifeImage.width;
      this.height = this.lifeImage.height;
      this.lifeReady = true; //The image has been loaded, we can draw it

      //Consume the event so it doesn't get handled twice
      event.preventDefault();
    });

    this.lifeImage.src =
      "/ressources/images/game/ressources/images/game/Health17x20.png";
  }

  draw() {
    if (this.lifeReady) {
      this.context.drawImage(this.lifeImage, this.x, this.y);
    }
  }

  update(secondsPassed) {}
}
