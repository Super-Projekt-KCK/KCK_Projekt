var output='';
var posArray = [];
var sentences = [];
var sentence = 0;
posArray[sentence]=[];
sentences[sentence] = [];
var preposition = 0;
posArray[sentence][preposition]=[];
sentences[sentence][preposition]=[];
var queue=[];
var qIterator=0;
queue[qIterator]=[];
var senWord = 0;
var Pause=false;
function getSynonyms(word){
    Pause=false;
    var s = document.createElement("script");
    s.src = "http://words.bighugelabs.com/api/2/0a2e3953d364b8dfd36393e746c7b463/"+word+"/json?callback=process"; // NOTE: replace test_only with your own KEY
    //document.getElementsByTagName("head")[0].appendChild(s);

}

function process(result) {

    console.log(result);
    for (key in result.response) {
        list = result.response[key].list;
        output += list.synonyms+"|";
    }

}

function textParsing(text) {

    var poss = nlp.pos(text);
    var transText = text.split(' ');
    var word = 0;

    poss[0]['tokens'].forEach(function (entry) {
        if (entry['pos']['tag'] == 'RB') {
            sentence++;
            senWord = 0;
            preposition = 0;
            posArray[sentence] = [];
            sentences[sentence] = [];
            posArray[sentence][preposition]=[];
            sentences[sentence][preposition]=[];

        } else {
            if(entry['pos']['tag'] == 'IN'){
                senWord=0;
                preposition++;
                posArray[sentence][preposition]=[];
                sentences[sentence][preposition]=[];
                posArray[sentence][preposition][senWord] = entry['pos']['tag'];
                sentences[sentence][preposition][senWord] = entry['text'];
                senWord++;
            }else{

                posArray[sentence][preposition][senWord] = entry['pos']['tag'];
                sentences[sentence][preposition][senWord] = entry['text'];
                console.log(sentence+' '+preposition+' '+senWord);
                senWord++;

            }
        }
        word++;
    });
    //console.log(sentences);
}

