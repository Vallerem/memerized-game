//Make the Questions (just strings)
var game;

var questionsArr = [{
    pregunta: "texto de la 1a pregunta",
    certedad: "false"
  },  {
    pregunta: "texto de la 2a pregunta",
    certedad: "true"
   },
  //{
  //   pregunta: "texto de la 3a pregunta",
  //   certedad: "false"
  // }, {
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
    $(".question-perse").text("Ups, Looks like we run out of questions! So...eehmm..you've won?");

    // window.location.reload();

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
    game = new FloppyGame(115, 900);
    $(".window").css(
      {"background":"url('img/fire.gif')",
       "background-size": "cover"});

    return "You are pretty pretty wrong";
  }
};

//Makes the user answer accesible to the functions that compares it to the correct answer.



///////


// var theQuiz = new Quiz(getRandomQuestion());
//
// console.log(theQuiz.question);
// console.log(theQuiz.certedad);
// console.log(theQuiz.checkUserAnswer());









//
