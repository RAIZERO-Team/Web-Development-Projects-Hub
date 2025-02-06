$(document).ready(function () {
    // Navigation between sections
    $(".stopwatch-btn").click(function () {
        $(".outer-wrapper > div").slideUp();
        $(".stopwatch").slideDown();
        $(".type").html("Stopwatch");
    });

    $(".timer-btn").click(function () {
        $(".outer-wrapper > div").slideUp();
        $(".timer").slideDown();
        $(".type").html("Timer");
    });

    $(".back-btn").click(function () {
        $(".outer-wrapper > div").slideUp();
        $(".clock").slideDown();
        $(".type").html("Clock");
    });

    // Clock Function
    const addTrailingZero = (num) => (num < 10 ? "0" + num : num);

    const updateTime = () => {
        const time = new Date();
        let Hours = time.getHours();
        let Minutes = time.getMinutes();
        let Seconds = time.getSeconds();
        let ampm = Hours >= 12 ? "PM" : "AM";

        Hours = Hours % 12 || 12;
        $("#hour").html(addTrailingZero(Hours));
        $("#min").html(addTrailingZero(Minutes));
        $("#sec").html(addTrailingZero(Seconds));
        $("#ampm").html(ampm);
    };

    updateTime();
    setInterval(updateTime, 1000);

    // Stopwatch
    let stopwatchHours = 0,
        stopwatchMinutes = 0,
        stopwatchSeconds = 0,
        stopwatchMilliseconds = 0,
        stopWatchRunning = false,
        stopwatchInterval;

    const stopwatch = () => {
        stopwatchMilliseconds++;
        if (stopwatchMilliseconds === 100) {
            stopwatchSeconds++;
            stopwatchMilliseconds = 0;
        }
        if (stopwatchSeconds === 60) {
            stopwatchMinutes++;
            stopwatchSeconds = 0;
        }
        if (stopwatchMinutes === 60) {
            stopwatchHours++;
            stopwatchMinutes = 0;
        }

        $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
        $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
        $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
        $("#stopwatch-ms").html(addTrailingZero(stopwatchMilliseconds));
    };

    const startStopwatch = () => {
        if (!stopWatchRunning) {
            stopwatchInterval = setInterval(stopwatch, 10);
            stopWatchRunning = true;
        }
    };

    const stopStopwatch = () => {
        clearInterval(stopwatchInterval);
        stopWatchRunning = false;
    };

    const resetStopwatch = () => {
        stopStopwatch();
        stopwatchHours = 0;
        stopwatchMinutes = 0;
        stopwatchSeconds = 0;
        stopwatchMilliseconds = 0;

        $("#stopwatch-hour, #stopwatch-min, #stopwatch-sec, #stopwatch-ms").html("00");
        $(".laps").html("");
    };

    $(".start-stopwatch").click(function () {
        startStopwatch();
        $(".start-stopwatch").hide();
        $(".lap-stopwatch").show();
    });

    $(".reset-stopwatch").click(function () {
        resetStopwatch();
        $(".start-stopwatch").show();
        $(".lap-stopwatch").hide();
    });

    $(".lap-stopwatch").click(function () {
        let lapTime = `${addTrailingZero(stopwatchHours)}:${addTrailingZero(stopwatchMinutes)}:${addTrailingZero(stopwatchSeconds)}:${addTrailingZero(stopwatchMilliseconds)}`;
        $(".laps").prepend(`<div class="lap active"><p>Lap</p><p>${lapTime}</p></div>`);
    });

    // Timer
    let timerHours = 0,
        timerMinutes = 0,
        timerSeconds = 0,
        timerMilliseconds = 0,
        timerInterval;

    const setTime = () => {
        $("#timer-hour").html(addTrailingZero(timerHours));
        $("#timer-min").html(addTrailingZero(timerMinutes));
        $("#timer-sec").html(addTrailingZero(timerSeconds));
        $("#timer-ms").html(addTrailingZero(timerMilliseconds));
    };

    const getTime = () => {
        let userInput = prompt("Enter time in Minutes");
        let totalSeconds = parseInt(userInput) * 60;
        if (!isNaN(totalSeconds)) {
            timerHours = Math.floor(totalSeconds / 3600);
            timerMinutes = Math.floor((totalSeconds % 3600) / 60);
            timerSeconds = totalSeconds % 60;
            setTime();
        }
    };

    const timer = () => {
        if (timerMilliseconds === 0 && timerSeconds === 0 && timerMinutes === 0 && timerHours === 0) {
            stopTimer();
            alert("Time's Up!");
            return;
        }

        timerMilliseconds--;
        if (timerMilliseconds < 0) {
            timerMilliseconds = 99;
            timerSeconds--;
        }
        if (timerSeconds < 0) {
            timerSeconds = 59;
            timerMinutes--;
        }
        if (timerMinutes < 0) {
            timerMinutes = 59;
            timerHours--;
        }
        setTime();
    };

    const startTimer = () => {
        if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0 && timerMilliseconds === 0) {
            getTime();
        }
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(timer, 10);
        $(".start-timer").hide();
        $(".stop-timer").show();
    };

    const stopTimer = () => {
        clearInterval(timerInterval);
        $(".start-timer").show();
        $(".stop-timer").hide();
    };

    const resetTimer = () => {
        stopTimer();
        timerHours = 0;
        timerMinutes = 0;
        timerSeconds = 0;
        timerMilliseconds = 0;
        setTime();
    };

    $(".start-timer").click(startTimer);
    $(".stop-timer").click(stopTimer);
    $(".reset-timer").click(resetTimer);
});
