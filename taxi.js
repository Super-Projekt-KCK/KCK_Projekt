var canvas; // canvas
var ctx; // context
var imgData; // storage for new background piece
var oldImgData; // storage for old background piece
var ship = new Image(); // ship
var shipX = 0; // current ship position X
var shipY = 0; // current ship position Y
var oldShipX = 0; // old ship position Y
var oldShipY = 0; // old ship position Y
var maxTank = 200;
var tank = maxTank;

var free = true;
var passenger;
// zrobić zmienną która będzie przechowywała aktualny poziom paliwa
//var fuel = 100; // poziom paliwa w %


// This function is called on page load.

function fuelReduce (howmuch) {
    tank -= howmuch;
}

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
    if (tank!=0) {
        if (elem != undefined /*&& fuel > 0*/) {
            drawFuelBar(ctx);
            var last = elem.join();
            var dot = last.indexOf(",");
            oldShipX = shipX;
            oldShipY = shipY;
            pastPositionTaxiInArrayX = shipX / 50;
            pastPositionTaxiInArrayY = shipY / 50;
            oldImgData = imgData;
            shipX = last.substring(0, dot) * 50;
            shipY = last.substring(dot + 1) * 50;
            mapX = shipX / 50;
            mapY = shipY / 50;
            positionTaxiInArrayX = shipX / 50;
            positionTaxiInArrayY = shipY / 50;
            imgData = ctx.getImageData(shipX, shipY, 50, 50);
            ctx.putImageData(oldImgData, oldShipX, oldShipY);
            fuelReduce(1);
            drawTaxi(ctx, mapX, mapY);
            //drawFuelBar();
        }
        else {
            clearInterval(gameLoop);
            nextMove();
        }
    } else {
            speak("my fuel tank is empty");
        }
}


//-------------------------------pasażerowie--------------------------------------------------//

function checkPeople(i,j) {             //szuka ludka na konkretnych koordynatach
    if (world[i][j] == 5) {
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
    refreshMap("map");
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

function searchOnStreet() {
    var temp = getStreetByCoords(positionTaxiInArrayY, positionTaxiInArrayX);
    console.log(temp);
    for (var i = 0; i < passengers.length; i++) {
        if (passengers[i] != undefined) {
            var cords = passengers[i].getPosition();
            var street = getStreetByCoords(cords[1], cords[0]);
            console.log(street);
            if (street == temp) {
                console.log("found");
                speak("I found a passenger and I am going there.");
                showPath(cords[1],cords[0]);
                canvasAnimation();
                break;
            }
        }
    }
    speak("I didn't find anybody on this street.");
}

function takePassenger(person) {
    var canvas = document.getElementById("town");
    var context = canvas.getContext("2d");
    if (person != undefined) {
        if (free) {
            free = false;
            passenger = person;
            //imgData = person.getBackground();
            person.erase(person.getPosition(), getWorldMap());
            speak("The passenger wants to go to " + person.destinationStreet + " street.");
            //drawTaxi(context, positionTaxiInArrayX, positionTaxiInArrayY);
        }
        else {
            speak ("I am busy now.");
        }
    }
    else {
        speak("There aren't any passengers I can take.");
    }
}

function dropPassenger() {
    var canvas = document.getElementById("town");
    var context = canvas.getContext("2d");
    if (passenger != undefined) {
        if (checkDestination(passenger)) {
            free = true;
            passenger.setPosition(passenger.getDestination().reverse());          //nie wiem czemu reverse :(
            passenger.setBackground(context.getImageData(passenger.destinationArray[0] * 50, passenger.destinationArray[1] * 50, 50, 50));
            //imgData = passenger.getBackground();

            var tempArray;
            tempArray = passenger.getPosition();
            if (world[tempArray[1]][tempArray[0]] == 1) {
                if (isVertical(tempArray[0], tempArray[1]))
                    tempArray[1] += 1;
                else
                    tempArray[0] += 1;
            }
            else {
                tempArray[0] += 1;
                tempArray[1] += 1;
            }
            passenger.setPosition(tempArray);
            passenger.draw();
            //passengers[person.arrayId] = undefined;                             //usuwa ludka z tablicy i przesuwa indeks
            passengers[passengers.length - 1].arrayId = passenger.arrayId;
            passengers[passenger.arrayId] = passengers[passenger.length - 1];
            passengers.length--;
            pIndex--;
            speak("Passenger dropped.");
            passenger = undefined;
        }

        else {
            speak("This is not the destination street.");
        }
    }
    else {
        speak("I haven't any passengers inside.");
    }
}

function checkDestination(person) {
    var temp = getStreetByCoords(positionTaxiInArrayY,positionTaxiInArrayX);
    if (temp == person.destinationStreet)
        return true;
    else
        return false;
}


/*function drivePassenger() {
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

}*/
