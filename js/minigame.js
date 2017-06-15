
var FloppyGame = function(gap,fall) {

	var gameCode = '<div class="minigame"><div class="window" id="gamed"><p class="score">0</p><div class="contain-img"><div class="bird"></div></div><div class="pipe hidden"></div><div class="pipe hidden"></div></div></div>'

  $(".contain-minigame").append(gameCode);

	this.gapSize = gap; //120
  this.falltime = fall; // 1200
	$window = $(".window");
	$bird = $(".bird");
  this.gamestate = 2;
  pipeId = 0;

 setInterval(function(){
    if(this.gamestate === 1){
      this.spawnPipe();
      this.movePipes();
    }
  }.bind(this), 1300);

  this.birdPosInterval = setInterval(function(){
    if(this.gamestate === 1){
      this.birdPos();
    }
  }.bind(this), 10);

	$(".contain-minigame").mousedown(function(){
		this.birdFlap();
    if(this.gamestate === 2){
      this.gamestate = 1;
      this.deleteInterval();
    }
	}.bind(this));

	$(window).keydown(function(e){
		if(e.keyCode === 32){
				e.preventDefault();
			  this.birdFlap()
      if(this.gamestate === 2){
        this.gamestate = 1;
        this.deleteInterval();
      }
		}
	}.bind(this));
};

FloppyGame.prototype.deleteInterval = function(){
  setTimeout(function(){
    var int= setInterval(function(){
      if(this.gamestate === 1){
        this.deletePipe();
      }
    }.bind(this), 1300);
  }.bind(this), 2050);
};

FloppyGame.prototype.birdFlap = function(){
  if(this.gamestate === 1 || this.gamestate === 2){
    $bird.css('transform', 'rotate(-20deg)');
    $bird.stop().animate({
      bottom: "+=60px"
    }, 200, function(){
      this.birdPos();
      $bird.css('transform', 'rotate(0deg)');
      $bird.stop().animate({
        bottom: "-=60px"
      }, 300, 'linear', function(){
        this.birdPos();
        this.gravity();
      }.bind(this));
    }.bind(this));
  }
};

FloppyGame.prototype.gravity = function() {

  birdPercent = parseInt($bird.css('bottom')) / $window.height();
  totalFallTime = this.falltime * birdPercent;
  $bird.stop().animate({
    bottom: "0"
  }, totalFallTime, "linear");

  $bird.css('transform', 'rotate(90deg)');
};

FloppyGame.prototype.spawnPipe = function() {

  pipeId++;
  pipeTopHeight = Math.floor(Math.random() * ($window.height() - 250)) + 50;
  pipeBottomHeight = $window.height() - (pipeTopHeight + this.gapSize);
  pipe = '<div class="pipe" pipe-id="' + pipeId + '"><div style="height: ' + pipeTopHeight + 'px" class="topHalf"></div><div style="height:' + pipeBottomHeight + 'px" class="bottomHalf"></div></div>';
  $window.append(pipe);
};

FloppyGame.prototype.deletePipe = function() {
  $(".pipe").first().remove();
};

FloppyGame.prototype.movePipes = function() {
  $(".pipe").each(function(){
    $(this).animate({
      right: "+=160px"
    }, 1300, "linear");
  });
};

FloppyGame.prototype.birdPos = function() {
  if(parseInt($bird.css("bottom")) === 0 || parseInt($bird.css("bottom")) > 450){
    this.gameEnd();
  }

  curPipe = $(".pipe:nth-of-type(4)");
  if(curPipe.length > 0){
    pipeTop = $(".pipe:nth-of-type(4) .topHalf");
    pipeBottom = $(".pipe:nth-of-type(4) .bottomHalf");
    if(($bird.offset().left + $bird.width()) >= curPipe.offset().left && $bird.offset().left <= (curPipe.offset().left + curPipe.width())){

      if($bird.offset().top < (curPipe.offset().top + pipeTop.height()) || ($bird.offset().top + $bird.height()) > ((curPipe.offset().top + pipeTop.height()) + this.gapSize)){

        this.gameEnd();

      }
    } else if($bird.offset().left >= (curPipe.offset().left + curPipe.width())){

      $(".score").text(curPipe.attr("pipe-id"));
    }
  }
};

FloppyGame.prototype.gameEnd = function() {
  clearInterval(this.birdPosInterval);
  $(".pipe").stop();
  this.gravity();
  this.gamestate = 0;
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



// var game = new FloppyGame();
