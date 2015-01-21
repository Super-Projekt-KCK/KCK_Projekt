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
}


//-----------------------właściwości i pozycje------------------------------------//

Passenger.prototype.setRandomPosition = function() {               //stawia ludka tylko na ulicy
    do {
        this.position[0] = Math.floor(Math.random() * size);
        this.position[1] = Math.floor(Math.random() * size);
    } while (world[this.position[1]][this.position[0]] != 1);               //znowu odwrócone współrzędne :C
}

Passenger.prototype.setPosition = function(x, y) {
    this.position[0] = x;
    this.position[1] = y;
}

Passenger.prototype.getPosition = function() {
    return this.position;
}

Passenger.prototype.setRandomDestination = function() {
    this.destinationStreet = streetCoords.names[Math.floor(Math.random() * streetCoords.names.length)];
    //trzeba dopisać warunek żeby nie chciał jechać tam gdzie stoi
    speak ("My destination is " + this.destinationStreet + " street.");
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
        passengers[i].erase(passengers[i].position);
    }
    pIndex = 0;
}