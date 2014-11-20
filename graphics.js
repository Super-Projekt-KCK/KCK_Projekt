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


//--------------funkcje rysujace---------------------//

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



//---------------funkcje sprawdzające-------------------------//

function isVertical(i,j) {              //sprawdza czy droga jest pionowa
    if (j == 0) {
        if (world[i][j+1] == 0)
            return true;
        else
            return false;
    }
    else {
        if ((world[i][j-1] == 0) && (world[i][j+1] == 0) )  {
            console.log("pion");
            return true;
        }
        else
            return false;
    }
}

function checkNeighbors(context, j, i) {
    var neighbors = 0;
    var up = false               //okresla czy istnieje sasiad
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
        end.src = endPath;
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