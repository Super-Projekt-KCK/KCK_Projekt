var Passenger = function () {               //klasa pasażera (full obiektowość xD)
    this.img = new Image();
    this.imgPath = "images/person.png";
    this.background = {};               //żeby po wymazaniu było co przywrócić
    this.position = new Array();                     //pozycja w tablicy
    this.destination = new Array();                 //cel podróży  (nie wiedziałem czy string czy array więc dałem array)
    this.img.src = this.imgPath;
    this.position[0] = Math.floor(Math.random() * size);
    this.position[1] = Math.floor(Math.random() * size);
}

Passenger.prototype.randomPosition = function() {
    this.position[0] = Math.floor(Math.random() * size);
    this.position[1] = Math.floor(Math.random() * size);
}

Passenger.prototype.setPosition = function(x, y) {
    //tutaj ma losować z jedynek na tablicy jakieś pole

    this.position[0] = x;
    this.position[1] = y;
}

Passenger.prototype.getPosition = function() {
    return this.position;
}

Passenger.prototype.draw = function() {
    //umieszczenie pamperka na mapie świata
    world[this.position[0]][this.position[1]] = 5;

    var canvas = document.getElementById("town");
    var context = canvas.getContext("2d");

    //zapamiętanie co było wcześniej
    this.background = context.getImageData(this.position[0], this.position[1], 50, 50);

    //rysowanie pamperka na canvas
    context.drawImage(this.img, this.position[0] * 50, this.position[1] * 50);
}

Passenger.prototype.erase = function(x,y) {                                  //gdzie wymazać pasażera
    var canvas = document.getElementById("town");
    var context = canvas.getContext("2d");

    //wymazanie z tablicy
    world[this.position[0]][this.position[1]] = 1;

    //wymazanie z canvas
    context.putImageData(this.background, x, y);
}



//-----------------------poza obiektem-----------------------------------//

function testPerson() {
    var person = new Passenger();
    //person.setPosition(0,0);
    person.draw();
    speak("Where is the taxi?");
    //person.erase(0,0);
}