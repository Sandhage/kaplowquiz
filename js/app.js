// Global Variables //
var defuseCode      = null;
var cutRed          = false; // For the boolean value questions, when making reset function
var cutGreen        = false; // make sure to reset the variables to false.
var cutBlue         = false;
var cutYellow       = false;
var ejectPower      = false;
var codeQuery       = null;
var wireQuery       = null;
var powerQuery      = null;
var currentQuestion = null;
var clickedAnswer   = null;
    // Test for functionality, make local later (maybe?)
var words  = ["spooky", "tired", "gnarly", "mystery", "brave"];
var words2 = ["ghost", "archer", "mister", "monkey", "sick"];
var words3 = ["speaks", "eats", "knows", "hates", "is"];
var words4 = ["devil", "arrow", "explosion", "proceed", "sleep"];
    // Different Words
var word1 = null;
var word2 = null;
var word3 = null;
var word4 = null;
    // Phrase
var passPhrase    = null;
var liarPhrase1   = null;
var liarPhrase2   = null;
var liarPhrase3   = null;
var deceitArray1  = null;
// var answerElement = new Array();

// Application //
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var interval = setInterval(function () {
        minutes  = parseInt(timer / 60, 10);
        seconds  = parseInt(timer % 60, 10);

        minutes  = minutes < 10 ? "0" + minutes : minutes;
        seconds  = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if ( minutes == 24 && seconds == 0 ) {
            hideHints();
            showQuestion();
            setQuestion(codeQuery);
        }


        if (--timer < 0) {
            alert("DONE"); 
           hideQuestion();
            timer = duration;
            clearInterval(interval);
        }
    }, 10);
}

window.onload = function() {
    // Set element class selector
    elements = document.getElementsByClassName('answer');

    // Set all defusal variables (Code, Wire, Powersource)
    resetDefusal();

    // Set the Question Objects
    setdefuseQueries();

    // Set All Defusal Hints
    showHints();

    // Set the timer for 30 Seconds
    var thirtySeconds = 60 * 30;
    display = document.querySelector('#timerDiv');

    // Show instructions
    // Set event listener to remove buttons
    document.getElementById('instructions').style.display = 'block';
        document.querySelector('#instructionButton').addEventListener('click', function () {
        document.getElementById('instructions').style.display = 'none';
    });


    // Start timer and quiz
    document.querySelector('#startQuiz').addEventListener('click', function () {
        startTimer(thirtySeconds, display);
        setHints();
    });

    // Test answers
    // Color, digits, yes, phrase
    document.querySelector('#ans1').addEventListener('click', function() {
        clickedAnswer = document.querySelector('#ans1').firstElementChild.innerHTML;
        console.log(clickedAnswer);
        checkAnswer(clickedAnswer);
    });
    document.querySelector('#ans2').addEventListener('click', function() {
        clickedAnswer = document.querySelector('#ans2').firstElementChild.innerHTML;
        console.log(clickedAnswer);
        checkAnswer(clickedAnswer);
    });
    document.querySelector('#ans3').addEventListener('click', function() {
        clickedAnswer = document.querySelector('#ans3').firstElementChild.innerHTML;
        console.log(clickedAnswer);
        checkAnswer(clickedAnswer);
    });
    document.querySelector('#ans4').addEventListener('click', function() {
        clickedAnswer = document.querySelector('#ans4').firstElementChild.innerHTML;
        console.log(clickedAnswer);
        checkAnswer(clickedAnswer);
    });
    document.querySelector('#codeInput').addEventListener('keyup', function(e) {
        if ( e.keyCode == 13 ) {
            clickedAnswer = document.querySelector('#codeInput').value;
            console.log(clickedAnswer);
            checkAnswer(clickedAnswer);
        }
    });
};

// Logic to check each answer, based first on what type of question you're dealing with
function checkAnswer() {
    // if ( currentQuestion == wireQuery ) {

    // } else 

    if ( currentQuestion == codeQuery ) {
        if ( clickedAnswer == codeQuery.items ) {
            // alert('Correct answer worked!');
            codeQuery.answered++;
            console.log(codeQuery.answered);
            setQuestion(phraseQuery);
        }
    } else if ( currentQuestion == powerQuery ) {
        if ( clickedAnswer == "yes" && powerQuery.items ) {
            // alert('Correct answer worked!');
            powerQuery.answered++;
            console.log(powerQuery.answered);
        } else if ( clickedAnswer == "no" && !powerQuery.items ) {
            // alert('Correct answer worked!');
            powerQuery.answered++;
            console.log(powerQuery.answered);
        } else {
            alert('Gosh Darn!');
        }
    } else if ( currentQuestion == phraseQuery ) {
        if ( clickedAnswer == passPhrase ) {
            alert('Correct answer worked!');
            phraseQuery.answered++;
            console.log(phraseQuery.answered);
            setQuestion(powerQuery);
        } else {
            alert('Oof!');
            setQuestion(powerQuery);
        }
    }
}



