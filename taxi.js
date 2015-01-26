var canvas; // canvas
var ctx; // context
var imgData; // storage for new background piece
var oldImgData; // storage for old background piece
var ship = new Image(); // ship
var shipX = 0; // current ship position X
var shipY = 0; // current ship position Y
var oldShipX = 0; // old ship position Y
var oldShipY = 0; // old ship position Y
// zrobić zmienną która będzie przechowywała aktualny poziom paliwa
//var fuel = 100; // poziom paliwa w %


// This function is called on page load.

/*function fuelreduce (howmuch) {
    fuel -= howmuch;
}*/

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
    if (elem != undefined /*&& fuel > 0*/) {
        var last = elem.join();
        var dot = last.indexOf(",");
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
        //fuelreduce(5);
        drawTaxi(ctx, mapX, mapY);
        drawFuelBar();
    }
    else {
        clearInterval(gameLoop);
	nextMove();
    }
}

function searchForPeople() {
    if (passengers.length > 0) {
        for (var i = 0; i < size; i++) {            //leci bez sensu po całej tablicy, trzeba to jakoś zmienić
            for (var j = 0; j < size; j++) {
                if (world[j][i] == 5) {
                    speak("I found a passenger on " + getStreetByCoords(i,j) + " street. ");
                    console.log("I found a passenger on " + getStreetByCoords(i,j) + " street. " + i + ", " + j);
                }
            }
        }
    }
    else {
        speak("There are no passengers left.");
    }
    console.log('-----------------------');
}
