// Global Variables //
var defuseCode      = null;
var cut = {
	red: 		false,
	blue: 	false,
	green: 	false,
	yellow: false
}; 
var ejectPower			= false;
var codeQuery       = null;
var wireQuery       = null;
var powerQuery      = null;
var phraseQuery     = null;
var currentQuestion = null;
var clickedAnswer   = null;
    // Test for functionality, make local later (maybe?)
var words = {
	pool1: ["spooky", "tired", "gnarly", "mystery", "brave"],
	pool2: ["ghost", "archer", "mister", "monkey", "sick"],
	pool3: ["speaks", "eats", "knows", "hates", "is"],
	pool4: ["devil", "arrow", "explosion", "proceed", "sleep"]
}
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
    // More Wires
var checkRed    = false;
var checkGreen  = false;
var checkBlue   = false;
var checkYellow = false;
    // Early Finish
var timeCheck = false;


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
            hideHintDiv();
            hideHints();
            showQuestion();
            setQuestion(wireQuery);
        }

        if ( timeCheck ) {
            alert("DONE"); 
            hideAnswers();
            timer = duration;
            clearInterval(interval);
            checkWin();
        } else if ( --timer < 0 ) {
            alert("DONE"); 
            hideAnswers();
            timer = duration;
            clearInterval(interval);
            checkWin();
        }
    }, 10);
}

window.onload = function() {
    // Set element class selector
    elements = document.getElementsByClassName('answer');

    // Set all defusal variables (Code, Wire, Powersource)
    resetDefusal();

    // Set the question objects
    setdefuseQueries();

    // Set all defusal hints
    showHints();

    // Set the timer for 30 seconds
    var thirtySeconds = 60 * 35;
    display = document.querySelector('#timer-div');

    // Show instructions & set event listener to remove buttons
    document.getElementById('instructions').style.display = 'block';
        document.querySelector('#instruction-button').addEventListener('click', function () {
        document.getElementById('instructions').style.display = 'none';
    });


    // Start timer and quiz
    document.querySelector('#start-quiz').addEventListener('click', function () {
        startTimer(thirtySeconds, display);
        setHints();
        showHintDiv();
    });

    // Event listeners for answer-input
    document.querySelector('#ans1').addEventListener('click', function() {
        clickedAnswer = document.querySelector('#ans1').firstElementChild.innerHTML;
        checkAnswer();

        if ( clickedAnswer == "yes" ) {
            timeCheck = true;
        } else if ( clickedAnswer == "no" ) {
            timeCheck = true;
        }
    });
    document.querySelector('#ans2').addEventListener('click', function() {
        clickedAnswer = document.querySelector('#ans2').firstElementChild.innerHTML;
        checkAnswer();
       if ( clickedAnswer == "yes" ) {
            timeCheck = true;
        } else if ( clickedAnswer == "no" ) {
            timeCheck = true;
        }
    });
    document.querySelector('#ans3').addEventListener('click', function() {
        clickedAnswer = document.querySelector('#ans3').firstElementChild.innerHTML;
        checkAnswer();
    });
    document.querySelector('#ans4').addEventListener('click', function() {
        clickedAnswer = document.querySelector('#ans4').firstElementChild.innerHTML;
    });
    document.querySelector('#codeinput-id').addEventListener('keyup', function(e) {
        if ( e.keyCode == 13 ) {
            clickedAnswer = document.querySelector('#codeinput-id').value;
            checkAnswer();
        }
    });
    document.querySelector('#wire-answer1').addEventListener('click', function() {
        if ( checkRed == false ) {
            checkRed = true;
            document.getElementById('wire-answer1').className += ' cut';
        } else {
            checkRed = false;
            document.getElementById('wire-answer1').className = 'wires';
        }
    });
    document.querySelector('#wire-answer2').addEventListener('click', function() {
        if ( checkGreen == false ) {
            checkGreen = true;
            document.getElementById('wire-answer2').className += ' cut';
        } else {
            checkGreen = false;
            document.getElementById('wire-answer2').className = 'wires';
        }
    });
    document.querySelector('#wire-answer3').addEventListener('click', function() {
        if ( checkBlue == false ) {
            checkBlue = true;
            document.getElementById('wire-answer3').className += ' cut';
        } else {
            checkBlue = false;
            document.getElementById('wire-answer3').className = 'wires';
        }
    });
    document.querySelector('#wire-answer4').addEventListener('click', function() {
        if ( checkYellow == false ) {
            checkYellow = true;
            document.getElementById('wire-answer4').className += ' cut';
        } else {
            checkYellow = false;
            document.getElementById('wire-answer4').className = 'wires';
        }
    });
    document.querySelector('#wire-submit').addEventListener('click', function() {
        checkAnswer();
    });
    document.querySelector('#reset-quiz').addEventListener('click', function() {
        playAgain();
    });
};

