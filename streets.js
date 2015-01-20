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

function assignStreet(i) {
    var index;
    do {
        index = Math.floor(Math.random() * names.length);

    } while (names[index] == undefined);
    //console.log("(streets.js)nazwa: " + temp[index]);
    streetCoords.names[i] = names[index];
    console.log("streetNames[" + i + "]: " + streetCoords.names[i]);
    names[index] = undefined;
}