function createArray(x, y) {

    var map = new Array(x);
    for (var i = 0; i < x; i++) {
        map[i] = new Array(y);
    }
    return map;
}


var points = 10;                                //liczba wierzchołków grafu
var maxEdges = 30;                              //max liczba krawędzi
var map = createArray(points,points);

var edges = createArray(maxEdges,3);
var size = 20;	
var world = createArray(size,size);

var positionTaxiInArrayX;
var positionTaxiInArrayY;
var pastPositionTaxiInArrayX;
var pastPositionTaxiInArrayY;





/*
    -------------------CO NA MAPIE-----------------------------

    0 - pustka
    1 - droga prosta
    2 - krzyżówki
    3 - ?
    4 - ?
    5 - pasażer
 */

//macierz sąsiedztwa dla grafu z x wierzchołkami
function fillArray() {
    var edges = 0;
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

var coords = createArray(2, map.length);                    //współrzędne wierzchołków grafu na canvas
var width = 200;                                            //szerokość i wysokość canvas
var height = 200;

function makeGraph() {
    fillArray();
    document.getElementById("coords").innerHTML = "";
    for (var i = 0; i < map.length; i++) {                  //losowanie współrzędnych grafu
        coords[0][i] = Math.floor(Math.random() * width / 20) * 20;
        coords[1][i] = Math.floor(Math.random() * height / 20) * 20;
    }

}


function drawGraph (canvas) {
    var c = document.getElementById(canvas);
    var context = c.getContext("2d");
    context.clearRect(0,0,width,height);
    context.fillStyle = "#000000";
    drawPoints(context);
    drawEdges(context);
	printWorld("map");


}

function drawPoints(context) {
    //rysowanie punktów na canvas
    for (var i = 0; i < map.length; i++) {
        context.beginPath();
        context.arc(coords[0][i], coords[1][i], 5, 0, 2*Math.PI);
        context.closePath();
        context.font = "10px Arial";
        context.fillText("v"+i,coords[0][i] - 10,coords[1][i] - 10);
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


// rysowanie swiata


function printWorld(name) {
    // zerowanie tablicy
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            world[i][j] = 0;
        }
    }

    //nanoszenie wierzcholkow grafu (jako jedynek)

    for (i = 0; i < points; i++) {
        world[coords[1][i] / 10][coords[0][i] / 10] = 1;
    }

    var count = 1;

    //tworzenie prostopadlych polaczen miedzy wierzcholkami

    for (var i = 0; i < map.length; i++) {
        for (var j = i + 1; j < map[i].length; j++) {
            if (map[i][j] == 1) {

                var coords0t1 = coords[0][i];
                var coords1t1 = coords[1][i];
                var coords0t2 = coords[0][j];
                var coords1t2 = coords[1][j];
                if (coords0t1 > coords0t2) {
                        while((coords0t1)!=(coords0t2)) {
                            world[coords1t2 / 10][(coords0t2 + 10) / 10] = 1;
                            coords0t2 += 10;
                    }
                } else {
                    while ((coords0t1) != (coords0t2)) {
                        world[coords1t2 / 10][(coords0t2 - 10) / 10] = 1;
                        coords0t2 -= 10;
                    }
                }

                if (coords1t1 > coords1t2) {
                    while ((coords1t1) != (coords1t2)) {
                        world[(coords1t2 + 10) / 10][(coords0t2) / 10] = 1;
                        coords1t2 += 10;
                    }
                } else {
                    while ((coords1t1) != (coords1t2)) {
                        world[(coords1t2 - 10) / 10][(coords0t2) / 10] = 1;
                        coords1t2 -= 10;
                    }
                }
            }

        }
    }
    roadsNaming();
    refreshMap(name);
}

function refreshMap(name) {
	//wyswietlenie grafu i pogrubienie jedynek
 
    document.getElementById(name).innerHTML = "";
    for (var i = 0; i < world.length; i++) {		
        for (var j = 0; j < world[i].length; j++) {
            if (world[i][j] != 0)
                document.getElementById(name).innerHTML += "<b>" + world[i][j]+ "</b> ";
            else
                document.getElementById(name).innerHTML += " " + world[i][j]+ " ";
        }
        document.getElementById(name).innerHTML += "<br>";
    }
    
}

// dlugosc i nazwy drog plus zamiana jedynek na dwojki
function roadsNaming() {
		
	document.getElementById("roads").innerHTML = "";
	// liczenie dlugosci drog w poziomie
    var street = 0;
	for (var i=0; i<size; i++) {
		
		var count = 0;
		var check = false;

		for (var j=0; j<size; j++) {
            crossroad(i,j);
			if (world[i][j]!=0 && world[i][j+1]!=0 && count==0) {
				count++;
                streetCoords[0][street] = i;
                streetCoords[1][street] = j;
			} else if (world[i][j]!=0 && world[i][j+1]!=0) {
				count++;
			} else if (world[i][j]!=0 && world[i][j+1]==0 && check==false && count!=0) {
                streetCoords[2][street] = i;
                streetCoords[3][street] = j;
				check=true;
			}
			
		}

	    positionTaxiInArrayX = streetCoords[1][1];
	    positionTaxiInArrayY = streetCoords[0][1];
		
		if (count!=0) {
			count++;
            assignStreet(street);
            document.getElementById("roads").innerHTML += streetCoords.names[street] + ": początek: " + streetCoords[0][street] + "," + streetCoords[1][street] + " koniec: " + streetCoords[2][street] +"," + streetCoords[3][street] + ", dlugosc: " + count + "<br>";
            world[streetCoords[0][street]][streetCoords[1][street]] = 2;
            world[streetCoords[2][street]][streetCoords[3][street]] = 2;
            street++;
		}
	}
	//liczenie dlugosc drog w pionie
	for (var i=0; i<size; i++) {
		
		var count = 0;
		var check = false;
		
		for (var j=0; j<size; j++) {
			if (world[j][i]!=0 && world[j+1][i]!=0 && count==0) {
				count++;
                streetCoords[0][street] = j;
                streetCoords[1][street] = i;
			} else if (world[j][i]!=0 && world[j+1][i]!=0) {
				count++;
			} else if (world[j][i]!=0 && world[j+1][i]==0 && check==false && count!=0) {
                streetCoords[2][street] = j;
                streetCoords[3][street] = i;
                check = true;
            }

		}
		
		if (count!=0) {
			count++;
            assignStreet(street);
            document.getElementById("roads").innerHTML += streetCoords.names[street] + ": początek: " + streetCoords[0][street] + "," + streetCoords[1][street] + " koniec: " + streetCoords[2][street] +"," + streetCoords[3][street] + ", dlugosc: " + count + "<br>";
            world[streetCoords[0][street]][streetCoords[1][street]] = 2;
            world[streetCoords[2][street]][streetCoords[3][street]] = 2;
            streetCount = street+1;

            street++;
        }
	}
}


//sprawdza czy krzyżówka
function crossroad(i,j) {
    if (i > 0 && j > 0) {
        if ((world[i][j] != 0) && (world[i - 1][j] != 0) && (world[i + 1][j] != 0) && (world[i][j + 1] != 0) && (world[i][j - 1] != 0)) {
            world[i][j] = 2;
        }
    }
}

//zwraca mape swiata
function getWorldMap() {
    return world;
}
