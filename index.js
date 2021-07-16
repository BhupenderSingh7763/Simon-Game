
var bttncolours = ["red", "green", "yellow", "blue"]

var gameTheme = [];
var playerEntry = [];

var level = 0;
var started = false;

$(document).keypress(function() {
  if(!started)
  {
    $("h1").text("Level - " + level);
    startGame();
    started = true;
  }
});

$(".btn").click(function() {
  var playerColor = $(this).attr("id");
  playerEntry.push(playerColor);

  sounds(playerColor);
  pressAnimation(playerColor);

  checking(playerEntry.length-1);
});

function checking(data)
{
  if(gameTheme[data] === playerEntry[data])
  {
    if(playerEntry.length === gameTheme.length)
    {
      setTimeout(function() {
        startGame();
      }, 1000);
    }
  }
  else
  {
    sounds("wrong");
    $("body").addClass("gameOver");
    $("h1").text("Game Over...   Press Any Key to Restart.");

    setTimeout(function() {
      $("body").removeClass("gameOver");
    }, 200);

    startAgain();
  }
}

function startGame()
{
  playerEntry = [];
  level++;
  $("h1").text("Level - " + level);
  var number = Math.floor(Math.random() * 4) + 1;
  var newColor = bttncolours[number];
  gameTheme.push(newColor);

  $("." + newColor).fadeIn(125).fadeOut(125).fadeIn(125);
  sounds(newColor);
}

function pressAnimation(color)
{
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function sounds(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startAgain()
{
  level = 0;
  started = false;
  gameTheme = [];
}
