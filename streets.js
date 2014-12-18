//tablica trzymajaca wspolrzedne i dlugosci ulic
var streetCoords = createArray(4, points);              //indeksy 0,1 - begin, 2,3 - end


//czyszczenie wspolrzednych ulic
function clearStreets() {
    streetCoords[0].length = 0;
    //streetCoords.names.length = 0;
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
                var allText = rawFile.responseText;
                splitText(allText);
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

function splitText(text) {
    streetCoords.names = text.split("\n");
    console.log(streetCoords.names);
}