
//Sounds

var correct = new buzz.sound("sounds/correct", {
    formats: ["mp3"]
});

var wrong = new buzz.sound("sounds/wrong", {
    formats: [ "mp3"]
});

var fail = new buzz.sound("sounds/fail", {
    formats: ["mp3"]
});

var clap = new buzz.sound("sounds/clap", {
    formats: ["mp3"]
});

var wing = new buzz.sound("sounds/sfx_wing", {
    formats: ["wav"]
});

var point = new buzz.sound("sounds/sfx_point", {
    formats: ["wav"]
});

var hit = new buzz.sound("sounds/sfx_hit", {
    formats: ["wav"]
});

var die = new buzz.sound("sounds/sfx_die", {
    formats: ["wav"]
});

//Make the Questions (just strings)
var game;

var questionsArr = [{
    pregunta: "Pepe the Frog is a blue frog from the comic series Boy’s Club by Matt Furie.",
    certedad: "false",
    backgroundQuestion: "url(img/pepe.png)",
  },
  {
    pregunta: "The Trollface was originally drawn by Carlos Ramirez, an Oakland-based artist known by his deviantART",
    certedad: "true",
    backgroundQuestion: "url(img/trollface.jpg)"
   },
  {
    pregunta: "Longcat's, original name is Shirubi (白い – 'white' in Japanese)",
    certedad: "false",
    backgroundQuestion: "url(img/longcat.jpg)"
  },
  // {
  //   pregunta: "texto de la 3a preguntasdsdsds  dsdsds dsds dpr eguntasdsdsdsdsds  dsd sdsdsd sdsdsdsd spreguntasdsdsd sdsdsdsdsdsdsdsdsdsdsds ds dsdsdsdsdspreg untasdsd s ds dsdsd sdsdsd sdsds dsdsds",
  //   certedad: "true",
  //   backgroundQuestion: "url(img/004.jpg)"
  // },
  // {
  //   pregunta: "texto de la 3a preguntasdsdsds  dsdsds dsds dpr eguntasdsdsdsdsds  dsd sdsdsd sdsdsdsd spreguntasdsdsd sdsdsdsdsdsdsdsdsdsdsds ds dsdsdsdsdspreg untasdsd s ds dsdsd sdsdsd sdsds dsdsds",
  //   certedad: "false",
  //   backgroundQuestion: "url(img/004.jpg)"
  // }, {
  //   pregunta: "texto de la 3a preguntasdsdsds  dsdsds dsds dpr eguntasdsdsdsdsds  dsd sdsdsd sdsdsdsd spreguntasdsdsd sdsdsdsdsdsdsdsdsdsdsds ds dsdsdsdsdspreg untasdsd s ds dsdsd sdsdsd sdsds dsdsds",
  //   certedad: "true",
  //   backgroundQuestion: "url(img/004.jpg)"
  // }, {
  //   pregunta: "texto de la 3a preguntasdsdsds  dsdsds dsds dpr eguntasdsdsdsdsds  dsd sdsdsd sdsdsdsd spreguntasdsdsd sdsdsdsdsdsdsdsdsdsdsds ds dsdsdsdsdspreg untasdsd s ds dsdsd sdsdsd sdsds dsdsds",
  //   certedad: "false",
  //   backgroundQuestion: "url(img/004.jpg)"
  // }, {
  //   pregunta: "texto de la 3a preguntasdsdsds  dsdsds dsds dpr eguntasdsdsdsdsds  dsd sdsdsd sdsdsdsd spreguntasdsdsd sdsdsdsdsdsdsdsdsdsdsds ds dsdsdsdsdspreg untasdsd s ds dsdsd sdsdsd sdsds dsdsds",
  //   certedad: "true",
  //   backgroundQuestion: "url(img/004.jpg)"
  // }, {
  //   pregunta: "texto de la 3a preguntasdsdsds  dsdsds dsds dpr eguntasdsdsdsdsds  dsd sdsdsd sdsdsdsd spreguntasdsdsd sdsdsdsdsdsdsdsdsdsdsds ds dsdsdsdsdspreg untasdsd s ds dsdsd sdsdsd sdsds dsdsds",
  //   certedad: "false",
  //   backgroundQuestion: "url(img/004.jpg)"
  // }, {
  //   pregunta: "texto de la 3a preguntasdsdsds  dsdsds dsds dpr eguntasdsdsdsdsds  dsd sdsdsd sdsdsdsd spreguntasdsdsd sdsdsdsdsdsdsdsdsdsdsds ds dsdsdsdsdspreg untasdsd s ds dsdsd sdsdsd sdsds dsdsds",
  //   certedad: "true",
  //   backgroundQuestion: "url(img/004.jpg)"
  //}
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
    clap.play();
    playerGameOver();
    $(".contain-minigame").removeClass("hidden");
    $(".game-over").append('<a href="https://rickrolled.fr/" class="btn btn-primary btn-prize">Get your prize!</a>');
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
                                "padding": "10.3%",
                                "opacity": "1",});
    console.log(this.question);
    console.log(this.certedad);

    $(".question-perse").text(this.question);
    // $(".question-perse").css({"color":"blue"});
  }
};

///// Method that checks the user imput

Quiz.prototype.checkUserAnswer = function() {
  if (this.userAnswer === this.certedad) {
    correct.play();
    $(".question-panel").empty();
    $(".question-panel").append('<div class="row img-check"><img class="feedback-answer" src="img/checked2.png"/></div>');
    $("feedback-answer").css({"padding":"120em;"});
    setTimeout(function(){
      $(".question-panel").addClass("hidden");
      $(".contain-minigame").removeClass("hidden");
      game = new FloppyGame(135, 1200);
      return "You got it right man!";
  },1000);

  } else {
    wrong.play();
    $(".question-panel").empty();
    $(".question-panel").append('<div class="row img-check"><img class="feedback-answer" src="img/unchecked2.png"/></div>');
    $("feedback-answer").css({"padding-bottom":"120em;"});
    setTimeout(function(){
      $(".question-panel").addClass("hidden");
      $(".contain-minigame").removeClass("hidden");
      playerLives--;
      $(".player-lives").text(playerLives);
      $(".actual-lives").text(playerLives);
      if (playerLives === 0){
        fail.play();
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
    newQuestion = null;
    game = null;
    window.location.reload();
  });
}

/////  UNBIND !!!!!!??????
//
