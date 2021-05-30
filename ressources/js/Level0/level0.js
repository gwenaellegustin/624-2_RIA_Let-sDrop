class Level0{

    static createLevel(thisGame){

        thisGame.level = 0;
        let dropSize;
        
        //Background to start with
        document.getElementById('bg').style.backgroundImage = thisGame.bglevel0url ;

        //Draw help "?" margin, according to ininital width of window
        let marginCanvas = document.getElementById("canvas").offsetLeft;
        document.getElementById("help").style.marginLeft = `${marginCanvas + 955}px`; 
        //To work on all navigators, preventDefault() for prevent opening a drag and dropped file in a new tab
        window.addEventListener("dropover",function(e){
            e.preventDefault();
        },false);
        window.addEventListener("drop",function(e){
            e.preventDefault();
        },false);

        //Droppies
        let drop1 = document.getElementById("drop1");
        drop1.style.left = `${marginCanvas + 190}px` ;
        drop1.style.top = "355px" ;
        drop1.ondragstart = () => {
            drop1.style.opacity = '0.2';
            dropSize = 1 ;
        };
        drop1.ondragend = () => {
            drop1.style.opacity = '0.8';
            drop2.style.opacity = '1';
            drop3.style.opacity = '1';
            drop4.style.opacity = '1';
        };
        document.getElementById('bg').appendChild(drop1);
        
        let drop2 = document.getElementById("drop2");
        drop2.style.left = `${marginCanvas + 240}px` ;
        drop2.style.top = "366px" ;
        drop2.ondragstart = () => {
            drop2.style.opacity = '0.2';
            dropSize = 2 ;
        };
        drop2.ondragend = () => {
            drop1.style.opacity = '1';
            drop2.style.opacity = '0.8';
            drop3.style.opacity = '1';
            drop4.style.opacity = '1';
        };
        document.getElementById('bg').appendChild(drop2);
        
        let drop3 = document.getElementById("drop3");
        drop3.style.left = `${marginCanvas + 282}px` ;
        drop3.style.top = "374px" ;
        drop3.ondragstart = () => {
            drop3.style.opacity = '0.2';
            dropSize = 3 ;
        };
        drop3.ondragend = () => {
            drop1.style.opacity = '1';
            drop2.style.opacity = '1';
            drop3.style.opacity = '0.8';
            drop4.style.opacity = '1';
        };
        document.getElementById('bg').appendChild(drop3);

        let drop4 = document.getElementById("drop4");
        drop4.style.left = `${marginCanvas + 318}px` ;
        drop4.style.top = "382px" ;
        drop4.ondragstart = () => {
            drop4.style.opacity = '0.2';
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
        dropzone.ondragover = (e) => {
            e.preventDefault();
        };
        dropzone.ondrop = () => {
            this.launchGame(thisGame, dropSize);
        };

        thisGame.droppy = new Drop(thisGame.context, 0, 148, 4, "blue");
    }

    static launchGame(thisGame, dropSize) {
        thisGame.ready = true;
        thisGame.droppy = new Drop(thisGame.context, 0, 148, dropSize, "blue");
    }
}