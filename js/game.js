let canvas;
let world;
let keyboard = new Keyboard();
let information = new Information();
var myAudio = new Audio('audio/sound.mp3'); 

/**
 * 
 * Loads data from the specified path in the Firebase Realtime Database.
 * @param {string} [path=""] - The path to load data from.
 * @returns {Promise<object>} A promise that resolves to the JSON response from the database.
 */

/**
 * Init game and music
 */
function init(){
    loadLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, information);
    checkWidth();
    initTouch();
    if(!information.music)
        myAudio.volume = 0;
    preventTouchContext();
}

/**
 * prevent show context menu
 */
function preventTouchContext(){
    document.querySelectorAll('#playInfoMobil p').forEach(function(element) {
        element.addEventListener('touchstart', function(e) {
            e.stopPropagation(); 
        });
    });

    document.getElementById('playInfoMobil').addEventListener('touchstart', function(e) {
        e.preventDefault(); 
    });
}

/**
 * restart background music, if this ended
 */
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

/**
 * Init touch function for mobil devices
 */
function initTouch(){
    document.getElementById("touchLeft").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById("touchLeft").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById("touchRight").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById("touchRight").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById("touchJump").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById("touchJump").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById("touchThrow").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById("touchThrow").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
    document.getElementById("startGame").addEventListener("touchstart", (e) => {
        e.preventDefault();
        playGame();
    });
    document.getElementById("soundON").addEventListener("touchstart", (e) => {
        e.preventDefault();
        stopMusic();
    });
    document.getElementById("soundOFF").addEventListener("touchstart", (e) => {
        e.preventDefault();
        runMusic();
    });
    document.getElementById("screenFull").addEventListener("touchstart", (e) => {
        e.preventDefault();
        fullscreen();
    });
    document.getElementById("screenSmall").addEventListener("touchstart", (e) => {
        e.preventDefault();
        smallScreen();
    });


}

/**
 * Check if the size of the screen has been changed
 */
window.addEventListener('resize', (event) =>{
    checkWidth();
});

/**
 * Check if the device supports touch function
 */
function hasTouchSupport() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Check the width and height of the screen
 */
function checkWidth(){
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;
    if(viewportWidth < 767 && viewportHeight > viewportWidth)
        document.getElementById("rotateScreen").classList.remove("d-none");
    else
        document.getElementById("rotateScreen").classList.add("d-none");

    if(!hasTouchSupport()){//(viewportWidth >= 767){ //Hochformat
        document.getElementById("playInfoMobil").classList.add("d-none");
        document.getElementById("playInfo").classList.remove("d-none");
    }else{
        document.getElementById("playInfoMobil").classList.remove("d-none");
        document.getElementById("playInfo").classList.add("d-none");
    }
}

/**
 * Init keyboard keys, if they get pushed
 */
window.addEventListener('keydown', (event) =>{
    if(event.keyCode == 39){
        keyboard.RIGHT = true;
    }
    if(event.keyCode == 37){
        keyboard.LEFT = true;
    }
    if(event.keyCode == 38){
        keyboard.UP = true;
    }
    if(event.keyCode == 40){
        keyboard.DOWN = true;
    }
    if(event.keyCode == 32){
        keyboard.SPACE = true;
    }
    if(event.keyCode == 68){
        keyboard.D = true;
        keyboard.throwB = 1;
    }
});

/**
 * Init keyboard keys, if pushing is finesd
 */
window.addEventListener('keyup', (event) =>{
    if(event.keyCode == 39){
        keyboard.RIGHT = false;
    }
    if(event.keyCode == 37){
        keyboard.LEFT = false;
    }
    if(event.keyCode == 38){
        keyboard.UP = false;
    }
    if(event.keyCode == 40){
        keyboard.DOWN = false;
    }
    if(event.keyCode == 32){
        keyboard.SPACE = false;
    }
    if(event.keyCode == 68){
        if(keyboard.throwB == 1)
            keyboard.throwB = 2;
        keyboard.D = false;
    }
});

/**
 * fullscreen start
 */
function fullscreen(){
    let fullscreen = document.getElementById("fullscreen");
    enterFullscreen(fullscreen);

    document.getElementById("screenFull").classList.add("d-none");
    document.getElementById("screenSmall").classList.remove("d-none");
}

/**
 * 
 * open Fullscreen
 * @param {string} [path=""] - fullscreen element dependent on the browser
 */
function enterFullscreen(element){
    if(element.requestFullscreen){
        element.requestFullscreen();
    } else if (element.msRequestFullscreen){
        element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen){
        element.webkitRequestFullscreen();
    }
}

/**
 * close the Fullscreen
 */
function smallScreen(){
    document.getElementById("screenFull").classList.remove("d-none");
    document.getElementById("screenSmall").classList.add("d-none");
    if(document.exitFullscreen){
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen){
        document.webkitExitFullscreen();
    }
}

/**
 * start the game und the music
 */
function playGame(){
    information.start = true;
    document.getElementById("startGame").classList.add("d-none");
    document.getElementById("info").classList.add("d-none");
    document.getElementById("imgContent").classList.add("flexEnd");
    myAudio.play();
}

/**
 * turn on the music
 */
function runMusic(){
    information.music = true;
    document.getElementById("soundON").classList.remove("d-none");
    document.getElementById("soundOFF").classList.add("d-none");
    myAudio.volume = 1;
}

/**
 * turn off the musix
 */
function stopMusic(){
    information.music = false;
    document.getElementById("soundON").classList.add("d-none");
    document.getElementById("soundOFF").classList.remove("d-none");
    myAudio.volume = 0;
}

/**
 * open the policy
 */
function openInfo(){
    document.getElementById("infoImDa").classList.remove("d-none");
}

/**
 * close the policy
 */
function closeInfo(){
    document.getElementById("infoImDa").classList.add("d-none");
}

/**
 * restart the Game
 */
function restartGame(){
    world = 0;
    level1 = 0;
    init();
    playGame();
    document.getElementById("playAgain").classList.add("d-none");
    document.getElementById("restart").classList.add("d-none");
}

