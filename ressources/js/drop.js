/**
 * © 2021 Baechler Stéphanie, Gustin Gwenaëlle, Marques Antony
 * Let's Drop was created as a student project for 624-2 RIA course
 * from HES-SO Valais Wallis / BSc in Business Information Technology
 * Please give credit to us if you're using our code. THX!
 **/
class Drop {
  constructor(context, x, y, size, color) {
    this.context = context;
    this.dropReady = false;
    this.dropImage = new Image();
    this.centerX;
    this.centerY;
    this.x = x;
    this.y = y;
    this.width;
    this.height;
    this.size = size;
    this.color = color;
    this.speed = this.size * 30 + 60;
    this.interval = 0;
    this.canPress2Keys = true;
    this.factorWidth = 1;
    this.factorHeight = 1;
    this.isTouched = false;
    this.isColliding = false;

    this.dropImage.addEventListener("load", (event) => {
      if (event.defaultPrevented) {
        return; // Do nothing if event already handled
      }

      this.width = this.dropImage.width;
      this.height = this.dropImage.height;
      this.dropReady = true;

      // Consume the event so it doesn't get handled twice
      event.preventDefault();
    });
  }

  draw() {
    this.dropImage.src =
      "/624-2_RIA_Let-sDrop/ressources/images/game/Drop/DropSize" +
      this.size +
      this.color +
      ".png";

    if (this.dropReady) {
      this.context.drawImage(
        this.dropImage,
        this.x,
        this.y,
        this.width * this.factorWidth,
        this.height * this.factorHeight
      );
    }

    //Draw life
    this.drawLife();
  }

  update(secondsPassed) {
    this.interval += secondsPassed;

    //Documentation: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
    if (this.canPress2Keys) {
      if (Key.isDown(Key.UP)) {
        this.y -= this.speed * secondsPassed;
      }
      if (Key.isDown(Key.LEFT)) {
        this.x -= this.speed * secondsPassed;
      }
      if (Key.isDown(Key.DOWN)) {
        this.y += this.speed * secondsPassed;
      }
      if (Key.isDown(Key.RIGHT)) {
        this.x += this.speed * secondsPassed;
      }
    } else {
      //Only one key at the same time
      if (Key.isDown(Key.UP)) {
        this.y -= this.speed * secondsPassed;
      } else if (Key.isDown(Key.LEFT)) {
        this.x -= this.speed * secondsPassed;
      } else if (Key.isDown(Key.DOWN)) {
        this.y += this.speed * secondsPassed;
      } else if (Key.isDown(Key.RIGHT)) {
        this.x += this.speed * secondsPassed;
      }
    }
  }

  droppyLosesALife(blinkingSize) {
    //Store old size to blink
    let oldSize = this.size;

    this.positionDroppyFromCenter(blinkingSize);
    this.speed = 0;

    //Waiting 50ms before blinking at oldSize
    setTimeout(() => {
      this.positionDroppyFromCenter(oldSize);
    }, 50);

    //Waiting 50ms more before disappear
    setTimeout(() => {
      this.positionDroppyFromCenter(blinkingSize);
    }, 100);

    //Waiting 50ms more before blinking at oldSize
    setTimeout(() => {
      this.positionDroppyFromCenter(oldSize);
    }, 150);

    //Waiting 50ms more before disappear
    setTimeout(() => {
      this.positionDroppyFromCenter(blinkingSize);
    }, 200);

    //Waiting 50ms more before blinking at oldSize
    setTimeout(() => {
      this.positionDroppyFromCenter(oldSize);
    }, 250);

    //Waiting 50ms more before blinking at new size + reset speed
    setTimeout(() => {
      this.positionDroppyFromCenter(oldSize + 1);

      if (!this.isTouched) {
        this.speed = this.size * 30 + 60;
      } else {
        this.speed = 60;
      }
    }, 300);

    //Waiting 1000ms before Droppy can be touched again
    setTimeout(() => {
      this.isColliding = false;
    }, 1000);
  }

  droppyRetrievesALife(blinkingSize) {
    //Store old size to blink
    let oldSize = this.size;

    this.positionDroppyFromCenter(blinkingSize);
    this.speed = 0;

    //Waiting 50ms before blinking at oldSize
    setTimeout(() => {
      this.positionDroppyFromCenter(oldSize);
    }, 50);

    //Waiting 50ms more before disappear
    setTimeout(() => {
      this.positionDroppyFromCenter(blinkingSize);
    }, 100);

    //Waiting 50ms more before blinking at oldSize
    setTimeout(() => {
      this.positionDroppyFromCenter(oldSize);
    }, 150);

    //Waiting 50ms more before disappear
    setTimeout(() => {
      this.positionDroppyFromCenter(blinkingSize);
    }, 200);

    //Waiting 50ms more before blinking at oldSize
    setTimeout(() => {
      this.positionDroppyFromCenter(oldSize);
    }, 250);

    //Waiting 50ms more before blinking at new size + reset speed
    setTimeout(() => {
      this.positionDroppyFromCenter(oldSize - 1);
      if (!this.isTouched) {
        this.speed = this.size * 30 + 60;
      } else {
        this.speed = 60;
      }
    }, 300);

    //Waiting 1000ms before Droppy can be touched again
    setTimeout(() => {
      this.isColliding = false;
    }, 1000);
  }

