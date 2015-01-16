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

var taxi = new Image();
var taxiPath = 'images/taxi.png';


//--------------funkcje rysujace---------------------//

function initWorld() {
    readTextFile();
	clearStreets();
    readTextFile();
	makeGraph();
	drawGraph('graph');
    //console.log("init");
    //readTextFile();
	drawWorld('town');
    //readTextFile();
    imgData = undefined;
    oldImgData = undefined;
	//drawTaxiOnStart('town');
}

function drawWorld(canvas) {
    var c = document.getElementById(canvas);
    var context = c.getContext("2d");
    context.fillStyle = "#b3b3b3";
    context.clearRect(0, 0, 1000,1000);
    context.fillRect(0,0, 1000, 1000);

     for (var i = 0; i < world.length; i++) {
         for (var j = 0; j < world[i].length; j++) {
             drawRoads(context, j, i);
             drawCrossroads(context, j, i);
         }
    }

    writeStreetNames(context);
}

function drawRoads(context, j, i) {             //rysuje proste (poziom i pion)
            if (world[j][i] == 1) {
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
    console.log("graqphics.js: " + streetCoords.names);

                   //odwrotne indeksy w tabeli. probowalem to naprawic ale sie poddaje
    for (var i = 0; i < streetCoords[0].length; i++) {
        var text = streetCoords.names[i] + " St.";
        console.log("zapisuje: " + streetCoords.names[i]);
        var x = ((streetCoords[1][i] + streetCoords[3][i]) / 2)*50;
        var y = ((streetCoords[0][i] + streetCoords[2][i]) / 2)*50 + 18 ;
        context.fillText(text, x, y);
    }
}

function drawTaxi(context, mapX, mapY) {
	drawRotated(taxi, context, checkDirection(), mapX, mapY);
}

function drawTaxiOnStart(canvas) {
	var c = document.getElementById(canvas);
    var context = c.getContext("2d");
	drawRotated(taxi, context, 90, streetCoords[1][1], streetCoords[0][1]);
}


//---------------funkcje sprawdzające-------------------------//


function checkDirection() {				//sprawdza kierunek w ktorym jedzie taksa
	var checkY = positionTaxiInArrayY - pastPositionTaxiInArrayY;
	var checkX = positionTaxiInArrayX - pastPositionTaxiInArrayX;


    console.log("Pozycja X: " + positionTaxiInArrayX);
    console.log("Stara Pozycja X: " +pastPositionTaxiInArrayX);
    console.log("Pozycja Y: " + positionTaxiInArrayY);
    console.log("Stara Pozycja Y: " +pastPositionTaxiInArrayY);
	console.log("checkX: "+checkX);
	console.log("checkY: "+checkY);

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
			//console.log(i, j, "true");
            return true;
			}
        else {
		//console.log(i, j, "false");
            return false;
		}
    }
    else {
        if ((world[i][j-1] == 0) && (world[i][j+1] == 0) )  {
            //console.log(i,j, "true");
			return true;
        }
        else {
			//console.log(i, j, "false");
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
        //readTextFile();
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


