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
                context.drawImage(road, i * 50, j * 50);
                road.src = roadPath;
            }
            if (world[j][i] == 2) {
                context.drawImage(cross2, i*50, j*50);
                cross2.src = crossPath2;
            }
        }
    }
}