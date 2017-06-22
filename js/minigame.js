
var FloppyGame = function(gap,fall) {

	var gameCode = '<div class="minigame"><div class="window" id="gamed"><p class="score">0</p><div class="contain-img"><div class="bird"></div></div><div class="pipe hidden"></div><div class="pipe hidden"></div></div></div>'

  $(".contain-minigame").append(gameCode);

	this.gapSize = gap; //120
  this.falltime = fall; // 1200
	$window = $(".window");
	$bird = $(".bird");
  this.statusGame = 2;
  numPipe = 0;

  this.nao = setInterval(function(){
    if(this.statusGame === 1){
      this.makePipe();
      this.movementPipes();
    }
  }.bind(this), 1300);

  this.theBirdInt = setInterval(function(){
    if(this.statusGame === 1){
      this.birdWay();
    }
  }.bind(this), 10);

	$(".contain-minigame").mousedown(function(){
		this.birdFlap();
    if(this.statusGame === 2){
      this.statusGame = 1;
      this.deleteInterval();
    }
	}.bind(this));

	$(window).keydown(function(e){
		if(e.keyCode === 32){
				e.preventDefault();
			  this.birdFlap()
      if(this.statusGame === 2){
        this.statusGame = 1;
        this.deleteInterval();
      }
		}
	}.bind(this));
};

FloppyGame.prototype.deleteInterval = function(){
  setTimeout(function(){
    var int= setInterval(function(){
      if(this.statusGame === 1){
        this.deletePipe();
      }
    }.bind(this), 1300);
  }.bind(this), 2050);
};

FloppyGame.prototype.birdFlap = function(){
  if(this.statusGame === 1 || this.statusGame === 2){
		wing.play();
    $bird.css('transform', 'rotate(-20deg)');
    $bird.stop().animate({
      bottom: "+=60px"
    }, 200, function(){
      this.birdWay();
      $bird.css('transform', 'rotate(0deg)');
      $bird.stop().animate({
        bottom: "-=60px"
      }, 300, 'linear', function(){
        this.birdWay();
        this.gravity();
      }.bind(this));
    }.bind(this));
  }
};

FloppyGame.prototype.gravity = function() {

  meausurePercen = parseInt($bird.css('bottom')) / $window.height();
  totalFallTime = this.falltime * meausurePercen;
  $bird.stop().animate({
    bottom: "0"
  }, totalFallTime, "linear");

  $bird.css('transform', 'rotate(90deg)');
};

FloppyGame.prototype.makePipe = function() {

  numPipe++;
  topPipe = Math.floor(Math.random() * ($window.height() - 250)) + 50;
  heightBotPipe = $window.height() - (topPipe + this.gapSize);
  pipe = '<div class="pipe" pipe-id="' + numPipe + '"><div style="height: ' + topPipe + 'px" class="topHalf"></div><div style="height:' + heightBotPipe + 'px" class="bottomHalf"></div></div>';
  $window.append(pipe);
};

FloppyGame.prototype.deletePipe = function() {
  $(".pipe").first().remove();
};

FloppyGame.prototype.movementPipes = function() {
  $(".pipe").each(function(){
    $(this).animate({
      right: "+=160px"
    }, 1300, "linear");
  });
};

FloppyGame.prototype.birdWay = function() {
  if(parseInt($bird.css("bottom")) === 0 || parseInt($bird.css("bottom")) > 450){
    this.gameEnd();
  }

  curPipe = $(".pipe:nth-of-type(4)");
  if(curPipe.length > 0){
    pipeTop = $(".pipe:nth-of-type(4) .topHalf");
    pipeBottom = $(".pipe:nth-of-type(4) .bottomHalf");
    if(($bird.offset().left + $bird.width()) >= curPipe.offset().left && $bird.offset().left <= (curPipe.offset().left + curPipe.width())){

      if($bird.offset().top < (curPipe.offset().top + pipeTop.height()) || ($bird.offset().top + $bird.height()) > ((curPipe.offset().top + pipeTop.height()) + this.gapSize)){
				hit.play();
        this.gameEnd();

      }
    } else if($bird.offset().left >= (curPipe.offset().left + curPipe.width())){
			point.play();
      $(".score").text(curPipe.attr("pipe-id"));
    }
  }
};

FloppyGame.prototype.gameEnd = function() {
	clearInterval(this.nao);
  clearInterval(this.theBirdInt);
	setTimeout(function(){
		die.play();
	},200);
  $(".pipe").stop();
  this.gravity();
  this.statusGame = 0;
	console.log("You have died");
	playerScore += parseInt($(".score").text());
	this.showResults();
	$(".player-score").text(playerScore);
	$(".actual-lives").text(playerLives);

};


FloppyGame.prototype.showResults = function() {
	setTimeout(function(){
	$(".contain-minigame").addClass("hidden");
	$(".results-container").removeClass("hidden");
	$(".contain-minigame").empty();
},1200);
};
