//Make the Questions (just strings)
var game;

var questionsArr = [{
    pregunta: "texto de la 3a preguntasdsdsds  dsdsds dsds dpr eguntasdsdsdsdsds  dsd sdsdsd sdsdsdsd spreguntasdsdsd sdsdsdsdsdsdsdsdsdsdsds ds dsdsdsdsdspreg untasdsd s ds dsdsd sdsdsd sdsds dsdsds",
    certedad: "false",
    backgroundQuestion: "url(img/003.jpg)",
  },
  {
    pregunta: "ttexto de la 3a preguntasdsdsds  dsdsdsdsdsdpreguntasdsdsdsdsds  dsdsdsdsd sdsdsdsd spreguntasdsdsd sdsdsdsdsdsdsdsdsdsdsds dsdsdsdsdsdspreg untasdsds ds dsdsd sdsdsdsdsds dsdsds",
    certedad: "true",
    backgroundQuestion: "url(img/004.jpg)"
   },
  {
    pregunta: "texto de la 3a preguntasdsdsds  dsdsdsdsdsdpreguntasdsdsdsdsds  dsdsdsdsd sdsdsdsd spreguntasdsdsd sdsdsdsdsdsdsdsdsdsdsds dsdsdsdsdsdspreg untasdsds ds dsdsd sdsdsdsdsds dsdsds",
    certedad: "false",
    backgroundQuestion: "url(img/005.jpg)"
  },
  {
    pregunta: "texto de la 3a preguntasdsdsds  dsdsds dsds dpr eguntasdsdsdsdsds  dsd sdsdsd sdsdsdsd spreguntasdsdsd sdsdsdsdsdsdsdsdsdsdsds ds dsdsdsdsdspreg untasdsd s ds dsdsd sdsdsd sdsds dsdsds",
    certedad: "true",
    backgroundQuestion: "url(img/004.jpg)"
  }, {
    pregunta: "texto de la 3a preguntasdsdsds  dsdsds dsds dpr eguntasdsdsdsdsds  dsd sdsdsd sdsdsdsd spreguntasdsdsd sdsdsdsdsdsdsdsdsdsdsds ds dsdsdsdsdspreg untasdsd s ds dsdsd sdsdsd sdsds dsdsds",
    certedad: "false",
    backgroundQuestion: "url(img/004.jpg)"
  }, {
    pregunta: "texto de la 3a preguntasdsdsds  dsdsds dsds dpr eguntasdsdsdsdsds  dsd sdsdsd sdsdsdsd spreguntasdsdsd sdsdsdsdsdsdsdsdsdsdsds ds dsdsdsdsdspreg untasdsd s ds dsdsd sdsdsd sdsds dsdsds",
    certedad: "true",
    backgroundQuestion: "url(img/004.jpg)"
  }, {
    pregunta: "texto de la 3a preguntasdsdsds  dsdsds dsds dpr eguntasdsdsdsdsds  dsd sdsdsd sdsdsdsd spreguntasdsdsd sdsdsdsdsdsdsdsdsdsdsds ds dsdsdsdsdspreg untasdsd s ds dsdsd sdsdsd sdsds dsdsds",
    certedad: "false",
    backgroundQuestion: "url(img/004.jpg)"
  }, {
    pregunta: "texto de la 3a preguntasdsdsds  dsdsds dsds dpr eguntasdsdsdsdsds  dsd sdsdsd sdsdsdsd spreguntasdsdsd sdsdsdsdsdsdsdsdsdsdsds ds dsdsdsdsdspreg untasdsd s ds dsdsd sdsdsd sdsds dsdsds",
    certedad: "true",
    backgroundQuestion: "url(img/004.jpg)"
  }, {
    pregunta: "texto de la 3a preguntasdsdsds  dsdsds dsds dpr eguntasdsdsdsdsds  dsd sdsdsd sdsdsdsd spreguntasdsdsd sdsdsdsdsdsdsdsdsdsdsds ds dsdsdsdsdspreg untasdsd s ds dsdsd sdsdsd sdsds dsdsds",
    certedad: "false",
    backgroundQuestion: "url(img/004.jpg)"
  }, {
    pregunta: "texto de la 3a preguntasdsdsds  dsdsds dsds dpr eguntasdsdsdsdsds  dsd sdsdsd sdsdsdsd spreguntasdsdsd sdsdsdsdsdsdsdsdsdsdsds ds dsdsdsdsdspreg untasdsd s ds dsdsd sdsdsd sdsds dsdsds",
    certedad: "true",
    backgroundQuestion: "url(img/004.jpg)"
  }
];

var getRandomQuestion = function() {
  var itemIndex = Math.floor(Math.random() * questionsArr.length);
  var itemValue = questionsArr[itemIndex];
  // The chosen question is also deleted from the array
  // to avoid repetition
  questionsArr.splice(itemIndex, 1);
  return itemValue;
};

// This is the constructor for every question on the Quiz

var Quiz = function(question) {
  if (!question) {
    playerGameOver();
    $(".contain-minigame").removeClass("hidden");
    $(".motivational-quote").css({"font-family":"Helvetica", "font-size": "1em"});
    $(".motivational-quote").text("Wow, we just run out of questions...Congratulations!! You truly know your memes!");
    $(".show-over").empty();

  } else {
    this.question = question.pregunta; // String
    this.certedad = question.certedad; // Boolean
    this.backgroundQuestion = question.backgroundQuestion; //background fot the qiuesion
    this.userAnswer = "";
    $(".container-fluid").css({"background": question.backgroundQuestion,
                                "background-repeat": "no-repeat",
                                "background-size": "cover",
                                "height":"100vh",
                                "height":"100%",
                                "padding": "10.3%",
                                "opacity": "1",});
    console.log(this.question);
    console.log(this.certedad);

    $(".question-perse").text(this.question);
  }
};

///// Method that checks the user imput

Quiz.prototype.checkUserAnswer = function() {
  if (this.userAnswer === this.certedad) {
    $(".question-panel").append('<div class="row img-check"><img class="feedback-answer" src="img/checked.png"/></div>');
    setTimeout(function(){
      $(".question-panel").addClass("hidden");
      $(".contain-minigame").removeClass("hidden");
      game = new FloppyGame(135, 1200);
      return "You got it right man!";
  },1000);

  } else {
    $(".question-panel").append('<div class="row img-check"><img class="feedback-answer" src="img/unchecked.png"/></div>');
    setTimeout(function(){
      $(".question-panel").addClass("hidden");
      $(".contain-minigame").removeClass("hidden");
      playerLives--;
      $(".player-lives").text(playerLives);
      $(".actual-lives").text(playerLives);
      if (playerLives === 0){
         return playerGameOver();
      }
      game = new FloppyGame(115, 900);
      $(".window").css(
        {"background":"no-repeat center center fixed url('img/fire.gif')",
         "background-size": "cover",});
      return "You are pretty pretty wrong";
    },1000);
  }
};

///// Function to display the Game overflow

function playerGameOver(){
  $(".over-img").removeClass("hidden");
  $(".question-panel").addClass("hidden");
  $(".contain-minigame").append('<div class="game-over"><p class="motivational-quote"></p><button type="button" class="btn btn-play-again">Play Again</button></div>');
  $(".motivational-quote").text("Final Score: " + playerScore);
  $(".btn-play-again").on("click",function(event) {
    window.location.reload();
  });
}

/////  UNBIND !!!!!!??????
//