// Global Functions //

// Show/hide functions
function showHints() {
    document.getElementById('hintSect').style.display = "block";
}

function hideHints() {
    document.getElementById('hintSect').style.display = "none";
}

function showQuestion() {
    document.getElementById('ans5').style.display = 'none';
    document.getElementById('defuseSect').style.display = "block";
}

function hideQuestion() {
    document.getElementById('defuseSect').style.display = "none";
}

function showAnswers() {
    // for (var i = 0, max = elements.length; i < max; i++) {
    //     elements[i].style.display = "block";
    // };

    // Show all answer items excluding input-answer item 'ans5'
    document.getElementById('ans1').style.display = 'block';
    document.getElementById('ans2').style.display = 'block';
    document.getElementById('ans3').style.display = 'block';
    document.getElementById('ans4').style.display = 'block';
}

function hideAnswers() {
    for (var i = 0, max = elements.length; i < max; i++) {
        elements[i].style.display = "none";
    };
}

// Make "defusalQuery" (AKA Question) objects
function mkdefuseQuery(type, query, items) {
    var defuseQuery = {};

    defuseQuery.type       = type;
    defuseQuery.query      = query;
    defuseQuery.items      = items;
    defuseQuery.guess      = null;
    defuseQuery.answered   = 0;

    return defuseQuery;

}

// Set All "defusalQuery" (AKA Question) objects
function setdefuseQueries() {
    codeQuery   = mkdefuseQuery("Four Digit Code", "What is the 4 digit code?", defuseCode);
        // console.log(codeQuery);
    wireQuery   = mkdefuseQuery("Wires", "Which wires do you need to cut?", [cutRed, cutGreen, cutBlue, cutYellow]);
        // console.log(wireQuery);
    powerQuery  = mkdefuseQuery("Power Source", "Do you need to remove the power source?", ejectPower);
        // console.log(powerQuery);
    phraseQuery = mkdefuseQuery("Pass Phrase", "Which is the correct pass phrase?", passPhrase);
}

// 4-digit Defusal Code Generator
function setCode(min, max) {
    // Randomly generate a number between two digits ex: (0, 9999)
    defuseCode = Math.floor(Math.random()*(max-min+1)+min);

    // Else if chain in case number is less than 4 digits long
    if (defuseCode < 10) {
        defuseCode = "000" + defuseCode;
    } else if (defuseCode < 100) {
        defuseCode = "00" + defuseCode;
    } else if (defuseCode > 100 && defuseCode < 1000) {
        defuseCode = "0" + defuseCode;
    };
}

// Wire Boolean Value Generator
function setWires() {
    // Set wire color variables, randomly generate values 0-1
    var tempRed    = randomSmallNum();
    var tempGreen  = randomSmallNum();
    var tempBlue   = randomSmallNum();
    var tempYellow = randomSmallNum();

    // Translate cutRed to Boolean
    if (tempRed) {
        cutRed = true;
    }

    // Translate cutGreen to Boolean
    if (tempGreen) {
        cutGreen = true;
    }

    // Translate cutBlue to Boolean
    if (tempBlue) {
        cutBlue = true;
    }

    // Translate cutYellow to Boolean
    if (tempYellow) {
        cutYellow = true;
    }

    // Check to make sure it's working!
    // console.log(cutRed, cutGreen, cutBlue, cutYellow);
}

// Power Source Boolean Value Generator
function setPower() {
    // Set yes/no eject power variable
    var tempPower = randomSmallNum();

    // Translate ejectPower to Boolean
    if (tempPower) {
        ejectPower = true;
    }

    // Check to make sure it's working!
    console.log(ejectPower);
}

// Small Number Generator
function randomSmallNum() {
    return Math.floor(Math.random() * 2);
}

// Reset All Answer Variables
function resetDefusal() {
    // Set the 4-digit defusal code
    setCode(0, 9999);

    // Set wires
    setWires();

    // Set power source
    setPower();

    // Set pass phrase
    setPhrase();
    obfPhrase();

}

