var road = new Image();
var roadPath = 'images/road.png';

var turn = new Image();
var turnPath = 'images/turn.png';

var cross1 = new Image();
var crossPath1 = 'images/cross1.png';

var cross2 = new Image();
var crossPath2 = 'images/cross2.png';


function drawWorld(canvas) {
    var c = document.getElementById(canvas);
    var context = c.getContext("2d");
    context.clearRect(0,0,1000,1000);

    for (var i = 0; i < world.length; i++) {
        for (var j = 0; j < world[i].length; j++) {
            if (world[j][i] == 1) {
                if (!isVertical(j,i)) {
                    context.drawImage(road, i * 50, j * 50);
                    road.src = roadPath;
                }
            }
            if (world[j][i] == 2) {
                context.drawImage(cross2, i*50, j*50);
                cross2.src = crossPath2;
            }
        }
    }
    drawVertical(canvas, context);
}

function drawVertical(canvas, context) {
    for (var i = 0; i < world.length; i++) {
        for (var j = 0; j < world[i].length; j++) {
            if ( (world[j][i] == 1) && (isVertical(j,i)) ) {
                drawRotated(road, context, 90, i, j);
                road.src = roadPath;
            }
        }
    }
}

function drawRotated(image, context, deg, i,j) {
    context.save();
    context.translate(i*50,j*50);
    context.rotate(deg * Math.PI/180);
    context.translate(-i*50,-j*50);
    context.drawImage(image, i*50, j*50 - 50);            //nie wiem czemu -50
    context.restore();
}

function isVertical(i,j) {
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

