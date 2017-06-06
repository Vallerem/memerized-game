
var FloppyGame = function(meme) {

	$window = $(".window");
	$bird = $(".bird");
  fallTime = 1000;
  gapHeight = 130;
  gameState = 2;
  pipeId = 0;

 setInterval(function(){
    if(gameState === 1){
      game.spawnPipe();
      game.movePipes();
    }
  }, 1300);

  this.birdPosInterval = setInterval(function(){
    if(gameState === 1){
      game.birdPos();
    }
  }, 10);

	$(".contain-minigame").mousedown(function(){
		game.birdFlap();
    if(gameState === 2){
      gameState = 1;
      game.deleteInterval();
    }
	});

	$(window).keydown(function(e){
		if(e.keyCode === 32){
				e.preventDefault();
			  game.birdFlap()
      if(gameState === 2){
        gameState = 1;
        game.deleteInterval();
      }
		}
	});
};



//////////

// FloppyGame.prototype.start = function(){
//
//
// };


FloppyGame.prototype.deleteInterval = function(){
  setTimeout(function(){
    var int= setInterval(function(){
      if(gameState === 1){
        game.deletePipe();
      }
    }, 1300);
  }, 2050);
};

FloppyGame.prototype.birdFlap = function(){
  if(gameState === 1 || gameState === 2){
    $bird.css('transform', 'rotate(-20deg)');
    $bird.stop().animate({
      bottom: "+=60px"
    }, 200, function(){
      game.birdPos();
      $bird.css('transform', 'rotate(0deg)');
      $bird.stop().animate({
        bottom: "-=60px"
      }, 300, 'linear', function(){
        game.birdPos();
        game.gravity();
      });
    });
  }
};

FloppyGame.prototype.gravity = function() {

  birdPercent = parseInt($bird.css('bottom')) / $window.height();
  totalFallTime = fallTime * birdPercent;
  $bird.stop().animate({
    bottom: '0'
  }, totalFallTime, 'linear');

  $bird.css('transform', 'rotate(90deg)');
};

FloppyGame.prototype.spawnPipe = function() {

  pipeId++;
  pipeTopHeight = Math.floor(Math.random() * ($window.height() - 250)) + 50;
  pipeBottomHeight = $window.height() - (pipeTopHeight + gapHeight);
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

  curPipe = $('.pipe:nth-of-type(4)');
  if(curPipe.length > 0){
    pipeTop = $('.pipe:nth-of-type(4) .topHalf');
    pipeBottom = $('.pipe:nth-of-type(4) .bottomHalf');
    if(($bird.offset().left + $bird.width()) >= curPipe.offset().left && $bird.offset().left <= (curPipe.offset().left + curPipe.width())){

      if($bird.offset().top < (curPipe.offset().top + pipeTop.height()) || ($bird.offset().top + $bird.height()) > ((curPipe.offset().top + pipeTop.height()) + gapHeight)){

        this.gameEnd();

      }
    } else if($bird.offset().left >= (curPipe.offset().left + curPipe.width())){

      $('.score').text(curPipe.attr('pipe-id'));

    }
  }
};

FloppyGame.prototype.gameEnd = function() {
  clearInterval(this.birdPosInterval);
  $('.pipe').stop();
  this.gravity();
  gameState = 0;
	console.log("You have died");
};



// var game = new FloppyGame();
