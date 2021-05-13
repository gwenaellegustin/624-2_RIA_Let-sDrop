class Level0{

    

    static createLevel(thisGame){

        thisGame.level = 0;
        
        // Background to start with
        document.getElementById('bg').style.backgroundImage = "url('/ressources/images/game/Level0/Level0.png')";

        // Droppies
        let drop1 = document.createElement('img');
        drop1.src = "/ressources/images/game/DropSize1blue.png";
        drop1.style.position = 'absolute';
        drop1.style.left = "440px" ;
        drop1.style.top = "355px" ;
        drop1.setAttribute('draggable', true);
        drop1.ondragstart = function(e) {
            this.style.opacity = '0';
            //thisGame.dropSize = 1;
        };
        drop1.ondragend = function(e) {
            this.style.opacity = '0';
            thisGame.ready = true;
            
            //this.launchGame(thisGame, dropSize);
        };
        document.getElementById('bg').appendChild(drop1);
        
        let drop2 = document.createElement('img');
        drop2.src = "/ressources/images/game/DropSize2blue.png";
        drop2.style.position = 'absolute';
        drop2.style.left = "490px" ;
        drop2.style.top = "366px" ;
        drop2.setAttribute('draggable', true);
        document.getElementById('bg').appendChild(drop2);
        
        let drop3 = document.createElement('img');
        drop3.src = "/ressources/images/game/DropSize3blue.png";
        drop3.style.position = 'absolute';
        drop3.style.left = "532px" ;
        drop3.style.top = "374px" ;
        drop3.setAttribute('draggable', true);
        document.getElementById('bg').appendChild(drop3);

        let drop4 = document.createElement('img');
        drop4.src = "/ressources/images/game/DropSize4blue.png";
        drop4.style.position = 'absolute';
        drop4.style.left = "568px" ;
        drop4.style.top = "382px" ;
        drop4.setAttribute('draggable', true);
        document.getElementById('bg').appendChild(drop4);
        
        
        //DropZone
        let dropzone = document.getElementById("dropzone");
        dropzone.ondragover = function(e) {
            e.preventDefault();
        };
        dropzone.ondrop = function(e) {
            drop1.style.opacity = '0';
            drop2.style.opacity = '0';
            drop3.style.opacity = '0';
            drop4.style.opacity = '0';
        };

        thisGame.droppy = new Drop(thisGame.context, 0, 148, 1, "blue");
        
        

        /*function dragElement(elmnt) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            document.getElementById(elmnt.id).onmousedown = dragMouseDown;
          
            function dragMouseDown(e) {
              e = e || window.event;
              e.preventDefault();
              // get the mouse cursor position at startup:
              pos3 = e.clientX;
              pos4 = e.clientY;
              document.onmouseup = closeDragElement;
              // call a function whenever the cursor moves:
              document.onmousemove = elementDrag;
            }
          
            function elementDrag(e) {
              e = e || window.event;
              e.preventDefault();
              // calculate the new cursor position:
              pos1 = pos3 - e.clientX;
              pos2 = pos4 - e.clientY;
              pos3 = e.clientX;
              pos4 = e.clientY;
              // set the element's new position:
              elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
              elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
          
            function closeDragElement() {
              // stop moving when mouse button is released:
              document.onmouseup = null;
              document.onmousemove = null;
            }
          }*/

        /*thisGame.canvas.addEventListener('click', (event) => {
            if (
                // size of margin left + postion x in canva of start button
                event.x > canvas.offsetLeft + 150 &&
                // size of margin left + width of start button + width of start button
                event.x < canvas.offsetLeft + 150 + 690 && 
                // position y in canva of start button
                event.y > 415 && 
                // position y in canva of start button + height
                event.y < 415 + 135
            ) {
                thisGame.ready = true;
            }
        });*/

                
        
        /*thisGame.gameObjects = [
            new DropZone(thisGame.context)
            //new StartButton(thisGame.context) // used to test level change TODO: delete after drag and drop implement
        ];*/


        // used to test level change
        

        
        
    }

    launchGame(thisGame, dropSize) {
        thisGame.ready = true;
        thisGame.droppy = new Drop(thisGame.context, 0, 148, dropSize, "blue");
    }
}