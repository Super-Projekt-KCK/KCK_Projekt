var output='';

function getSynonyms(word){
    var s = document.createElement("script");
    s.src = "http://thesaurus.altervista.org/service.php?word="+word+"&language=en_US&output=json&key=PttJAgOCuOB9yMhErbQf&callback=process"; // NOTE: replace test_only with your own KEY
    document.getElementsByTagName("head")[0].appendChild(s);

}


function process(result) {
    for (key in result.response) {
        list = result.response[key].list;
        output += list.synonyms+"|";
    }
}

function textParsing(text) {
    var poss = nlp.pos(text);
    var transText = text.split(' ');
    var posArray = [];
    var sentences = [];
    var sentence = 0;
    posArray[sentence]=[];
    sentences[sentence] = [];
    var word = 0;
    var senWord =0;

    //alert(poss[0]['tokens'][7]['pos']['tag']);
    //console.log(poss[0]['tokens'][5]['pos']['tag']);
    poss[0]['tokens'].forEach(function (entry) {
        if(entry['pos']['tag'] == 'RB'){
            sentence++;
            senWord =0;
            posArray[sentence]=[];
            sentences[sentence] = [];
        }else{
            posArray[sentence][senWord] = entry['pos']['tag'];
            sentences[sentence][senWord] = entry['text'];
            senWord++;
        }
        word++;
    });

    var action='', destination='', through='', direction='';
    var queue=[];
    var qIterator=0;
    queue[qIterator]=[];
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

