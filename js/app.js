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
    // Test for functionality, make local later (maybe?)
var words  = ["spooky", "tired", "gnarly", "mystery", "brave"];
var words2 = ["ghost", "archer", "mister", "monkey", "sick"];
var words3 = ["devil", "arrow", "explosion", "proceed", "sleeps"];
    // Different Words
var word1 = null;
var word2 = null;
var word3 = null;
    // Phrase
var passPhrase = null;
    // Elements for class select and loop
var elements = new Array();

// Application //
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var interval = setInterval(function () {
        minutes  = parseInt(timer / 60, 10);
        seconds  = parseInt(timer % 60, 10);

        minutes  = minutes < 10 ? "0" + minutes : minutes;
        seconds  = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (minutes == 24 && seconds == 0) {
            hideHints();
            setQuestion(wireQuery);
            showQuestion();
        }

        if (minutes == 18 && seconds == 0) {
            setQuestion(codeQuery);
        }

        if (minutes == 12 && seconds == 0) {
            setQuestion(powerQuery);
        }

        if (minutes == 6 && seconds == 0) {
            setQuestion(phraseQuery);
        }

        // if (minutes == 6 && seconds == 0) {
        //     setQuestion();
        // }

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
    setHints();

    // Set the timer for 30 Seconds
    var thirtySeconds = 60 * 30;
    display = document.querySelector('#timerDiv');

    // Start timer and quiz
    document.querySelector('button').addEventListener('click', function () {
        startTimer(thirtySeconds, display);
        showHints();
    });
};



// Global Functions //

// Show/hide functions
function showHints() {
    document.getElementById('hintSect').style.display = "block";
}

function hideHints() {
    document.getElementById('hintSect').style.display = "none";
}

function showQuestion() {
    document.getElementById('defuseSect').style.display = "block";
}

function hideQuestion() {
    document.getElementById('defuseSect').style.display = "none";
}

function showAnswers() {
    for (var i = 0, max = elements.length; i < max; i++) {
        elements[i].style.display = "block";
    };
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

}

// Set All Defuse Hints
function setHints() {
    document.getElementById('hintCode').firstElementChild.innerHTML  = codeQuery.items;
    document.getElementById('hintWire').firstElementChild.innerHTML  = wireQuery.items;
    document.getElementById('hintPower').firstElementChild.innerHTML = powerQuery.items;
}

// Set Current Defusal Question
function setQuestion(queryObject) {
    document.getElementById('defuseSect').firstElementChild.innerHTML = queryObject.query;
    
    if ( queryObject == wireQuery ) {
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
    }

    if ( queryObject == codeQuery ) {
        document.getElementById('ans1').style.color   = '#7ee517';
        document.getElementById('ans3').style.color   = '#7ee517';
        document.getElementById('ans4').style.color   = '#7ee517';
        hideAnswers();
        document.getElementById('ans1').innerHTML     = '<input type="text" name="code-input" value="Enter Code Here" id="codeInput">';
        document.getElementById('ans1').style.display = 'block';
    }

    if ( queryObject == powerQuery ) {
        document.getElementById('ans1').innerHTML = '<p>yes</p>';
        document.getElementById('ans2').innerHTML = '<p>no</p>';
        document.getElementById('ans1').style.display = 'block';
        document.getElementById('ans2').style.display = 'block';
    }

    // if (queryObject == phraseQuery) {

    // }

}


// Pass Phrase Generator

// var words  = ["spooky", "tired", "gnarly", "mystery", "brave"];
// var words2 = ["ghost", "archer", "mister", "monkey", "sick"];
// var words3 = ["devil", "arrow", "explosion", "proceed", "sleeps"];
function setPhrase() {
    var getRandomPhrase = function () {
        word1 = randomizeWord(words);
        word2 = randomizeWord(words2);
        word3 = randomizeWord(words3);
        return word1 + " " + word2 + " " + word3;
    };

    phrase = getRandomPhrase();

    function randomizeWord(inputWords) {
        return inputWords[Math.floor(Math.random() * inputWords.length)];
    };

    console.log(passPhrase);
}

// Defunct Parts And Things That Worked But Weren't What I Needed //
/*
Originally, this selected an array of class items and edited their display properties through a loop:

    var elements = new Array();

    window.onload = function() {
        elements = document.getElementsByClassName('hint');
        ...
    }

    function hideHints() {
        for (var i = 0, max = elements.length; i < max; i++) {
            elements[i].style.display = "none";
        };
    };
*/

