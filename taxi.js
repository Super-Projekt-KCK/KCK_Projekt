var canvas; // canvas
var ctx; // context
var back = new Image(); // storage for new background piece
var oldBack; // storage for old background piece
var ship = new Image(); // ship
var shipX = 0; // current ship position X
var shipY = 0; // current ship position Y
var oldShipX = 0; // old ship position Y
var oldShipY = 0; // old ship position Y


// This function is called on page load.


function canvasAnimation() {
    globalPath.reverse();
    ship.src = taxiPath;
    canvas = document.getElementById("town");
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
    }
    gameLoop = setInterval(doGameLoop, 500);
}

function doGameLoop() {
    var elem;
    var mapX, mapY;
    elem = globalPath.pop();
    console.log(elem);
    if (elem != undefined) {
        var last = elem.join();
        var dot = last.indexOf(",");
        mapX = last.substring(0,dot);
        mapY = last.substring(dot+1);
        oldShipX = shipX;
        oldShipY = shipY;
        oldBack = back;
        shipX = last.substring(0, dot)* 50;
        shipY = last.substring(dot+1) * 50;
        back = ctx.getImageData(shipX, shipY, 50, 50);
        ctx.putImageData(oldBack, oldShipX, oldShipY);
        drawTaxi(ctx, shipX, shipY, mapX, mapY);
    }
    else {
        clearInterval(gameLoop);
    }
}
