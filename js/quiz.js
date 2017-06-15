//Make the Questions (just strings)
var game;

var questionsArr = [{
    pregunta: "texto de la 1a preguntasdsdsdsdsdsdsdsdsdsdsdsdsdsds",
    certedad: "false"
  },  {
    pregunta: "texto de la 2a preguntasdsdsdsdsdsdsdsdsd",
    certedad: "true"
   },
  {
    pregunta: "texto de la 3a preguntasdsdsdsdsdsdsdsdsd",
    certedad: "false"
  },
  //{
  //   pregunta: "texto de la 4a pregunta",
  //   certedad: "true"
  // }, {
  //   pregunta: "texto de la 5a pregunta",
  //   certedad: "false"
  // }, {
  //   pregunta: "texto de la 6a pregunta",
  //   certedad: "true"
  // }, {
  //   pregunta: "texto de la 7a pregunta",
  //   certedad: "false"
  // }, {
  //   pregunta: "texto de la 8a pregunta",
  //   certedad: "true"
  // }, {
  //   pregunta: "texto de la 9a pregunta",
  //   certedad: "false"
  // }, {
  //   pregunta: "texto de la 10a pregunta",
  //   certedad: "true"
  // }
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
    this.userAnswer = "";

    console.log(this.question);
    console.log(this.certedad);

    $(".question-perse").text(this.question);
  }
};

Quiz.prototype.checkUserAnswer = function() {
  $(".question-panel").addClass("hidden");
  $(".contain-minigame").removeClass("hidden");
  if (this.userAnswer === this.certedad) {
    game = new FloppyGame(135, 1200);
    return "You got it right man!";
  } else {
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
  }
};

/////// Function to display the Game overflow

function playerGameOver(){
  $(".over-img").removeClass("hidden");
  $(".question-panel").addClass("hidden");
  $(".contain-minigame").append('<div class="game-over"><p class="motivational-quote"></p><button type="button" class="btn btn-play-again">I WANT MOAR</button></div>');
  $(".motivational-quote").text("Final Score: " + playerScore);
  $(".btn-play-again").on("click",function(event) {
    window.location.reload();
  });
}

/////  UNBIND !!!!!!
//
