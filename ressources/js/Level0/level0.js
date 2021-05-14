class Level0{

    static createLevel(thisGame){

        thisGame.level = 0;
        let dropSize;
        
        //Background to start with
        document.getElementById('bg').style.backgroundImage = "url('/ressources/images/game/Level0/Level0.png')";

        //Droppies
        let drop1 = document.createElement('img');
        drop1.src = "/ressources/images/game/DropSize1blue.png";
        drop1.style.position = 'absolute';
        drop1.style.left = "440px" ;
        drop1.style.top = "355px" ;
        drop1.setAttribute('draggable', true);
        drop1.ondragstart = () => {
            drop1.style.opacity = '0';
            dropSize = 1 ;
        };
        drop1.ondragend = () => {
            drop1.style.opacity = '0.8';
            drop2.style.opacity = '1';
            drop3.style.opacity = '1';
            drop4.style.opacity = '1';
        };
        document.getElementById('bg').appendChild(drop1);
        
        let drop2 = document.createElement('img');
        drop2.src = "/ressources/images/game/DropSize2blue.png";
        drop2.style.position = 'absolute';
        drop2.style.left = "490px" ;
        drop2.style.top = "366px" ;
        drop2.setAttribute('draggable', true);
        drop2.ondragstart = () => {
            drop2.style.opacity = '0';
            dropSize = 2 ;
        };
        drop2.ondragend = () => {
            drop1.style.opacity = '1';
            drop2.style.opacity = '0.8';
            drop3.style.opacity = '1';
            drop4.style.opacity = '1';
        };
        document.getElementById('bg').appendChild(drop2);
        
        let drop3 = document.createElement('img');
        drop3.src = "/ressources/images/game/DropSize3blue.png";
        drop3.style.position = 'absolute';
        drop3.style.left = "532px" ;
        drop3.style.top = "374px" ;
        drop3.setAttribute('draggable', true);
        drop3.ondragstart = () => {
            drop3.style.opacity = '0';
            dropSize = 3 ;
        };
        drop3.ondragend = () => {
            drop1.style.opacity = '1';
            drop2.style.opacity = '1';
            drop3.style.opacity = '0.8';
            drop4.style.opacity = '1';
        };
        document.getElementById('bg').appendChild(drop3);

        let drop4 = document.createElement('img');
        drop4.src = "/ressources/images/game/DropSize4blue.png";
        drop4.style.position = 'absolute';
        drop4.style.left = "568px" ;
        drop4.style.top = "382px" ;
        drop4.setAttribute('draggable', true);
        drop4.ondragstart = () => {
            drop4.style.opacity = '0';
            dropSize = 4 ;
        };
        drop4.ondragend = () => {
            drop1.style.opacity = '1';
            drop2.style.opacity = '1';
            drop3.style.opacity = '1';
            drop4.style.opacity = '0.8';
        };
        document.getElementById('bg').appendChild(drop4);
        
        //DropZone
        let dropzone = document.getElementById("dropzone");
        //dropzone.style.left = thisGame.canvas.offsetLeft + 150 + "px";
        dropzone.ondragover = (e) => {
            e.preventDefault();
        };
        dropzone.ondrop = () => {
            this.launchGame(thisGame, dropSize);
        };
    }

    static launchGame(thisGame, dropSize) {
        thisGame.ready = true;
        thisGame.droppy = new Drop(thisGame.context, 0, 148, dropSize, "blue");
    }
}