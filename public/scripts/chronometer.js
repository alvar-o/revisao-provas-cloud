let timer = new easytimer.Timer();
let timerRunning = false;

$('.chronometer-buttons .playPauseButton').click(function () {
    if (timerRunning) {
        timer.pause();
        timerRunning = false;
    } else {
        timer.start();
        timerRunning = true;
    }
    $(this).children().toggleClass('fa-play fa-pause');
});
// $('.chronometer-buttons .pauseButton').click(function () {
//     timer.pause();
// });
$('.chronometer-buttons .stopButton').click(function () {
    timer.stop();
    $('.chronometer-buttons .playPauseButton').children().removeClass('fa-pause').addClass('fa-play');
    timerRunning = false;
});
$('.chronometer-buttons .resetButton').click(function () {
    timer.reset();
    $('.chronometer-buttons .playPauseButton').children().removeClass('fa-play').addClass('fa-pause');
    timerRunning = true;
});

timer.addEventListener('secondsUpdated', function (e) {
    $('.values').html(timer.getTimeValues().toString(['minutes', 'seconds']));
});
timer.addEventListener('started', function (e) {
    $('.values').html(timer.getTimeValues().toString(['minutes', 'seconds']));
});
timer.addEventListener('reset', function (e) {
    $('.values').html(timer.getTimeValues().toString(['minutes', 'seconds']));
});

// Space-bar toggles timer
$('#modalChronometer').keypress((e) => {
    if (e.code === 'Space') {
        $('.chronometer-buttons .playPauseButton').click();
    } else if (e.code === 'Enter') {
        timer.stop();
        if (timerRunning) {
            $('.chronometer-buttons .playPauseButton').children().removeClass('fa-pause').addClass('fa-play');
            timerRunning = false;
        }
        $('#registerTime').click();
    }
});

$('#registerTime').click(() => {
    // register the time
    $('#question .time').text($('#chronometer .values').text());
    // close the modal
    $('#modalChronometer').modal('hide');
});

