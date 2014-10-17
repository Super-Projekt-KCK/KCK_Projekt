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

var map = createArray(3,2);
//przykładowa tablica 3x2
map[0][0] = 123;
map[0][1] = 456;
map[1][0] = 2;
map[1][1] = 89;
map[2][0] = 67;
map[2][1] = 7316;


function printArray(name) {
    for (var i = 0; i < name.length; i++) {
        for (var j = 0; j < name[i].length + 1; j++) {
            document.getElementById(name).innerHTML += map[i][j] + " ";
        }
        document.getElementById(name).innerHTML += "<br>";
    }
}
