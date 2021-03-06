//------------------zmienne obrazkowe--------------//

var road = new Image();
var roadPath = 'images/road.png';

var turn = new Image();
var turnPath = 'images/turn.png';

var cross1 = new Image();
var crossPath1 = 'images/cross1.png';

var cross2 = new Image();
var crossPath2 = 'images/cross2.png';

var end  = new Image();
var endPath = 'images/end.png';

var gas = new Image();
var gasPath = 'images/gas.png';

var taxi = new Image();
var taxiPath = 'images/taxi.png';


//--------------funkcje rysujace---------------------//

function initWorld() {
    clearPeople();
	clearStreets();
    readTextFile();
	makeGraph();
	drawGraph('graph');
    setGasStations();
	drawWorld('town');
    imgData = undefined;
    oldImgData = undefined;
    speak("Elvis is back in town");
}

function drawWorld(canvas) {
    var c = document.getElementById(canvas);
    var context = c.getContext("2d");
    context.fillStyle = "#b3b3b3";
    context.clearRect(0, 0, 1000,1000);
    context.fillRect(0,0, 1000, 1000);
    drawFuelBar(context);
     for (var i = 0; i < world.length; i++) {
         for (var j = 0; j < world[i].length; j++) {
             drawRoads(context, j, i);
             drawCrossroads(context, j, i);
             drawGasStations(context, j, i);
         }
    }

    writeStreetNames(context);
}

function drawRoads(context, j, i) {             //rysuje proste (poziom i pion)
            if (world[j][i] == 1 || world[j][i] == 3) {
                if (!isVertical(j,i)) {
                    context.drawImage(road, i * 50, j * 50);
                }
                else {
                    drawRotated(road, context, 90, i, j);
                }
            }
}

function drawCrossroads(context, j, i) {                //rysuje krzyżówki
    if (world[j][i] == 2) {
        checkNeighbors(context, j,i);
    }
}

function drawGasStations(context, j, i) {
    if (world[j][i] == 3) {
        context.drawImage(gas, i*50, j*50);
    }
}

//WSKAŹNIK PALIWA
function drawFuelBar (context)
{
    context.clearRect(975,235,20,-maxTank);
    context.fillStyle = "#ff0000";
    context.font = "18px Arial";
    context.fillText("FUEL", 950, 25);
    context.fillRect(975,235,20,-tank);



}

function drawRotated(image, context, deg, i,j) {            //rysuje obrócony obrazek
    context.save();
    context.translate(i*50,j*50);
    context.translate(image.width/2, image.height/2)
    context.rotate(deg * Math.PI/180);
    context.drawImage(image, -image.width/2, -image.height/2);

    context.restore();
}

function writeStreetNames(context) {
    context.fillStyle = "#000000";
    context.font = "18px Arial";

    //odwrotne indeksy w tabeli. probowalem to naprawic ale sie poddaje
    for (var i = 0; i < streetCoords[0].length; i++) {
        var text = streetCoords.names[i] + " St.";
        var x = ((streetCoords[1][i] + streetCoords[3][i]) / 2)*50;
        var y = ((streetCoords[0][i] + streetCoords[2][i]) / 2)*50 + 18 ;
        context.fillText(text, x, y);
    }
}

function drawTaxi(context, mapX, mapY) {
	drawRotated(taxi, context, checkTaxiDirection(), mapX, mapY);
}

function drawTaxiOnStart(canvas) {
	var c = document.getElementById(canvas);
    var context = c.getContext("2d");
	drawRotated(taxi, context, 90, streetCoords[1][1], streetCoords[0][1]);
}

function setGasStations() {
    var c = document.getElementById("town");
    var context = c.getContext("2d");
    for (var i = 0; i < 3; i++) {        //liczba stacji
        var temp, tempArray;
        do {
            temp = Math.floor(Math.random() * streetCoords.names.length);
            tempArray = getMiddle(temp);
        } while(world[tempArray[0]][tempArray[1]] == 2);

        world[tempArray[0]][tempArray[1]] = 3;
    }
    refreshMap("map");
}



//---------------funkcje sprawdzające-------------------------//


function checkTaxiDirection() {				//sprawdza kierunek w ktorym jedzie taksa
	var checkY = positionTaxiInArrayY - pastPositionTaxiInArrayY;
	var checkX = positionTaxiInArrayX - pastPositionTaxiInArrayX;

    switch (checkY) {
        case 1:
            return 180;
        case -1:
            return 0;
        default:
            break;
    }

    switch (checkX) {
        case 1:
            return 90;
        case -1:
            return 270;

    }
}

function isVertical(i,j) {              //sprawdza czy droga jest pionowa
    if (j == 0) {
        if (world[i][j+1] == 0) {
            return true;
			}
        else {
            return false;
		}
    }
    else {
        if ((world[i][j-1] == 0) && (world[i][j+1] == 0) )  {
			return true;
        }
        else {
            return false;
			}
    }
}

function checkNeighbors(context, j, i) {
    var neighbors = 0;
    var up = false;               //okresla czy istnieje sasiad
    var down = false;
    var left = false;
    var right = false;

    if (j > 0)
        if (world[j - 1][i] == 1) {
            up = true;
            neighbors++;
        }
    if (j < size)
        if (world[j + 1][i] == 1) {
            down = true;
            neighbors++;
        }
    if (i > 0)
        if (world[j][i - 1] == 1) {
            left = true;
            neighbors++;
        }
    if (i < size)
        if (world[j][i + 1] == 1) {
            right = true;
            neighbors++;
        }

    switch (neighbors) {
        case 1:
            rotateEnd(context, i, j, up, down, left, right);
            break;
        case 2:
            rotateTurn(context, i, j, up, down, left, right);
            turn.src = turnPath;
            break;
        case 3:
            rotateCross(context, i, j, up, down, left, right);
            break;
        case 4:
            context.drawImage(cross2, i*50, j*50);
            break;
    }

}



function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}


//-------------------------------obracanie krzyzowek-------------------------//

function rotateEnd(context, i, j, up, down, left, right) {
    if (left) {
        context.drawImage(end, i*50, j*50);
    }
    if (right) {
        drawRotated(end, context, 180, i, j);
    }
    if (up) {
        drawRotated(end, context, 90, i, j);
    }
    if (down) {
        drawRotated(end, context, 270, i, j);
    }
}

function rotateTurn(context, i, j, up, down, left, right) {
    if (right && down) {
        context.drawImage(turn, i*50, j*50);
    }
    if (left && down) {
        drawRotated(turn, context, 90, i, j);
    }
    if (left && up) {
        drawRotated(turn, context, 180, i, j);
    }
    if (up && right) {
        drawRotated(turn, context, 270, i, j);
    }
}

function rotateCross(context, i, j, up, down, left, right) {
    if (up && left && right) {
        context.drawImage(cross1, i*50, j*50);
    }
    if (up && right && down) {
        drawRotated(cross1, context, 90, i, j);
    }
    if (right && down && left) {
        drawRotated(cross1, context, 180, i, j);
    }
    if (down && left && up) {
        drawRotated(cross1, context, 270, i, j);
    }
}


//--------------------------preload obrazkow-----------------------//

function preloader() {
    if (document.images) {
        road.src = roadPath;
        turn.src = turnPath;
        cross1.src = crossPath1;
        cross2.src = crossPath2;
        taxi.src = taxiPath;
        end.src = endPath;
        gas.src = gasPath;
    }
}
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
addLoadEvent(preloader);


