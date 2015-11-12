// Global Variables
defuseCode = null;


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
    var fiveMinutes = 60 * 30;
        display = document.querySelector('#timerDiv');
    document.querySelector('button').addEventListener('click', function () {
    	startTimer(fiveMinutes, display);
        showHints();
    });
};



// Global Functions
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

function mkdefuseQuery(type, query, items) {
    var defuseQuery = {};

    defuseQuery.type    = type;
    defuseQuery.query   = query;
    defuseQuery.items   = items;
    defuseQuery.guess   = null;
    defuseQuery.correct = null;

}

function setCode(min, max) {
    defuseCode = Math.floor(Math.random()*(max-min+1)+min);
    if (defuseCode < 1000) {
        defuseCode = "0" + defuseCode;
    };
    console.log(defuseCode);
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