function moveDirection() {

    function checkDirection(direction) {
	if (pastPositionTaxiInArrayX==positionTaxiInArrayX) { 
	    if (pastPositionTaxiInArrayY > positionTaxiInArrayY) {
		if (direction=="left") {
		    console.log("<-");
		} else if (direction=="right") {
		    console.log("->");
		}
	    } else {
		if (direction=="left") {
		    console.log("->");
		} else if (direction=="right") {
		    console.log("<-");
		}
	    }
	} else {
	    if (pastPositionTaxiInArrayX > positionTaxiInArrayX) {
		if (direction=="left") {
		    console.log("^");
		} else if (direction=="right") {
		    console.log("tu");
		}
	    } else {
		if (direction=="left") {
		    console.log("^");

		    tempX=Number(positionTaxiInArrayX);
		    tempY=Number(positionTaxiInArrayY);
		    
		    while (world[tempY-1][tempX]!=1) {
			tempX=tempX+1;
		    }
		    console.log(tempY-1, tempX);
    document.getElementById("check").innerHTML = "";
    for (var i = 0; i < world.length; i++) {		
        for (var j = 0; j < world[i].length; j++) {
            if (world[i][j] != 0)
		if (i == tempY-1 && j == tempX) {
		    document.getElementById("check").innerHTML += "<b><font color=red>" + world[i][j]+ "</font></b> ";
		} else {
                    document.getElementById("check").innerHTML += "<b>" + world[i][j]+ "</b> ";
		}
	    else
		if (i == Number(positionTaxiInArrayY)+1 && j == positionTaxiInArrayX) {
		    document.getElementById("check").innerHTML += "<b><font color=green>" + world[i][j]+ "</font></b> ";
		} else {
                    document.getElementById("check").innerHTML += " " + world[i][j]+ " ";
		}
	}
        document.getElementById("check").innerHTML += "<br>";
    }		    
		} else if (direction=="right") {
		    console.log("dol");
		}
	    }
	}
    }
    
    var input = document.getElementById("commands");

    var matrix = getWorldMap();
    
    var commands = String(input.value);
 
    var command = "";
    
    for (var i=0; i<commands.length; i++) {
	command += commands[i];

	if (commands[i]==" ") {
	    command = "";
	} else if (command=="left") {
	    checkDirection(command);
	    command = "";
	} else if (command=="right") {
	    checkDirection(command);
	    command = "";
	}

    }
    
}