function splits(){
    var pp=0;
    var ss=0;
    var ww=0;
    var IN = 0, INS = 0, INN=0;
    var VBP= 0, VBPS=0;
    var action='';
    var throughdestination=[], directions=[];
    var ready=false;
    posArray.forEach(function (sent) {
        queue[qIterator]=[];
        sent.forEach(function (prep) {
            prep.forEach(function (word) {
                console.log(word+' '+sentences[ss][pp][ww]);
                if(word == 'VBP'){
                    action=sentences[ss][pp][ww];
                    VBP=1;
                    VBPS++;
                }else if(word == 'IN'){
                    IN=1;
                }

                if(word== 'JJ'){
                    ready=true
                }

                if(ready==true){

                    if(typeof(sentences[ss][pp][ww]) !=  'undefined'){
                        directions.push(sentences[ss][pp][ww]);
                        //console.log(directions);
                        VBP=0;
                    }
                    ready=false;
                }else if(IN == 1){
                    if(typeof(sentences[ss][pp][ww]) !=  'undefined') {
                        throughdestination.push(sentences[ss][pp][ww]);
                    }
                }
                if(word=='NN' || word=='NNA'){
                    if(sentences[ss][pp][ww]== 'passenger' || sentences[ss][pp][ww]== 'client') {
                        if(free==false){
                            dropPassenger();
                        }
                        else if(free==true){
                            searchOnStreet();
                            takePassenger(identify(positionTaxiInArrayX, positionTaxiInArrayY));
                        }
                    }
                }
                ww++;
            });
            pp++;
            IN=0;
            ww=0;
            VBP=0;
        });
        pp=0;
        VBPS=0;
        INS=0;
        ss++;
        queue[qIterator]['action'] = action;
        queue[qIterator]['directions'] = directions.toString();
        queue[qIterator]['throughdestinations'] = throughdestination.toString();
        directions.length = 0; throughdestination.length = 0;
        var elem=0;
        throughdestination.forEach(function (ele) {
            throughdestination[elem].length=0;
            elem++;
        });

        qIterator++;

    });
    //console.log(queue);
}
function emptyQueue(){

    for( var i = 0; i < queue.length; i++ ){
        for(var j=0; j < queue[i];j++) {
            queue[i][j]= null;
        }
        queue[i]= null;
    }
    queue= null;

    for( var i = 0; i < sentences.length; i++ ){
        for(var j=0; j < sentences[i];j++) {
            sentences[i][j]= null;
        }
        sentences[i]= null;
    }
    sentences= null;
    for( var i = 0; i < posArray.length; i++ ){
        for(var j=0; j < posArray[i];j++) {
            posArray[i][j]= null;
        }
        posArray[i]= null;
    }
    posArray= null;

    posArray = [];
    sentences = [];
    sentence = 0;
    posArray[sentence]=[];
    sentences[sentence] = [];
    preposition = 0;
    posArray[sentence][preposition]=[];
    sentences[sentence][preposition]=[];
    queue=[];
    qIterator=0;
    queue[qIterator]=[];
    senWord = 0;
}
function matchKeywords(){
    var action='', destination='', through='', direction='';

    var j =0;
    for (var i = 0; i <= sentence; i++ ){
        posArray[i].forEach(function (part) {
            if(part == 'VBP'){
                if(sentences[i][j] == 'stop' || sentences[i][j] == 'go'){
                    if(sentences[i][j] == 'stop'){
                        action = 'stop';
                    }else if(sentences[i][j] == 'go'){
                        action = 'go';
                    }
                }else{
                    getSynonyms(sentences[i][j]);
                        if(output.indexOf('go') >= 0){
                            action = 'go';
                        }else if(output.indexOf('stop') >= 0){
                            action = 'stop';
                        }else{
                            action = 'error';
                        }
                    //sprawdzanie w slowniku czy czasownik jest synonimem 'go' lub 'stop'
                }
                varb=1;
            }else if(part == 'IN' ){
                if(sentences[i][j] == 'to' || sentences[i][j] == 'through'){
                    if(sentences[i][j] == 'to'){
                        destination = 'destination';
                    }else if(sentences[i][j] == 'through'){
                        through = 'through';
                    }
                }else{
                    getSynonyms(sentences[i][j]);

                    //sprawdzenie w slowniku czy jest synonimem 'to' lub 'through'
                }
            }
            else if(part == 'JJ' ){
                if(sentences[i][j] == 'left' || sentences[i][j] == 'right' || sentences[i][j] == 'forward' || sentences[i][j] == 'back'){
                    if(sentences[i][j] == 'left'){
                        direction = 'left';
                    }else if(sentences[i][j] == 'right'){
                        direction = 'right';
                    }else if(sentences[i][j] == 'forward'){
                        direction = 'forward';
                    }else if(sentences[i][j] == 'back'){
                        direction = 'back';
                    }
                }else{
                    getSynonyms(sentences[i][j]);
                        if(synon.indexOf('left') >= 0){
                            direction = 'left';
                        }else if(synon.indexOf('right') >= 0){
                            direction = 'right';
                        }else if(synon.indexOf('forward') >= 0){
                            direction = 'forward';
                        }else if(synon.indexOf('back') >= 0){
                            direction = 'back';
                        }else{
                            direction='error';
                        }

                    //sprawdzenie w slowniku czy przymiotnik jest synonimem 'left', 'right', 'forward', 'back'
                }
            }

            j++;
        });
        queue[qIterator]['action'] = action;
        queue[qIterator]['direction'] = direction;
        queue[qIterator]['destination'] = destination;
        queue[qIterator]['through'] = through;
        direction = ''; destination = ''; through = '';

        qIterator++;
        queue[qIterator]=[];
        j=0;
    }

return queue;
}

function speak(comment) {
    var u = new SpeechSynthesisUtterance();
    u.text = comment;
    u.lang = 'en-GB';
    u.rate = 1.2;
    u.onend = function (event) {
    }
    speechSynthesis.speak(u);
    }

