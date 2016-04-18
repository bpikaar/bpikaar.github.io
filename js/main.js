//
// OPDRACHT
//
// 1
// VOEG VIA JAVASCRIPT EEN VIS EN EEN BUBBLE TOE
// ZET DE VIS OP EEN WILLEKEURIGE PLEK IN HET SCHERM MET EEN WILLEKEURIGE KLEUR
// ZET DE BUBBLE OP EEN WILLEKEURIGE X POSITIE

// 2
// MAAK EEN FOR LOOP DIE 50 VISJES EN BUBBLES TOEVOEGT. DEZE MOETEN ALLEMAAL ANDERS ZIJN!

// 3
// GEBRUIK NU SETTIMOUT OF SETINTERVAL OM NIEUWE VISJES EN BUBBLES TE PLAATSEN

// 4
// PLAATS EEN TITEL EN START KNOP. ALS JE OP START KLIKT VERDWIJNEN DE TITEL EN KNOP, EN 
// DAARNA WORDEN PAS DE VISJES GETEKEND

// 5 
// HANG EEN CLICK EVENT LISTENER AAN ELK VISJE. ALS GEKLIKT WORDT
// GEEF JE DE GEKLIKTE VIS EEN NIEUWE CLASS DIE EEN ANDERE ACHTERGROND HEEFT 
// fish.classList.add(".deadfish");
var numberOfFish = 0;
var ui = document.getElementsByTagName("ui")[0];
// test

// Iets anders


// conflict

function startGame(){
    createFish();
    createBubble();
    
    window.setTimeout(createBubble, 5);
    
    // demo code : verander basis positie
    var bubble = document.getElementsByTagName("bubble")[0];
    bubble.style.left = "60px";
    bubble.style.top = "0px";
}


function createFish()
{
    var fish = document.createElement("fish");
    
    // demo code : verander basis positie
    fish.style.left = Math.random() * (window.innerWidth - 130)  + "px";
    fish.style.top  = Math.random() * (window.innerHeight - 110) + "px";

    var color = Math.random() * 360;
    // demo code : verander kleur
    fish.style.webkitFilter = "hue-rotate("+color+"deg)";
    fish.style.filter       = "hue-rotate("+color+"deg)";
    
    document.body.appendChild(fish);
    
    numberOfFish++;
    ui.innerHTML = "Number of fish: " + numberOfFish;
    
    window.setTimeout(createFish, 100);
}



function createBubble()
{
    var bubble = document.createElement("bubble");
    
    bubble.style.left = Math.random() * (window.innerWidth - 55 )   + "px";
    bubble.style.top  = "0px";
    
    document.body.appendChild(bubble);
}

//
// start the game on window load
//
window.addEventListener("load", function () {
    startGame();
});
