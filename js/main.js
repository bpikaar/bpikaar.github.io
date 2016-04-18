var fishWidth       = 130;
var fishHeight      = 110;

var maxBubbles      = 30;
var numberOfBubbles = 0;
var numberOfFish    = 0;

var ui = document.getElementsByTagName("ui")[0];

function startGame(){
    
    createBubble();
    
    var infoText = document.getElementById("infoText");
    var clickArea = document.getElementById("clickArea");
    clickArea.addEventListener("click", function(event) {
        if(infoText) infoText.remove();
        createFish(event);
    });
}

/**
 * @param event, touch event or mouse event
 */
function createFish(event)
{
    var fish = document.createElement("fish");

    var tx, ty;

    if (event.pageX)
    {
        tx = event.pageX;
        ty  = event.pageY;
    }
    else // for mobile browser
    {
        var t = e.touches[0];

        tx = t.pageX - myElement.offsetLeft;
        ty = t.pageY - myElement.offsetTop;    
    }
    
    fish.style.left = (tx - fishWidth / 2)  + "px";
    fish.style.top  = (ty - fishHeight / 2) + "px"; 
    
    var color = Math.random() * 360;
    // demo code : verander kleur
    fish.style.webkitFilter = "hue-rotate("+color+"deg)";
    fish.style.filter       = "hue-rotate("+color+"deg)";
    
    document.body.appendChild(fish);
    
    numberOfFish++;
    ui.innerHTML = "Number of fish: " + numberOfFish;
}

function createBubble()
{
    numberOfBubbles++;
    
    var bubble = document.createElement("bubble");
    
    bubble.style.left = Math.random() * (window.innerWidth - 55 )   + "px";
    bubble.style.top  = "0px";
    
    document.body.appendChild(bubble);
    
    if (numberOfBubbles < maxBubbles) {
        var time = Math.random() * 500 + 500;
        window.setTimeout(createBubble, time);
    }
}

//
// start the game on window load
//
window.addEventListener("load", function () {
    startGame();
});
