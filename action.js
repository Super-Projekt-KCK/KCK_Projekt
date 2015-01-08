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
