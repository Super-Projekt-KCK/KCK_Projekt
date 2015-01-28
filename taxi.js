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
        //drawFuelBar();
    }
    else {
        clearInterval(gameLoop);
	nextMove();
    }
}


//-------------------------------pasażerowie--------------------------------------------------//

function checkPeople(j,i) {             //szuka ludka na konkretnych koordynatach
    if (world[j][i] == 5) {
        var temp = getStreetByCoords(i,j);
        if (temp == "" ) {
            speak("Passenger is not on the street.");
            return false;
        }
        else {
            speak("I found a passenger on " + temp + " street. ");
            console.log("I found a passenger on " + temp + " street. " + i + ", " + j);
            return true;
        }
    }
}

//czasem źle działa bo a* zamienia mapę na jedynki
function searchForPeople() {                //szuka ludków po całej mapie
    if (passengers.length > 0) {
        console.log(pIndex);
        console.log(passengers);
        for (var i = 0; i < size; i++) {            //leci bez sensu po całej tablicy, trzeba to jakoś zmienić
            for (var j = 0; j < size; j++) {
                checkPeople(j, i);
            }
        }
    }
    else {
        speak("There are no passengers left.");
    }
    console.log('-----------------------');
}

function takePassenger(person, context) {
    imgData = person.getBackground();
    drawTaxi(context, positionTaxiInArrayX, positionTaxiInArrayY);
}

function dropPassenger(person, context) {
    /*
        sekwencja:
        podjedź na miejsce (nie ta funkcja)
        zamień tło ludka na tło taksy (żeby po zmazaniu była tylko droga)
        narysuj ludka (ew. kratkę niżej, albo coś)
        narysuj taksę (żeby była nad pasażerem)
        usuń referencję ludka z tablicy
        czekaj na następny rozkaz, ludek w sumie sam się zmaże (oby)
    */

    //if pozycja taksy == pozycja pampera to draw

    //*if (person.position[0] == positionTaxiInArrayX && person.position[1] == positionTaxiInArrayY) {
        //person.setBackground(imgData);
        person.setPosition(person.getDestination().reverse());          //nie wiem czemu reverse :(
        person.setBackground(context.getImageData(person.destinationArray[0]*50,person.destinationArray[1]*50,50,50));
        imgData = person.getBackground();
        //konflikt z person.draw - tło które zapamięta wcześniej jest nadpisywane przez draw

        var tempArray;
        tempArray = person.getPosition();
        if (isVertical(tempArray[0],tempArray[1]))
            tempArray[1] += 1;
        else
            tempArray[0] += 1;
        person.setPosition(tempArray);
        person.draw();
        //drawTaxi(context, positionTaxiInArrayX, positionTaxiInArrayY);
        passengers[person.arrayId] = undefined;                             //usuwa ludka z tablicy i przesuwa indeks
        passengers[passengers.length-1].arrayId = person.arrayId;
        passengers[person.arrayId] = passengers[passengers.length-1];
        passengers.length--;
        pIndex--;
        //setTimeout(person.erase(person.getPosition()), 3000);

        speak("Passenger dropped.");
    //*/}
}


function drivePassenger() {
    var person;
    var dest = Array();
    var canvas = document.getElementById("town");
    var context = canvas.getContext("2d");
    person = identify(positionTaxiInArrayX, positionTaxiInArrayY);
    if (person != undefined) {
        dest = person.getDestination();
        console.log("Destination: " + dest);
        takePassenger(person, context);
        showPath(dest[0], dest[1]);
        canvasAnimation();
        dropPassenger(person, context);
    }
    else {
        speak("There aren't any passengers here. ");
    }

}
