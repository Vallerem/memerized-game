
// Set the main variables that will change during the game

var newQuestion;
var playerlives = 2;
var playerScore = 0;

// Set the initial background randomnly

var images = ["img/001.jpg",
  "img/002.jpg",
  "img/003.jpg",
  "img/004.jpg",
  "img/005.jpg",
  "img/006.jpg",
];

var randomNumber = Math.floor(Math.random() * images.length);
var bgImg = "url(" + images[randomNumber] + ")";


$(".memerized-game").css({
  "background": bgImg,
  "background-size": "cover",
});


$(document).ready(function() {



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
      newQuestion = new Quiz(getRandomQuestion());
      });

      //Sets the answer as right or worng

  $(".btn-answer").on("click", function(){
    newQuestion.userAnswer = $(this).attr("cosa");
    console.log(newQuestion.checkUserAnswer());
  });

  $(".btn-continue").on("click", function(){
    $(".results-container").addClass("hidden");
    $(".question-panel").removeClass("hidden");
    newQuestion = new Quiz(getRandomQuestion());
  });


  });


















});
