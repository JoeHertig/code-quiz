// dom elements
var timerEl = document.querySelector("#countdown");
var startBtn = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var optionsEl = document.querySelector("#o");
var submitBtn = document.querySelector("#submit");
var nameEl = document.querySelector("#player-name");
var answeredEl = document.querySelector("#answered");

// global variables
var globalIndex = 0;
var time = questions.length * 15;
var timerId;

// Questions start //
var questions = [
  {
    q: "Commonly used data types DO NOT include:",
    o: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    a: "3. alerts",
  },
  {
    q: "The condition in an if / else statement is enclosed within ____.",
    o: [
      "1. quotes",
      "2. curly brackets",
      "3. parentheses",
      "4. square brackets",
    ],
    a: "3. parentheses",
  },
  {
    q: "Arrays in JavaScript can be used to store _____.",
    o: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    a: "4. all of the above",
  },
  {
    q: "String values must be enclosed within _____ when being assigned to variables.",
    o: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    a: "3. quotes",
  },
  {
    q: "A very useful tool used during development and debugging for printing content to the debugger is:",
    o: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
    a: "4. console.log",
  },
];
/* Questions end */

var quizStart = function () {
  // delete quizStart
  var quizStartEl = document.getElementById("first-page");
  quizStartEl.setAttribute("class", "delete");

  // un delete questions section
  questionsEl.removeAttribute("class");

  // start timer
  timerId = setInterval(clockTick, 1000);

  // show time
  timerEl.textContent = time;

  getQuestion();
};

var findQuestion = function () {
  // find question from array
  var currentQuestion = questions[globalIndex];

  // update title with current question
  var titleEl = document.getElementById("q");
  titleEl.textContent = currentQuestion.title;

  // clear old question "o"
  optionsEl.innerHTML = "";

  // loop options
  currentQuestion.options.forEach(function (option, i) {
    // creating new buttons
    var optionNode = document.createElement("button");
    optionNode.setAttribute("class", "option");
    optionNode.setAttribute("value", option);

    optionNode.textContent = i + 1 + ". " + option;

    //click even listener
    optionNode.onclick = questionClick;

    // add to page
    optionsEl.appendChild(optionNode);
  });
};

var questionClick = function () {
  // checking answer
  if (this.value !== questions[globalIndex].a) {
    // subtract time
    time -= 15;

    if (time < 0) {
      time = 0;
    }
    // display corrected time
    timerEl.textContent = time;
    // wrong text style
    answeredEl.textContent = "Wrong!";
    answeredEl.style.opacity = "0.5";
  } else {
    answeredEl.textContent = "Correct!";
    answeredEl.style.opacity = "0.5";
  }

  // what player anwered with
  answeredEl.setAttribute("class", "answered");
  setTimeout(function () {
    answeredEl.setAttribute("class", "answered delete");
  }, 1000);

  // next question
  globalIndex++;

  // time checker
  if (globalIndex === questions.length) {
    quizEnd();
  } else {
    findQuestion();
  }
};

var quizEnd = function () {
  // stop timer
  clearInterval(timerId);

  // show end quiz
  var endQuizEl = document.getElementsById("end-quiz");
  endQuizEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  //hide questions section
  questionsEl.setAttribute("class", "hide");
};

var clockTick = function () {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
};

var saveHighScore = function () {
  // get value of input box
  var playerName = nameEl.value.trim();

  if (playerName !== "") {
    //get saved scores from lacalstorage, or if not any, set to empty array
    var playerScore =
      JSON.parse(window.localStorage.getItem("player-score")) || [];

    //format new score object for current user
    var newScore = {
      score: time,
      playername: playerName,
    };

    //save to localstorage
    playerScore.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(playerScore));

    // redirect to next page
    highScore();
  }
};

var checkForEnter = function (event) {
  if (event.key === "Enter") {
    saveHighScore();
  }
};

var highScore = function () {
  // localStorage score or setting to empty array
  var playerScore =
    JSON.parse(window.localStorage.getItem("player-score")) || [];

  // sort highscores by score property
  playerScore.sort(function (a, b) {
    return b.score - a.score;
  });

  playerScore.forEach(function (score) {
    // Made li tag
    var listItemEl = document.createElement("li");
    listItemEl.textContent = score.initials + " - " + score.score;

    // display on page
    var olEl = document.getElementById("player-score");
    olEl.appendChild(listItemEl);
  });
};

var clearHighScores = function () {
  window.localStorage.removeItem("player-score");
  window.location.reload();
};

document.getElementById("#refresh").onclick = clearHighScores;

// // running function
// highScore();

submitBtn.onclick = saveHighscore;

startBtn.addEventListener("click", quizStart);

nameEl.onkeyup = checkForEnter;

quizStart();
