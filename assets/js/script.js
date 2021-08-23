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

var quizStart = function () {
  // delete quizStart
  var quizStartEl = document.getElementById("first-page");
};

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

// running function
highScore();
