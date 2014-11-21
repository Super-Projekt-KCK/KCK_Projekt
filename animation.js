      var shipX = 0; // X position of ship
      var shipY = 0; // Y position of ship
      var canvas; // canvas
      var ctx; // context
      var back = new Image(); // storage for new background piece
      var oldBack = new Image(); // storage for old background piece
      var ship = new Image(); // ship
      var shipX = 0; // current ship position X
      var shipY = 0; // current ship position Y
      var oldShipX = 0; // old ship position Y
      var oldShipY = 0; // old ship position Y

     
      // This function is called on page load.


      function canvasAnimation() {

          // Get the canvas element.
	  globalPath.reverse();
        canvas = document.getElementById("myCanvas");

        // Make sure you got it.
        if (canvas.getContext)

        // If you have it, create a canvas user inteface element.
        {
          // Specify 2d canvas type.
          ctx = canvas.getContext("2d");

          // Paint it black.
          ctx.fillStyle = "black";
          ctx.rect(0, 0, 950, 950);
          ctx.fill();

          // Save the initial background.
          back = ctx.getImageData(0, 0, 50, 50);

          // Paint the starfield.
          stars();

          // Draw space ship.
          makeShip();
        }

        // Play the game until the until the game is over.
        gameLoop = setInterval(doGameLoop, 1000);

      }

      // Paint a random starfield.


      function stars() {

        // Draw 50 stars.
        for (i = 0; i <= 50; i++) {
          // Get random positions for stars.
          var x = Math.floor(Math.random() * 299);
          var y = Math.floor(Math.random() * 299);

          // Make the stars white
          ctx.fillStyle = "black";

          // Give the ship some room by painting black stars.
          if (x < 30 || y < 30) ctx.fillStyle = "black";

          // Draw an individual star.
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();

          // Save black background.
          oldBack = ctx.getImageData(0, 0, 50, 50);
        }
      }

      function makeShip() {

          ctx.fillStyle = "green";
          ctx.rect(0, 0, 50, 50);
          ctx.fill();
        // Save ship data.
        ship = ctx.getImageData(0, 0, 50, 50);

        // Erase it for now.
        ctx.putImageData(oldBack, 0, 0);

      }

      function doGameLoop() {

        // Put old background down to erase shipe.


	  var elem;
	  elem = globalPath.pop();
	  
	  if (elem) {
	      var last = elem.join();
	      var dot = last.indexOf(",");
 	      oldShipX = shipX;
	      oldShipY = shipY
              oldBack = back;
	      shipX = last.substring(0, dot)* 50;
	      shipY = last.substring(dot+1) * 50;
	      back = ctx.getImageData(shipX, shipY, 50, 50);
	  } else {
	      exit;
	  }
	        ctx.putImageData(oldBack, oldShipX, oldShipY);
        // Put ship in new position.
        ctx.putImageData(ship, shipX, shipY);
	  
      }  
