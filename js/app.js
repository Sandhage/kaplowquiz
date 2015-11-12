// Global Variables
var defuseCode  = null;
var cutRed      = null;
var cutGreen    = null;
var cutBlue     = null;
var cutYellow   = null;
var ejectPower  = null;


// Application
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var interval = setInterval(function () {
        minutes      = parseInt(timer / 60, 10);
        seconds      = parseInt(timer % 60, 10);

        minutes      = minutes < 10 ? "0" + minutes : minutes;
        seconds      = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (minutes == 27 && seconds == 0) {
            hideHints();
            console.log('Hide RIGHT NOW');
            showQuestion();
        }

        if (--timer < 0) {
        	alert("DONE");
            timer = duration;
            clearInterval(interval);
        }
    }, 10);
}

window.onload = function() {
    // Set the timer for 30 seconds
    var thirtySeconds = 60 * 30;
        display = document.querySelector('#timerDiv');
    document.querySelector('button').addEventListener('click', function () {
    	startTimer(thirtySeconds, display);
        showHints();
    });

    // Set the 4-digit defusal code
    setCode(0, 9999);

    // Set Wires
    setWires();

    // Set Power Source
    setPower();

    // Set the question objects
    var codeQuery = mkdefuseQuery("Four Digit Code", "What is the 4 digit code?", defuseCode);
    console.log(codeQuery);
    var wireQuery = mkdefuseQuery("Wires", "Which wires do you need to cut?", [cutRed, cutGreen, cutBlue, cutYellow]);
    console.log(wireQuery);
    var powerQuery = mkdefuseQuery("Power Source", "Do you need to remove the power source?", ejectPower);
    console.log(powerQuery);

};



// Global Functions

// Show/Hide functions
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

// Make "defusalQuery" (AKA Question) Objects
function mkdefuseQuery(type, query, items) {
    var defuseQuery = {};

    defuseQuery.type    = type;
    defuseQuery.query   = query;
    defuseQuery.items   = items;
    defuseQuery.guess   = '';

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
    // Set wire color variables, randomly generate values 1-10
    cutRed    = Math.floor((Math.random() * 10) + 1);
    cutGreen  = Math.floor((Math.random() * 10) + 1);
    cutBlue   = Math.floor((Math.random() * 10) + 1);
    cutYellow = Math.floor((Math.random() * 10) + 1);

    // Translate cutRed to Boolean
    if (cutRed <= 5) {
        cutRed = true;
    } else {
        cutRed = false;
    };

    // Translate cutGreen to Boolean
    if (cutGreen <= 5) {
        cutGreen = true;
    } else {
        cutGreen = false;
    };

    // Translate cutBlue to Boolean
    if (cutBlue <= 5) {
        cutBlue = true;
    } else {
        cutBlue = false;
    };

    // Translate cutYellow to Boolean
    if (cutYellow <= 5) {
        cutYellow = true;
    } else {
        cutYellow = false;
    };

    // Check to make sure it's working!
    // console.log(cutRed, cutGreen, cutBlue, cutYellow);
};

// Power Source Boolean Value Generator
function setPower() {
    ejectPower = Math.floor((Math.random() * 10) + 1);

    if (ejectPower <= 5) {
        ejectPower = true;
    } else {
        ejectPower = false;
    };
};

/* Defunct Parts And Things That Worked But Weren't What I Needed

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