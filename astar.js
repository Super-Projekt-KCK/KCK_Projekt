function showPath() {
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

	// pobranie koordynatow poczatku i konca sciezki
	var oCoor1x = document.getElementById("coor1x");
    var oCoor1y = document.getElementById("coor1y");
	var oCoor2x = document.getElementById("coor2x");
    var oCoor2y = document.getElementById("coor2y"); 
    
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
	var path = finder.findPath(oCoor1x.value, oCoor1y.value, oCoor2x.value, oCoor2y.value, grid);
   
    // kolorowanie drogi na czerwone "2" (w przyszlosci niepotrzebny kod) - tylko do wizualizacji tymczasowej	
	var elem;
	
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
    
}

