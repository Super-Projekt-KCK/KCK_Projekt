//tworzenie tablicy 2-wymiarowej
function createArray(x, y) {

    var map = new Array(x);
    for (var i = 0; i < x; i++) {
        map[i] = new Array(y);
    }
    return map;
}


var points = 10;                        //liczba wierzchołków grafu
var maxEdges = 15;          //max liczba krawędzi
var map = createArray(points,points);



function printArray(name) {
    fillArray();
    document.getElementById(name).innerHTML = "";
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            if (map[i][j] == 1)
                document.getElementById(name).innerHTML += "<b>" + map[i][j]+ "</b> ";
            else
                document.getElementById(name).innerHTML += map[i][j]+ " ";
        }
        document.getElementById(name).innerHTML += "<br>";
    }
}

//macierz sąsiedztwa dla grafu z x wierzchołkami

function fillArray() {
    var edges = 0;
    var sum = 0;
    for (var i = 0; i < map.length; i++) {
        for (var j = i+1; j < map[i].length; j++) {
            if ((Math.random() < 0.6) || (edges >= maxEdges)) {
                map[i][j] = 0;
                map[j][i] = 0;
            }
            else {
                map[i][j] = 1;
                map[j][i] = 1;
                edges++;
            }
        }
        map[i][i] = 0;
        checkDegree(i);             //sprawdzanie czy są sąsiedzi
    }

}

function checkDegree(i) {                           //sprawdza stopień wierzchołka (jeśli 0 to losowo dodaje sąsiada)
    var deg = 0;
    for (var j = 0; j < map[i].length; j++) {
        if (map[i][j] == 1) {
            deg++;
        }
    }
    if (deg == 0) {
        do {
            var rand = Math.floor(Math.random() * 10);
        } while (rand == i);
        map[i][rand] = 1;
        map[rand][i] = 1;
    }
}

var coords = createArray(2, map.length);        //współrzędne wierzchołków grafu na canvas
var width = 500;            //szerokość i wysokość canvas
var height = 300;

function makeGraph() {
    document.getElementById("coords").innerHTML = "";
    for (var i = 0; i < map.length; i++) {            //losowanie współrzędnych grafu
        do {
            coords[0][i] = Math.floor(Math.random() * width / 20) * 20;
            coords[1][i] = Math.floor(Math.random() * height / 20) * 20;
            document.getElementById("coords").innerHTML += coords[0][i] + "," + coords[1][i] + " ";
        } while (!((coords[0][i] > 0) && (coords[1][i] > 0)));
    }

}

function drawGraph (canvas, array) {
    var c = document.getElementById(canvas);
    var context = c.getContext("2d");

    context.clearRect(0,0,width,height);
    printArray(array);
    makeGraph();
    context.fillStyle = "#000000";
    drawPoints(context);
    drawEdges(context);



}

function drawPoints(context) {
    //rysowanie punktów na canvas
    for (var i = 0; i < map.length; i++) {
        context.beginPath();
        context.arc(coords[0][i], coords[1][i], 2, 0, 2*Math.PI);
        context.closePath();
        context.font = "10px Arial";
        context.fillText("v"+i,coords[0][i] - 5,coords[1][i] - 5);
        context.fill();
        context.stroke();
    }
}

function drawEdges(context) {
    //rysowanie linii między punktami
    for (var i = 0; i < map.length; i++) {
        for (var j = i+1; j < map[i].length; j++) {
            if (map[i][j] == 1) {
                context.moveTo(coords[0][i],coords[1][i]);
                context.lineTo(coords[0][i],coords[1][j]);
                context.lineTo(coords[0][j], coords[1][j]);
                context.stroke();
            }
        }
    }
}






















//należy założyć, że każde dwa kolejne wiersze łączą się w co najmniej jednym punkcie
//ten sam warunek dotyczy kolumn
//tylko, że robienie tego pętlami for będzie nieefektywne (dwie pętle for zagnieżdżone podwójnie)



/*function checkConnections() {
 if (checkRows() && checkColumns())
 return true;
 else
 return false;

//sprawdza czy kazde dwa kolejne wiersze maja punkt laczacy (bez sensu)
/*(function checkRows() {
    var innerGuard = false;
    var temp = 0;
    //var outerGuard = false;
    for (var i = 1; i < map.length; i++) {
        innerGuard = false;
        //if (!checkRow(i)) {
            temp = Math.floor(Math.random()) * map.length;
            map[i][temp] = 1;

        }
    //}

       /* for (var j = 0; j < map.length; j++) {
            if (map[i][j] == map[i - 1][j]) {
                innerGuard = true;
                break;
            }
        }
            if (!innerGuard) {
                return false;
            }
        }
    return true;
}

function checkRow(i) {
    for (var j = 0; j < map.length; j++) {
        if (map[i][j] == map[i - 1][j]) {
            return true;
        }
    }
    return false;
}
function checkColumns() {
    return true;
}
*/