// Logic to check each answer, based first on what type of question you're dealing with
function checkAnswer() {
    if ( currentQuestion == wireQuery ) {
        var correct = true;    
        
        if ( checkRed != cut.red ) {
            correct = false;
        } else if ( checkGreen != cut.green ) {
            correct = false;
        } else if ( checkBlue != cut.blue ) {
            correct = false;
        } else if ( checkYellow != cut.yellow ) {
            correct = false;
        }

        if ( correct ) {
            wireQuery.answered++;
            // alert('correct! +1');
            setQuestion(codeQuery)
        } else {
            // alert('Woopsie!');
            setQuestion(codeQuery)
        }

    } else 

    if ( currentQuestion == codeQuery ) {
        if ( clickedAnswer == codeQuery.items ) {
            // alert('Correct answer worked!');
            codeQuery.answered++;
            setQuestion(phraseQuery);
        } else {
            // alert('Consarnit!');
            setQuestion(phraseQuery);
        }
    } else if ( currentQuestion == powerQuery ) {
        if ( clickedAnswer == "yes" && powerQuery.items ) {
            // alert('Correct answer worked!');
            powerQuery.answered++;
        } else if ( clickedAnswer == "no" && !powerQuery.items ) {
            // alert('Correct answer worked!');
            powerQuery.answered++;
        } else {
            // alert('Gosh Darn!');
        }
    } else if ( currentQuestion == phraseQuery ) {
        if ( clickedAnswer == passPhrase ) {
            // alert('Correct answer worked!');
            phraseQuery.answered++;
            setQuestion(powerQuery);
        } else {
            // alert('Oof!');
            setQuestion(powerQuery);
        }
    }
}

// Check win conditions
function checkWin() {
    var answerTotal = wireQuery.answered + codeQuery.answered + phraseQuery.answered + powerQuery.answered;
    console.log(answerTotal);

    if ( answerTotal == 4 ) {
        document.getElementById('result-win').firstElementChild.innerHTML = "You didn't explode! Holy cow, great job!"
    } else {
        document.getElementById('result-win').firstElementChild.innerHTML = "Kaplow! You lose!"
    }

    hideQuestion();
    showResults();

}


// Global Functions //
// Show/hide functions
function showHints() {
    document.getElementById('hintsect-id').style.display = "block";
}

function hideHints() {
    document.getElementById('hintsect-id').style.display = "none";
}

function showHintDiv() {
    document.getElementById('hint-wire').style.display   = 'block';
    document.getElementById('hint-code').style.display   = 'block';
    document.getElementById('hint-phrase').style.display = 'block';
    document.getElementById('hint-power').style.display  = 'block';
}

function hideHintDiv() {
    document.getElementById('hint-wire').style.display   = 'none';
    document.getElementById('hint-code').style.display   = 'none';
    document.getElementById('hint-phrase').style.display = 'none';
    document.getElementById('hint-power').style.display  = 'none';
}

function showQuestion() {
    document.getElementById('ans5').style.display       = 'none';
    document.getElementById('defusesect-id').style.display = "block";
}

function hideQuestion() {
    document.getElementById('defusesect-id').style.display = "none";
}

function showResults() {
    document.getElementById('resultsect-id').style.display = "block";
}

function hideResults() {
    document.getElementById('resultsect-id').style.display = "none";
}

