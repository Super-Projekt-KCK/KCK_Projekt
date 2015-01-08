function action() {

    var input = document.getElementById("kolejka");
    
    var commands = String(input.value);
 
    var command = "";
    
    for (var i=0; i<commands.length; i++) {
	command += commands[i];

	if (commands[i]==" ") {
	    command = "";
	} else if (command=="go") {


	    var tempX="";
	    var tempY="";
	    var j = i;
	    while (commands[j+2]!=" ") {
		tempX+=commands[j+2];
		j++;
	    }
	    console.log(j, commands.length, commands[j+3]);
	    while (j+3<commands.length) {
		tempY+=commands[j+3];
		j++;
	    }
	    showPath(Number(tempX), Number(tempY));
	    canvasAnimation();
	} else if (command=="left") {
	    checkDirection(command);
	    command = "";
	} else if (command=="right") {
	    checkDirection(command);
	    command = "";
	}

    }
    

}


function checkDirection(direction) {
	if (pastPositionTaxiInArrayX==positionTaxiInArrayX) { 
	    if (pastPositionTaxiInArrayY > positionTaxiInArrayY) {
		if (direction=="left") {
		    
		    var tempX=Number(positionTaxiInArrayX);
		    var tempY=Number(positionTaxiInArrayY);
		    while (world[tempY][tempX-1]!=1) {
			tempY=tempY-1;
		    }
		    showPath(Number(tempY), Number(tempX-1));
		    canvasAnimation();		    

		} else if (direction=="right") {

		    var tempX=Number(positionTaxiInArrayX);
		    var tempY=Number(positionTaxiInArrayY);
		    while (world[tempY][tempX+1]!=1) {
			tempY=tempY-1;
		    }
		    showPath(Number(tempY), Number(tempX+1));
		    canvasAnimation();

		}
	    } else {
		if (direction=="left") {

		    var tempX=Number(positionTaxiInArrayX);
		    var tempY=Number(positionTaxiInArrayY);
		    while (world[tempY][tempX+1]!=1) {
			tempY=tempY+1;
		    }
		    showPath(Number(tempY), Number(tempX+1));
		    canvasAnimation();
		    		    
		} else if (direction=="right") {
		  
		    var tempX=Number(positionTaxiInArrayX);
		    var tempY=Number(positionTaxiInArrayY);
		    while (world[tempY][tempX-1]!=1) {
			tempY=tempY+1;
		    }
		    showPath(Number(tempY), Number(tempX-1));
		    canvasAnimation();

		}
	    }
	} else {
	    if (pastPositionTaxiInArrayX > positionTaxiInArrayX) {
		if (direction=="left") {

		    var tempX=Number(positionTaxiInArrayX);
		    var tempY=Number(positionTaxiInArrayY);
		    while (world[tempY+1][tempX]!=1) {
			tempX=tempX-1;
		    }
		    showPath(Number(tempY+1), Number(tempX));
		    canvasAnimation();		    
		    
		} else if (direction=="right") {

		    var tempX=Number(positionTaxiInArrayX);
		    var tempY=Number(positionTaxiInArrayY);
		    while (world[tempY-1][tempX]!=1) {
			tempX=tempX-1;
		    }
		    showPath(Number(tempY-1), Number(tempX));
		    canvasAnimation();

		}
	    } else {
		if (direction=="left") {
		    
		    var tempX=Number(positionTaxiInArrayX);
		    var tempY=Number(positionTaxiInArrayY);
		    
		    while (world[tempY-1][tempX]!=1) {
			tempX=tempX+1;
		    }
		    showPath(Number(tempY-1), Number(tempX));
		    canvasAnimation();
		    
		} else if (direction=="right") {
		    var tempX=Number(positionTaxiInArrayX);
		    var tempY=Number(positionTaxiInArrayY);
		    while (world[tempY+1][tempX]!=1) {
			tempX=tempX+1;
		    }
		    showPath(Number(tempY+1), Number(tempX));
		    canvasAnimation();
		    		  document.getElementById("check").innerHTML = "";
    for (var i = 0; i < world.length; i++) {		
        for (var j = 0; j < world[i].length; j++) {
            if (world[i][j] != 0)
		if (i == tempY+1 && j == tempX) {
		    document.getElementById("check").innerHTML += "<b><font color=red>" + world[i][j]+ "</font></b> ";
		} else {
                    document.getElementById("check").innerHTML += "<b>" + world[i][j]+ "</b> ";
		}
	    else
		document.getElementById("check").innerHTML += " " + world[i][j]+ " ";
		
	}
        document.getElementById("check").innerHTML += "<br>";
    }
		}
	    }
	}
}
    
