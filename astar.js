var globalPath;


function showPath(targetY, targetX) {
	// zamiana 0 na 1 i odwrotnie (w algorymie a* przeszkody traktowane jako 1 a droga jako 0 (odwrotnie niz w naszej tablicy)
    var matrix = getWorldMap();
    for (var i=0; i<matrix.length; i++) {
		for (var j=0; j<matrix.length; j++) {
			if (matrix[i][j]==0) {
				matrix[i][j]=1;
			} else {
				matrix[i][j]=0;
			}
		}
	}

    
    // tworzenie tablicy zero jedynkowej i wyszukanie sciezki algorytmem a*
    var grid = new PF.Grid(20, 20, matrix);

	for (var i=0; i<matrix.length; i++) {
		for (var j=0; j<matrix.length; j++) {
			if (matrix[i][j]==1) {
				matrix[i][j]=0;
			} else {
				matrix[i][j]=1;
			}
		}
	}

    var finder = new PF.AStarFinder();

    console.log(world[targetY][targetX]);

    if (targetX<0 || targetX>19 || targetY<0 || targetY>19) throw "coords";
    if (world[targetY][targetX]==0) throw "coords";

    
    
    document.getElementById("taxiMan").value = "I'am going to " + targetY + " " + targetX;		
    var path = finder.findPath(positionTaxiInArrayX, positionTaxiInArrayY, targetX, targetY, grid);

    globalPath = path;
    //ustawienie biezacej pozycji taksowki w tablicy i poprzedniej pozycji
    var elem = globalPath[globalPath.length-1];
    var mapX, mapY;
    if (elem != undefined) {
        var last = elem.join();
        var dot = last.indexOf(",");
        mapX = last.substring(0,dot);
        mapY = last.substring(dot+1);
	positionTaxiInArrayX = mapX;
	positionTaxiInArrayY = mapY;
    }

    elem = globalPath[globalPath.length-2];
    if (elem != undefined) {
        var last = elem.join();
        var dot = last.indexOf(",");
        mapX = last.substring(0,dot);
        mapY = last.substring(dot+1);
	pastPositionTaxiInArrayX = mapX;
	pastPositionTaxiInArrayY = mapY;
    }

    console.log(pastPositionTaxiInArrayX, pastPositionTaxiInArrayY);
    console.log(positionTaxiInArrayX, positionTaxiInArrayY);
    
    
    globalPath.reverse();
    
    // kolorowanie drogi na czerwone "2" (w przyszlosci niepotrzebny kod) - tylko do wizualizacji tymczasowej	
/*	var elem;
	
    while (elem = path.pop()) {
	    var last = elem.join();
	    var dot = last.indexOf(",");
	    world[last.substring(dot+1)][last.substring(0, dot)]=2		
    }


    document.getElementById("map").innerHTML = "";
    for (var i = 0; i < world.length; i++) {		
        for (var j = 0; j < world[i].length; j++) {
            if (world[i][j] == 1)
                document.getElementById("map").innerHTML += "<b>" + world[i][j]+ "</b> ";
            else if (world[i][j] == 2)
                document.getElementById("map").innerHTML += " <font color=red>" + world[i][j]+ "</font> ";
            else
                document.getElementById("map").innerHTML += " " + world[i][j]+ " ";
        }
        document.getElementById("map").innerHTML += "<br>";
    }
  */  
}

