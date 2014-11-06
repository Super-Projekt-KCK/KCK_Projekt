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
                    //sprawdzenie w slowniku czy czasownik jest synonimem 'to' lub 'through'
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
