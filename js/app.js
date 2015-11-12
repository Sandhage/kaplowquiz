// Global Variables //
var defuseCode  = null;
var cutRed      = false; // For the boolean value questions, when making reset function
var cutGreen    = false; // make sure to reset the variables to false.
var cutBlue     = false;
var cutYellow   = false;
var ejectPower  = false;
var codeQuery   = null;
var wireQuery   = null;
var powerQuery  = null;

// Application //
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var interval = setInterval(function () {
        minutes  = parseInt(timer / 60, 10);
        seconds  = parseInt(timer % 60, 10);

        minutes  = minutes < 10 ? "0" + minutes : minutes;
        seconds  = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (minutes == 26 && seconds == 0) {
            hideHints();
            showQuestion();
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
    // Set the 4-digit defusal code
    setCode(0, 9999);

    // Set wires
    setWires();

    // Set power source
    setPower();

    // Set the Question Objects
    codeQuery = mkdefuseQuery("Four Digit Code", "What is the 4 digit code?", defuseCode);
        // console.log(codeQuery);
    wireQuery = mkdefuseQuery("Wires", "Which wires do you need to cut?", [cutRed, cutGreen, cutBlue, cutYellow]);
        // console.log(wireQuery);
    powerQuery = mkdefuseQuery("Power Source", "Do you need to remove the power source?", ejectPower);
        // console.log(powerQuery);

    // Set hints
    document.getElementById('hintCode').firstElementChild.innerHTML  = codeQuery.items;
    document.getElementById('hintWire').firstElementChild.innerHTML  = wireQuery.items;
    document.getElementById('hintPower').firstElementChild.innerHTML = powerQuery.items;

    // Set the timer for 30 Seconds
    var thirtySeconds = 60 * 30;
        display = document.querySelector('#timerDiv');

    // Start timer and quiz
    document.querySelector('button').addEventListener('click', function () {
        startTimer(thirtySeconds, display);
        showHints();
    });

    // Pull questions to container -- will eventually be moved timer/answer


};



// Global Functions //

// Show/hide functions
function showHints() {
    document.getElementById('hintSect').style.display = "block";
};

function hideHints() {
    document.getElementById('hintSect').style.display = "none";
};

function showQuestion() {
    document.getElementById('defuseSect').style.display = "block";
};

function hideQuestion() {
    document.getElementById('defuseSect').style.display = "none";
};

// Make "defusalQuery" (AKA Question) objects
function mkdefuseQuery(type, query, items) {
    var defuseQuery = {};

    defuseQuery.type       = type;
    defuseQuery.query      = query;
    defuseQuery.items      = items;
    defuseQuery.guess      = null;
    defuseQuery.answered   = 0;

    return defuseQuery;

};

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
};

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
    console.log(cutRed, cutGreen, cutBlue, cutYellow);
};

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
};

// Small Number Generator
function randomSmallNum() {
    return Math.floor(Math.random() * 2);
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