var gueue = new Array;
var inProgress = 0;

function nextMove() {
    var check=gueue.shift();
    if (check=="go") {
	inProgress=1;
	
	try {
	    showPath(Number(gueue.shift()), Number(gueue.shift()));
	    canvasAnimation();
	} catch (e) {

	    if (e=="coords") {
            speak('There are no such coordinates.');
		//document.getElementById("taxiMan").value = "There is no that coordinates";
	    }
	    inProgress=0;
	} 
	
    } else if (check=="left" || check=="right" || check=="forward" || check=="back") {
	inProgress=1;
	checkDirection(check);
    } else {
     speak("I'm waiting for orders.");
	//document.getElementById("taxiMan").value = "I'am waiting for orders...";
	inProgress=0;
    }
    
}

function taxiManStart() {
    speak("I'm waiting for orders.");
    //document.getElementById("taxiMan").value = "I'am waiting for orders...";
 
}

function action() {

    
    var input = document.getElementById("kolejka");

    var commands = String(input.value);

    document.getElementById("kolejka").value = '';
    
    console.log(commands);
    if (commands!="") {
	var command = "";

	for (var i=0; i<commands.length; i++) {
	    command += commands[i];

	    if (commands[i]==" ") {
		command = "";
	    } else if (command=="go") {
		gueue.push("go");
		commands+=" ";
		var tempX="";
		var tempY="";
		var j = i;
		var temp = 0;
		
		tempX+=commands[j+2];
		
		if (commands[j+3]!=" ") {
		    tempX+=commands[j+3];
		    temp++;
		}
		
		tempY+=commands[j+4+temp];
		
		if (commands[j+5+temp]!=" ") {
		    tempY+=commands[j+5+temp];
		}
		
		/*while (commands[j+2]!=" ") {
		    tempX+=commands[j+2];
		    j++;
		}
		
		while (j+3<commands.length) {
		    tempY+=commands[j+3];
		    j++;
		}*/

		gueue.push(tempX);
		gueue.push(tempY);

	    } else if (command=="left") {
		gueue.push("left");
		command = "";
	    } else if (command=="right") {
		gueue.push("right");
		command = "";
	    } else if (command=="forward") {
		gueue.push("forward");
		command = "";
	    } else if (command=="back") {
		gueue.push("back");
		command = "";
	    }
	    
	}
	if (inProgress==0) {
	    nextMove();
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

		} else if (direction=="forward") {

		    var tempX=Number(positionTaxiInArrayX);
		    var tempY=Number(positionTaxiInArrayY);
		    if (tempX+1==20) {
			while (world[tempY][tempX-1]!=1) {
			    tempY=tempY-1;
			}			
		    } else if (tempX-1==-1) {
			while (world[tempY][tempX+1]!=1) {
			    tempY=tempY-1;
			}
		    } else {
			while (world[tempY][tempX+1]!=1 || world[tempY][tempX-1]!=1) {
			    tempY=tempY-1;
			}
		    }

		    showPath(Number(tempY-1), Number(tempX));
		    canvasAnimation();
		    
		} else if (direction=="back") {

		    var tempX=Number(positionTaxiInArrayX);
		    var tempY=Number(positionTaxiInArrayY);
		    if (tempX+1==20) {
			while (world[tempY][tempX-1]!=1) {
			    tempY=tempY+1;
			}			
		    } else if (tempX-1==-1) {
			while (world[tempY][tempX+1]!=1) {
			    tempY=tempY+1;
			}
		    } else {
			while (world[tempY][tempX+1]!=1 || world[tempY][tempX-1]!=1) {
			    tempY=tempY+1;
			}
		    }

		    showPath(Number(tempY+1), Number(tempX));
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

		} else if (direction=="forward") {

		    var tempX=Number(positionTaxiInArrayX);
		    var tempY=Number(positionTaxiInArrayY);
		    if (tempX+1==20) {
			while (world[tempY][tempX-1]!=1) {
			    tempY=tempY+1;
			}			
		    } else if (tempX-1==-1) {
			while (world[tempY][tempX+1]!=1) {
			    tempY=tempY+1;
			}
		    } else {
			while (world[tempY][tempX+1]!=1 || world[tempY][tempX-1]!=1) {
			    tempY=tempY+1;
			}
		    }
		    showPath(Number(tempY+1), Number(tempX));
		    canvasAnimation();
		} else if (direction=="back") {

		    var tempX=Number(positionTaxiInArrayX);
		    var tempY=Number(positionTaxiInArrayY);
		    if (tempX+1==20) {
			while (world[tempY][tempX-1]!=1) {
			    tempY=tempY-1;
			}			
		    } else if (tempX-1==-1) {
			while (world[tempY][tempX+1]!=1) {
			    tempY=tempY-1;
			}
		    } else {
			while (world[tempY][tempX+1]!=1 || world[tempY][tempX-1]!=1) {
			    tempY=tempY-1;
			}
		    }

		    showPath(Number(tempY-1), Number(tempX));
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

		} else if (direction=="forward") {

		    var tempX=Number(positionTaxiInArrayX);
		    var tempY=Number(positionTaxiInArrayY);
		    if (tempY+1==20) {
			while (world[tempY-1][tempX]!=1) {
			    tempX=tempX-1;
			}			
		    } else if (tempY-1==-1) {
			while (world[tempY+1][tempX]!=1) {
			    tempX=tempX-1;
			}
		    } else {
			while (world[tempY-1][tempX]!=1 || world[tempY+1][tempX]!=1) {
			    tempX=tempX-1;
			}
		    }
		    showPath(Number(tempY), Number(tempX-1));
		    canvasAnimation();
		} else if (direction=="back") {

		    var tempX=Number(positionTaxiInArrayX);
		    var tempY=Number(positionTaxiInArrayY);
		    if (tempY+1==20) {
			while (world[tempY-1][tempX]!=1) {
			    tempX=tempX+1;
			}			
		    } else if (tempY-1==-1) {
			while (world[tempY+1][tempX]!=1) {
			    tempX=tempX+1;
			}
		    } else {
			while (world[tempY-1][tempX]!=1 || world[tempY+1][tempX]!=1) {
			    tempX=tempX+1;
			}
		    }
		    showPath(Number(tempY), Number(tempX+1));
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
	
		} else if (direction=="forward") {

		    var tempX=Number(positionTaxiInArrayX);
		    var tempY=Number(positionTaxiInArrayY);
		    if (tempY+1==20) {
			while (world[tempY-1][tempX]!=1) {
			    tempX=tempX+1;
			}			
		    } else if (tempY-1==-1) {
			while (world[tempY+1][tempX]!=1) {
			    tempX=tempX+1;
			}
		    } else {
			while (world[tempY-1][tempX]!=1 || world[tempY+1][tempX]!=1) {
			    tempX=tempX+1;
			}
		    }
		    showPath(Number(tempY), Number(tempX+1));
		    canvasAnimation();
		} else if (direction=="back") {

		    var tempX=Number(positionTaxiInArrayX);
		    var tempY=Number(positionTaxiInArrayY);
		    if (tempY+1==20) {
			while (world[tempY-1][tempX]!=1) {
			    tempX=tempX-1;
			}			
		    } else if (tempY-1==-1) {
			while (world[tempY+1][tempX]!=1) {
			    tempX=tempX-1;
			}
		    } else {
			while (world[tempY-1][tempX]!=1 || world[tempY+1][tempX]!=1) {
			    tempX=tempX-1;
			}
		    }
		    showPath(Number(tempY), Number(tempX-1));
		    canvasAnimation();		    
		}
	    }
	}
}
    
/*		    document.getElementById("check").innerHTML = "";
    for (var i = 0; i < world.length; i++) {		
        for (var j = 0; j < world[i].length; j++) {
            if (world[i][j] != 0)
		if (i == tempY-1 && j == tempX) {
		    document.getElementById("check").innerHTML += "<b><font color=red>" + world[i][j]+ "</font></b> ";
		} else {
                    document.getElementById("check").innerHTML += "<b>" + world[i][j]+ "</b> ";
		}
	    else
		document.getElementById("check").innerHTML += " " + world[i][j]+ " ";
		
	}
        document.getElementById("check").innerHTML += "<br>";
    } */
