
// Set the main variables that will change during the game

var newQuestion;
var playerLives = 3;
var playerScore = 0;

var images = ["img/001.jpg",
  "img/003.jpg",
  "img/004.jpg",
];

$(document).ready(function() {

  // Set the initial background randomnly
  var randomNumber = Math.floor(Math.random() * images.length);
  var bgImg = "url(" + images[randomNumber] + ")";


  $(".memerized-game").css({
    "background": bgImg,
    "background-size": "cover",
  });

  // Display Lives & Score
  $(".player-lives").text(playerLives);
  $(".player-score").text(playerScore);

  // Optional FadeIn() for the images

  // $(function () {
  //     var i = 0;
  //     $(".memerized-game").css({
  //       'background': bgImg,
  //       'background-size': 'cover',
  //     });
  //     setInterval(function () {
  //         i++;
  //         if (i == images.length) {
  //             i = 0;
  //         }
  //         $(".memerized-game").fadeOut("slow", function () {
  //             $(this).css({
  //               'background': bgImg,
  //               'background-size': 'cover',
  //             });
  //             $(this).fadeIn("fast");
  //         });
  //     }, 5000);
  // });

      //On click check answer and start minigame

  $(".btn-startu").on("click", function(){
    $(".memerized-game").fadeTo(2000, 0, function() {
      $(".memerized-game").addClass("hidden");
      $(".question-panel").removeClass("hidden");
      $(".display-stats").removeClass("hidden");
      newQuestion = new Quiz(getRandomQuestion());

      });

      //Sets the answer as right or worng


  $(".btn-answer").on("click", function(){
    newQuestion.userAnswer = $(this).attr("cosa");
    newQuestion.checkUserAnswer();
  });

  $(".btn-answer").one("click",function(event) {
    $(".btn-answer").unbind("click");
  });

  $(".btn-continue").on("click", function(){
    $(".results-container").addClass("hidden");
    $(".question-panel").empty();
    $(".question-panel").append('<div class="row question"><div class=" row question-perse"> </div></div><div class="row buttons"><button type="button" class="btn btn-answer btn-primary" cosa="true">TRUE</button><button type="button" class="btn btn-answer btn-danger" cosa="false">FALSE</button></div>');
    $(".btn-answer").on("click", function(){
      newQuestion.userAnswer = $(this).attr("cosa");
      newQuestion.checkUserAnswer();
    });
    $(".btn-answer").one("click",function(event) {
      $(".btn-answer").unbind("click");
    });
    $(".question-panel").removeClass("hidden");
    $(".feedback-answer").remove();
    newQuestion = new Quiz(getRandomQuestion());
  });





  });


















});
