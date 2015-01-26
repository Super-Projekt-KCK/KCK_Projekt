var Passenger = function () {                            //klasa pasażera (full obiektowość xD)
    this.img = new Image();
    this.imgPath = "images/person.png";
    this.background = {};                                //żeby po wymazaniu było co przywrócić
    this.position = new Array();                         //pozycja w tablicy
    this.destinationArray = new Array();                      //cel podróży  (nie wiedziałem czy string czy array więc dałem array)
    this.destinationStreet = "";
    this.img.src = this.imgPath;
    this.setRandomPosition();
    this.setRandomDestination();
    this.arrayId = pIndex;
}


//-----------------------gettery i settery------------------------------------//

Passenger.prototype.setRandomPosition = function() {               //stawia ludka tylko na ulicy
    do {
        this.position[0] = Math.floor(Math.random() * (size - 1));
        this.position[1] = Math.floor(Math.random() * (size - 1));
    } while (world[this.position[1]][this.position[0]] != 1);               //znowu odwrócone współrzędne :C
}

Passenger.prototype.setPosition = function(array) {
    this.position[0] = array[0];
    this.position[1] = array[1];
}

Passenger.prototype.getPosition = function() {
    return this.position;
}

Passenger.prototype.setRandomDestination = function() {
    var rand = Math.floor(Math.random() * streetCoords.names.length);
    this.destinationStreet = streetCoords.names[rand];
    this.destinationArray = getMiddle(rand);
    //trzeba dopisać warunek żeby nie chciał jechać tam gdzie stoi
    //speak ("My destination is " + this.destinationStreet + " street.");
    console.log("My destination is " + this.destinationStreet + " street.");
}

Passenger.prototype.getDestination = function() {
    return this.destinationArray;
}

Passenger.prototype.setBackground = function(bg) {
    this.background = bg;
}

Passenger.prototype.getBackground = function() {
    return this.background;
}

//-------------------------rysowanie i wymazywanie---------------------------------//

Passenger.prototype.draw = function() {
    //umieszczenie pamperka na mapie świata
    world[this.position[0]][this.position[1]] = 5;

    var canvas = document.getElementById("town");
    var context = canvas.getContext("2d");

    //zapamiętanie co było wcześniej
    this.background = context.getImageData(this.position[0]*50, this.position[1]*50, 50, 50);

    //rysowanie pamperka na canvas
    context.drawImage(this.img, this.position[0] * 50, this.position[1] * 50);
}

Passenger.prototype.erase = function(array) {                                  //gdzie wymazać pasażera
    var canvas = document.getElementById("town");
    var context = canvas.getContext("2d");

    //wymazanie z tablicy
    world[array[0]][array[1]] = 1;

    //wymazanie z canvas
    context.putImageData(this.background, array[0]*50, array[1]*50);
}



//-----------------------poza obiektem-----------------------------------//


//globalna tablica z pasażerami
var passengers = [];
var pIndex = 0;             //aktualna liczba pasażerów

function testPerson() {
    passengers[pIndex] = new Passenger();
    passengers[pIndex].draw();
    pIndex++;
    //speak("Where is the taxi?");
}

function clearPeople() {
    for(var i = 0; i < passengers.length; i++) {
        if (passengers[i] != undefined)
            passengers[i].erase(passengers[i].position);

    }
    passengers.length = 0;
    pIndex = 0;
}

function identify (i,j) {
    var pos;
    for (var x = 0; x < passengers.length; x++) {
        pos = passengers[x].getPosition();
        if (pos[0] == i && pos[1] == j)
            return passengers[x];
    }
    return undefined;
}