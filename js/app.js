function startTimer(duration, display) {
    var timer = duration, minutes, seconds, milliseconds;
    var interval = setInterval(function () {
        minutes      = parseInt(timer / 60, 10);
        seconds      = parseInt(timer % 60, 10);
        // milliseconds = parseInt(timer % 60, 10);

        minutes      = minutes < 10 ? "0" + minutes : minutes;
        seconds      = seconds < 10 ? "0" + seconds : seconds;
        // milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

        display.textContent = minutes + ":" + seconds /* + ":" + milliseconds */ ;

        // document.getElementsByClassName("hint").style.display = "block";

        // if (--timer <= 12) {
        //     document.body.querySelector(".hint").hide();
        // } else 
        if (--timer < 0) {
        	alert("DONE");
            timer = duration;
            clearInterval(interval);

        }
    }, 10);
}

window.onload = function () {
    var fiveMinutes = 60 * 15;
        display = document.querySelector('#timerDiv');
    document.querySelector('button').addEventListener('click', function () {
    	startTimer(fiveMinutes, display);
    });
};