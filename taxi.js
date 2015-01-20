var canvas; // canvas
var ctx; // context
var imgData; // storage for new background piece
var oldImgData; // storage for old background piece
var ship = new Image(); // ship
var shipX = 0; // current ship position X
var shipY = 0; // current ship position Y
var oldShipX = 0; // old ship position Y
var oldShipY = 0; // old ship position Y


// This function is called on page load.


function canvasAnimation() {
    ship.src = taxiPath;
    canvas = document.getElementById("town");
    speak("Okay.");
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
    }
    if (imgData != undefined)
        ctx.putImageData(imgData, shipX, shipY);
    //imgData = ctx.createImageData(50,50);

    gameLoop = setInterval(doGameLoop, 125);
}

function doGameLoop() {
    var elem;
    var mapX, mapY;
    elem = globalPath.pop();
    if (elem != undefined) {
        var last = elem.join();
        var dot = last.indexOf(",");
        mapX = last.substring(0,dot);
        mapY = last.substring(dot+1);
        oldShipX = shipX;
        oldShipY = shipY;
        pastPositionTaxiInArrayX = shipX/50;
        pastPositionTaxiInArrayY = shipY/50;
        oldImgData = imgData;
        shipX = last.substring(0, dot)* 50;
        shipY = last.substring(dot+1) * 50;
		mapX = shipX/50;
		mapY = shipY/50;
        positionTaxiInArrayX = shipX/50;
        positionTaxiInArrayY = shipY/50;
        imgData = ctx.getImageData(shipX, shipY, 50, 50);
        ctx.putImageData(oldImgData, oldShipX, oldShipY);
        drawTaxi(ctx, mapX, mapY);
    }
    else {
        clearInterval(gameLoop);
	nextMove();
    }
}
