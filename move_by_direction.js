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
		    console.log("dol");
		} else if (direction=="right") {
		    console.log("^");
		}
	    } else {
		if (direction=="left") {
		    console.log("^");
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