  positionDroppyFromCenter(newSize) {
    this.centerX = this.x + (this.width * this.factorWidth) / 2;
    this.centerY = this.y + (this.height * this.factorHeight) / 2;
    this.size = newSize;

    switch (this.size) {
      case 4: //Smallest
        this.width = 28;
        this.height = 26;
        break;
      case 3:
        this.width = 28;
        this.height = 34;
        break;
      case 2:
        this.width = 33;
        this.height = 41;
        break;
      case 1:
        this.width = 42;
        this.height = 52;
        break;
      case 0: //Invisible
        this.width = 1;
        this.height = 1;
        break;
    }

    this.x = this.centerX - (this.width * this.factorWidth) / 2;
    this.y = this.centerY - (this.height * this.factorHeight) / 2;
  }

  changeColorAndBlink(thisGame) {
    let level = thisGame.level;
    let colorWhenTouched;

    switch (level) {
      case 1:
        colorWhenTouched = "green";
        break;
      case 2:
        colorWhenTouched = "white";
        break;
    }

    let oldSize = this.size;

    //Waiting 50ms before disappearing
    setTimeout(() => {
      this.color = colorWhenTouched;
      this.size = 0;
    }, 50);

    //Waiting 50ms more before blinking at oldSize
    setTimeout(() => {
      this.size = oldSize;
    }, 100);

    //Waiting 50ms more before disappearing
    setTimeout(() => {
      this.size = 0;
    }, 150);

    //Waiting 50ms more before blinking at oldSize
    setTimeout(() => {
      this.size = oldSize;
    }, 200);

    //Waiting 50ms more before disappearing
    setTimeout(() => {
      this.size = 0;
    }, 250);

    //Waiting 50ms more before retrieving his old size
    setTimeout(() => {
      this.size = oldSize;
    }, 300);

    //Waiting 1000ms before Droppy can be touched again
    setTimeout(() => {
      this.isColliding = false;
    }, 1000);

    //Waiting 3000ms before Droppy is blue again
    setTimeout(() => {
      this.color = "blue";
    }, 5000);
  }

  isUpsideDown() {
    this.upsideDownCommands();

    setTimeout(() => {
      this.normalCommands();
    }, 5000);
  }

  upsideDownCommands() {
    Key.DOWN = 38;
    Key.UP = 40;
    Key.LEFT = 39;
    Key.RIGHT = 37;
  }

  normalCommands() {
    Key.LEFT = 37;
    Key.UP = 38;
    Key.RIGHT = 39;
    Key.DOWN = 40;
  }

  slowDownSpeed() {
    this.speed = 60;
    this.isTouched = true; //to prevent loseALife or retrieveALife to change speed

    //Droppy's speed is back to normal again after 5 seconds
    setTimeout(() => {
      this.isTouched = false;
      this.speed = this.size * 30 + 60;
    }, 5000);
  }

  drawLife() {
    let lifeImage = new Image();

    lifeImage.src = "/624-2_RIA_Let-sDrop/ressources/images/game/Life.png";

    let destinationX = 890;
    let destinationY = 10;
    let cuttingX;
    let imageWidth = lifeImage.width;
    let imageHeight = lifeImage.height;

    //Depending on the number of lives, the image is cropped
    switch (this.size) {
      case 1:
        this.context.drawImage(lifeImage, destinationX, destinationY);
        break;
      case 2:
        cuttingX = 30;
        this.context.drawImage(
          lifeImage,
          cuttingX,
          0,
          imageWidth,
          imageHeight,
          destinationX + cuttingX,
          destinationY,
          imageWidth,
          imageHeight
        );
        break;
      case 3:
        cuttingX = 58;
        this.context.drawImage(
          lifeImage,
          cuttingX,
          0,
          imageWidth,
          imageHeight,
          destinationX + cuttingX,
          destinationY,
          imageWidth,
          imageHeight
        );
        break;
      case 4:
        cuttingX = 82;
        this.context.drawImage(
          lifeImage,
          cuttingX,
          0,
          imageWidth,
          imageHeight,
          destinationX + cuttingX,
          destinationY,
          imageWidth,
          imageHeight
        );
        break;
      default:
        break;
    }
  }
}

let Key = {
  pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,

  isDown: function (keyCode) {
    return this.pressed[keyCode];
  },

  onKeydown: function (event) {
    this.pressed[event.keyCode] = true;
  },

  onKeyup: function (event) {
    delete this.pressed[event.keyCode];
  },
};

window.addEventListener(
  "keyup",
  (event) => {
    Key.onKeyup(event);
  },
  false
);

window.addEventListener(
  "keydown",
  (event) => {
    Key.onKeydown(event);
  },
  false
);