function showAnswers() {
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

// Set all "defusalQuery" (AKA Question) objects
function setdefuseQueries() {
    codeQuery   = mkdefuseQuery("Four Digit Code", "What is the 4 digit code?", defuseCode);
        // console.log(codeQuery);
    wireQuery   = mkdefuseQuery("Wires", "Which wires do you need to cut?", [cut.red, cut.green, cut.blue, cut.yellow]);
        // console.log(wireQuery);
    powerQuery  = mkdefuseQuery("Power Source", "Do you need to remove the power source?", ejectPower);
        // console.log(powerQuery);
    phraseQuery = mkdefuseQuery("Pass Phrase", "Which is the correct pass phrase?", passPhrase);
}

// 4-digit defusal code generator
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

// Wire boolean value generator
function setWires() {
	var colors = {
		red: 		0,
		green:  0,
		blue: 	0, 
		yellow: 0
	};

	for (var color in colors) {
		colors[color] = randomSmallNum();
		
		if (colors[color]) {
			cut[color] = true
		}
	}
}

// Power source Boolean value generator
function setPower() {
	// Set yes/no eject power variable
	var tempPower = randomSmallNum();

	// Translate ejectPower to Boolean
	if (tempPower) {
			ejectPower = true;
	}
}

// Small number generator
function randomSmallNum() {
	return Math.floor(Math.random() * 2);
}

// Reset all answer variables
function resetDefusal() {
	setCode(0, 9999);
	setWires();
	setPower();
	setPhrase();
	obfPhrase();
}

// Play again function
function playAgain() {
	timeCheck       = false;
	currentQuestion = null;
	clickedAnswer   = null;

	hideResults();
	showHints();

	display.textContent = "00:00";

	resetDefusal();

	codeQuery.items 	= defuseCode;
	wireQuery.items 	= [cut.red, cut.green, cut.blue, cut.yellow];
	phraseQuery.items = passPhrase;
	powerQuery.items  = ejectPower;

	setHints();
}

// Set all defuse hints
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
			document.getElementById('hint-power').firstElementChild.innerHTML  = "Should you remove the power source?   yes";
	} else {
			document.getElementById('hint-power').firstElementChild.innerHTML  = "Should you remove the power source?   no";
	}

	document.getElementById('hint-code').firstElementChild.innerHTML   = "The code is:   " + codeQuery.items;
	document.getElementById('hint-phrase').firstElementChild.innerHTML = "The pass phrase is:   " + phraseQuery.items;
	document.getElementById('hint-wire').firstElementChild.innerHTML   = "You need to cut:   " + tempWires;
}

// Set current defusal question
function setQuestion(queryObject) {
    document.getElementById('defusesect-id').firstElementChild.innerHTML = queryObject.query;
    
    if ( queryObject == wireQuery ) {
        currentQuestion = wireQuery;
        
        hideAnswers();

        // Show wire divs
        document.getElementById('hidden-wires').style.display = 'block';

    }

    if ( queryObject == codeQuery ) {
        currentQuestion = codeQuery;

        document.getElementById('hidden-wires').style.display = 'none';
        hideAnswers();
        
        document.getElementById('codeinput-id').placeholder = "Enter Code and Press Enter";
        
        document.getElementById('ans5').style.display = 'block';
    }

    if ( queryObject == powerQuery ) {
        currentQuestion = powerQuery;

        hideAnswers();

        document.getElementById('ans1').innerHTML = '<p>yes</p>';
        document.getElementById('ans2').innerHTML = '<p>no</p>';
        document.getElementById('ans1').style.display = 'block';
        document.getElementById('ans2').style.display = 'block';
    }

    if (queryObject == phraseQuery) {
        currentQuestion = phraseQuery;

        hideAnswers();
        
        // answerElement = document.getElementsByClassName('answer');
        var tempArray = [passPhrase, liarPhrase1, liarPhrase2, liarPhrase3];

        scramblePhrase(tempArray);

				tempArray.forEach(function(phrase) {
					document.getElementById('ans' + (tempArray.indexOf(phrase) + 1)).innerHTML = '<p>' + phrase + '</p>';
				});

        showAnswers();
    }

}


// Pass Phrase Generators
function setPhrase() {
    passPhrase = getRandomPhrase();
    
    phraseArray = [word1, word2, word3, word4];
}

function getRandomPhrase() {
    word1 = randomizeWord(words.pool1);
    word2 = randomizeWord(words.pool2);
    word3 = randomizeWord(words.pool3);
    word4 = randomizeWord(words.pool4);
    return word1 + " " + word2 + " " + word3 + " " + word4;

    function randomizeWord(inputWords) {
        return inputWords[Math.floor(Math.random() * inputWords.length)];
    };
};

function scramblePhrase(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there are remaining words to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining word...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current word.
    temporaryValue 			= array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex]  = temporaryValue;
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
