class Level0{
    static createLevel(thisGame){
        thisGame.level = 0;
        document.getElementById('bg').style.backgroundImage = "url('/ressources/images/game/Level0/Level0.png')";
        thisGame.gameObjects = [
            new StartButton(thisGame.context) // used to test level change TODO: delete after drag and drop implement
        ];

        // used to test level change
        thisGame.canvas.addEventListener('click', (event) => {
            if (
                // size of margin left + postion x in canva of start button
                event.x > canvas.offsetLeft + 300 &&
                // size of margin left + with of start button + width of start button
                event.x < canvas.offsetLeft + 300 + 110 && 
                // position y in canva of start button
                event.y > 480 && 
                // position y in canva of start button + height
                event.y < 480 + 50
            ) {
                thisGame.ready = true;
            }
        });

        thisGame.droppy = new Drop(thisGame.context, 0, 148, 1, "blue");
    }
}