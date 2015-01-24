//tablica trzymajaca wspolrzedne i dlugosci ulic
var streetCoords = createArray(4, points);              //indeksy 0,1 - begin, 2,3 - end
streetCoords.names = new Array();

var names = new Array();
var streetCount = 0;

//czyszczenie wspolrzednych ulic
function clearStreets() {
    streetCoords[0].length = 0;
}

function readTextFile()
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "streets.txt", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                console.log("Plik otwarty");
                names = rawFile.responseText.split('\n');
            }
        }
    }
    rawFile.send(null);
    //rawFile.close();
}

function assignStreet(i) {          //przypisuje nazwę ulicy do odpowiednich współrzędnych na grafie
    var index;
    do {
        index = Math.floor(Math.random() * names.length);

    } while (names[index] == undefined);
    streetCoords.names[i] = names[index];
    console.log("streetNames[" + i + "]: " + streetCoords.names[i]);
    names[index] = undefined;
}

function getStreetByCoords(y, x) {
    var temp = "nope";
    for (var i = 0; i < streetCoords[0].length; i++) {
        if (streetCoords[1][i] == x && streetCoords[3][i] == x)
            temp = streetCoords.names[i];
        else
            if (streetCoords[0][i] == y && streetCoords[2][i] == y)
                temp = streetCoords.names[i];
    }
    return temp;
}