// Set All Defuse Hints
function setHints() {
    var tempWires  = ""; 

    if ( !wireQuery.items[0] && !wireQuery.items[1] && !wireQuery.items[2] && !wireQuery.items[3]) {
        tempWires = "no wires"
    }

    if ( wireQuery.items[0] ) {
        tempWires = tempWires + " red";
    }

    if ( wireQuery.items[1] ) {
        tempWires = tempWires + " green";
    }

    if ( wireQuery.items[2] ) {
        tempWires = tempWires + " blue";
    }

    if ( wireQuery.items[3] ) {
        tempWires = tempWires + " yellow";
    }

    if ( powerQuery.items ) {
        document.getElementById('hintPower').firstElementChild.innerHTML  = "Should you remove the power source?   yes";
    } else {
        document.getElementById('hintPower').firstElementChild.innerHTML  = "Should you remove the power source?   no";
    }

    document.getElementById('hintCode').firstElementChild.innerHTML   = "The code is:   " + codeQuery.items;
    document.getElementById('hintPhrase').firstElementChild.innerHTML = "The pass phrase is:   " + phraseQuery.items;
    document.getElementById('hintWire').firstElementChild.innerHTML   = "You need to cut:   " + tempWires;
}

// Set Current Defusal Question
function setQuestion(queryObject) {
    document.getElementById('defuseSect').firstElementChild.innerHTML = queryObject.query;
    
    if ( queryObject == wireQuery ) {
        currentQuestion = wireQuery;
        console.log(currentQuestion);
        
        // Red Wire
        document.getElementById('ans1').firstElementChild.innerHTML = 'Red';
        document.getElementById('ans1').style.color = '#E50000';
        // Green Wire
        document.getElementById('ans2').firstElementChild.innerHTML = 'Green';
        // Blue Wire
        document.getElementById('ans3').firstElementChild.innerHTML = 'Blue';
        document.getElementById('ans3').style.color = '#0BB5FF';
        // Yellow Wire
        document.getElementById('ans4').firstElementChild.innerHTML = 'Yellow';
        document.getElementById('ans4').style.color = '#ffff00';
        // Show All Answer Divs
        showAnswers();
    }

    if ( queryObject == codeQuery ) {
        currentQuestion = codeQuery;
        console.log(currentQuestion);

        hideAnswers();
        document.getElementById('codeInput').placeholder = "Enter Code and Press Enter";
        document.getElementById('ans1').style.color   = '#7ee517';
        document.getElementById('ans3').style.color   = '#7ee517';
        document.getElementById('ans4').style.color   = '#7ee517';
        
        document.getElementById('ans5').style.display = 'block';
    }

    if ( queryObject == powerQuery ) {
        currentQuestion = powerQuery;
        console.log(currentQuestion);

        hideAnswers();

        document.getElementById('ans1').innerHTML = '<p>yes</p>';
        document.getElementById('ans2').innerHTML = '<p>no</p>';
        document.getElementById('ans1').style.display = 'block';
        document.getElementById('ans2').style.display = 'block';
    }

    if (queryObject == phraseQuery) {
        currentQuestion = phraseQuery;
        console.log(currentQuestion);

        hideAnswers();
        
        // answerElement = document.getElementsByClassName('answer');
        var tempArray = [passPhrase, liarPhrase1, liarPhrase2, liarPhrase3];

        scramblePhrase(tempArray);

        document.getElementById('ans1').innerHTML = '<p>' + tempArray[0] + '</p>';
        document.getElementById('ans2').innerHTML = '<p>' + tempArray[1] + '</p>';
        document.getElementById('ans3').innerHTML = '<p>' + tempArray[2] + '</p>';
        document.getElementById('ans4').innerHTML = '<p>' + tempArray[3] + '</p>';

        showAnswers();
    }

}


// Pass Phrase Generators

// var words  = ["spooky", "tired", "gnarly", "mystery", "brave"];
// var words2 = ["ghost", "archer", "mister", "monkey", "sick"];
// var words3 = ["devil", "arrow", "explosion", "proceed", "sleeps"];
function setPhrase() {
    passPhrase = getRandomPhrase();
    
    phraseArray = [word1, word2, word3, word4];

    console.log(passPhrase);
    console.log(phraseArray);
}

function getRandomPhrase() {
    word1 = randomizeWord(words);
    word2 = randomizeWord(words2);
    word3 = randomizeWord(words3);
    word4 = randomizeWord(words4);
    return word1 + " " + word2 + " " + word3 + " " + word4;

    function randomizeWord(inputWords) {
        return inputWords[Math.floor(Math.random() * inputWords.length)];
    };
};

function scramblePhrase(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function obfPhrase() {
    while ( deceitArray1 == null ) {
        deceitArray1 = scramblePhrase(phraseArray);
    }

    liarPhrase1 = deceitArray1[0] + " " + deceitArray1[1] + " " + deceitArray1[2] + " " + deceitArray1[3];
    liarPhrase2 = getRandomPhrase();
    liarPhrase3 = getRandomPhrase();
}