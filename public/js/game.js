var buttonColors = ["red","blue", "green", "yellow"];
var gamePattern = [];
var userChosenButton = [];
var level = 0;
var press=0;
var maxLevel = parseInt( document.getElementById('myscore').dataset.test );
var myname = document.getElementById('myname').dataset.test ;
var mymail = document.getElementById('mymail').dataset.test ;
// console.log(gamer.gmail);
function startover()
{
    gamePattern=[];
    userChosenButton=[];
    level=0;
    press=0;
    $(".maxScore").html("MaxScore: "+ maxLevel);
}

$(".scoreBoard").on("click", function(){
    $("input[name='name']").val(myname);
    $("input[name='userMail']").val(mymail);
    $("input[name='MaxLevel']").val(maxLevel);
})

function nextSequence() {
    level++;
    if(level > maxLevel)
    maxLevel = level;

    userChosenButton = [];
    $("h1").text("Level "+ level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
  
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  
    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();

}
function playSound(y){
    var audio = new Audio("sounds/" + y + ".mp3");
    audio.play();
}
function animatePress(x){
    $("#"+x).addClass("pressed");
    setTimeout(function(){
        $("#"+x).removeClass("pressed");
    },100);
}

$(".btn").on("click",function(){
    let color = $(this).attr("id");
    userChosenButton.push(color);
    playSound(color);
    animatePress(color);
    checkAnswer(level);
})

function checkAnswer(currlevel)
{
    var n = userChosenButton.length-1;
    if(userChosenButton[n]===gamePattern[n])
    {
        // console.log("true");
    }else
    {
        $("h1").text("Game Over, Press any Key To restart");
        var arongAud = new Audio("sounds/wrong.mp3");
        arongAud.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        setTimeout(function(){
            $('#scoreUP').prop('disabled', false);
            startover();
        },200);

        return;
    }

    if((n+1) === currlevel)
    {
        setTimeout(nextSequence,1000);
    }
}

$(document).on("keypress",function(){
    if(press===0)
    {
        setTimeout(nextSequence,200);
        press++;
    }
});
$(document).on("click",function(){
    if(press===0)
    {
        setTimeout(nextSequence,200);
        press++;
    }
});

  
