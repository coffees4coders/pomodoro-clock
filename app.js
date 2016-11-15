window.onload = function() {
  var breakMinusButton = document.getElementById('break-minus'),
      breakPlusButton = document.getElementById('break-plus'),
      sessionMinusButton = document.getElementById('session-minus'),
      sessionPlusButton = document.getElementById('session-plus');




  breakMinusButton.addEventListener('click', function() {
    var breakTimer = document.getElementById('break-time');
    var currentNumber = parseInt(breakTimer.innerHTML);

    if (currentNumber > 0) {
    breakTimer.innerHTML = currentNumber - 1;
    }
  });

  breakPlusButton.addEventListener('click', function() {
    var breakTimer = document.getElementById('break-time');
    var currentNumber = parseInt(breakTimer.innerHTML);


    breakTimer.innerHTML = currentNumber + 1;

  });

  sessionMinusButton.addEventListener('click', function() {
    var sessionTimer = document.getElementById('session-time');
    var currentNumber = parseInt(sessionTimer.innerHTML);

    if (currentNumber > 0) {
    sessionTimer.innerHTML = currentNumber - 1;
    }
  });

  sessionPlusButton.addEventListener('click', function() {
    var sessionTimer = document.getElementById('session-time');
    var currentNumber = parseInt(sessionTimer.innerHTML);


    sessionTimer.innerHTML = currentNumber + 1;

  });



};
