/**
 * Created by Mateusz on 17-10-2014.
 */

//tworzenie tablicy 2-wymiarowej
function createArray(x, y) {

    var map = new Array(x);
    for (var i = 0; i < x; i++) {
        map[i] = new Array(y);
    }
    return map;
}

var map = createArray(10,10);



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

function fillArray() {
    var temp;
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            if (Math.random() < 0.4)
                map[i][j] = 0;
            else
                map[i][j] = 1;
        }
    }
}

//należy założyć, że każde dwa kolejne wiersze łączą się w co najmniej jednym punkcie
//ten sam warunek dotyczy kolumn
//tylko, że robienie tego pętlami for będzie nieefektywne (dwie pętle for zagnieżdżone podwójnie)



function checkConnections() {
    if (checkRows() && checkColumns())
        return true;
    else
        return false;
}

//sprawdza czy kazde dwa kolejne wiersze maja punkt laczacy
function checkRows() {
    var innerGuard = false;
    //var outerGuard = false;
    for (var i = 1; i < map.length; i++) {
        innerGuard = false;
        for (var j = 0; j < map.length; j++) {
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

function checkColumns() {
    return true;
}
