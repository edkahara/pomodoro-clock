$(document).ready(function() {
  //set initial styling and create variables
  document.body.style.backgroundColor = "purple";
  $('#pause, #reset, #workTimeLeft, #restTimeLeft, #finished, #resume').hide();
  var workCount = parseInt($('#workTime').html());
  var restCount = parseInt($('#restTime').html());
  var isRunning = true;

  //run a function when a button is clicked
  $('a').on('click', function(e) {
    //reduce rest time by 1 only if it is greater than 1
    if (this.id === 'minusRest') {
      if (restCount > 1) {
        restCount--;
        $('#restTime').html(restCount);
      }
    }
    //increase rest time by 1
    else if (this.id === 'plusRest') {
      restCount++;
      $('#restTime').html(restCount);
    }
    //reduce work time by 1 only if it is greater than 1
    else if (this.id === 'minusWork') {
      if (workCount > 1) {
        workCount--;
        $('#workTime').html(workCount);
      }
    }
    //increase work time by 1
    else if (this.id === 'plusWork') {
      workCount++;
      $('#workTime').html(workCount);
    }
    //start the clock
    else if (this.id === 'start') {
      document.body.style.backgroundColor = "green";
      if (workCount < 10) {
        $('#workTime').html('0' + workCount + ':00');
      } else if (workCount >= 10) {
        $('#workTime').html(workCount + ':00');
      }
      $('#work, #minusWork, #plusWork, #rest, #restTime, #minusRest, #plusRest, #start, #reset').hide();
      $('#workTimeLeft, #pause').show();

      //change time to seconds
      var work = workCount * 60;
      var rest = restCount * 60;
      var countDown = setInterval(startWork, 1000);
      isRunning = false;

      //start the work countdown and show the time left
      function startWork() {
        if (!isRunning) {
          work--;
          $('#workTime').html(work);
          if (work < 1) {
            clearInterval(countDown);
            $('#pause, #workTime, #workTimeLeft').hide();
            $('#restTime, #restTimeLeft').show();
            if (restCount < 10) {
              $('#restTime').html('0' + restCount + ':00');
            } else if (restCount >= 10) {
              $('#restTime').html(restCount + ':00');
            }
            document.body.style.backgroundColor = "red";
            var breakCountDown = setInterval(startBreak, 1000);
          }
          else if (work <= 600) {
            if (work % 60 >= 10) {
              $('#workTime').html('0' + Math.floor(work / 60) + ':' + (work % 60));
            } else {
              $('#workTime').html('0' + Math.floor(work / 60) + ':' + '0' + (work % 60));
            }
          }
          else {
            if (work % 60 >= 10) {
              $('#workTime').html(Math.floor(work / 60) + ':' + (work % 60));
            } else {
              $('#workTime').html(Math.floor(work / 60) + ':' + '0' + (work % 60));
            }
          }

          //start the rest countdown and show the time left
          function startBreak() {
            $('#restTime, #restTimeLeft').show();
            rest--;
            $('#restTime').html(rest);
            if (rest < 1) {
              clearInterval(breakCountDown);
              $('#restTime, #restTimeLeft').hide();
              $('#reset, #finished').show();
              document.body.style.backgroundColor = "purple";
            }
            else if (rest <= 600) {
              if (rest % 60 >= 10) {
                $('#restTime').html('0' + Math.floor(rest / 60) + ':' + (rest % 60));
              } else {
                $('#restTime').html('0' + Math.floor(rest / 60) + ':' + '0' + (rest % 60));
              }
            }
            else {
              if (rest % 60 >= 10) {
                $('#restTime').html(Math.floor(rest / 60) + ':' + (rest % 60));
              } else {
                $('#restTime').html(Math.floor(rest / 60) + ':' + '0' + (rest % 60));
              }
            }
          }
        }
      }

      //on click, pause the countdown
      $('#pause').on('click', function() {
        document.body.style.backgroundColor = "purple";
        isRunning = true;
        $('#pause').hide();
        $('#reset, #resume').show();
      });

      //on click, resume the countdown
      $('#resume').on('click', function() {
        document.body.style.backgroundColor = "green";
        isRunning = false;
        $('#resume, #reset').hide();
        $('#pause').show();
      });

      //on click, stop the countdown and reset the time
      $('#reset').on('click', function() {
        document.body.style.backgroundColor = "purple";
        clearInterval(countDown);
        workCount = 25;
        restCount = 5;
        $('#workTime').html(workCount);
        $('#restTime').html(restCount);
        $('#workTimeLeft, #reset, #finished, #resume').hide();
        $('#work, #minusWork, #plusWork, #rest, #restTime, #minusRest, #plusRest, #start, #workTime').show();
      });
    }
  });
});
