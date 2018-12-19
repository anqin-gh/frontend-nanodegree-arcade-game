const blockWidth = 101;
const blockHeight = 83;
const numRows = 6;
const numCols = 5;
const verticalOffset = 20;
const scores = {
    goal:       30,
    orangeGem:  25,
    blueGem:    50,
    greenGem:   75
};

// superclass defining common interface
var GameObject = function() {
};

GameObject.prototype = {
    isMortal:   function() { return false; },
    isPlayer:   function() { return false; },
    isHeart:    function() { return false; },
    isGem:      function() { return false; }
};

GameObject.prototype.init = function() {
    // do nothing by default
};

GameObject.prototype.update = function() {
    // do nothing by default
};

GameObject.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    GameObject.call(this);
    this.init();
};

Enemy.prototype = Object.create(GameObject.prototype);

Enemy.prototype.isMortal = function() {
    return true;
};

Enemy.prototype.init = function() {
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    if (this.x > blockWidth * numCols) {
        this.reset();
    }
};

Enemy.prototype.reset = function() {
    this.x = -blockWidth;
    this.y = blockHeight*(Math.floor(Math.random()*3) + 1) - verticalOffset;
    this.speed = Math.floor(Math.random()*400) + 100;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    GameObject.call(this);
    this.init();
};

Player.prototype = Object.create(GameObject.prototype);

Player.prototype.isPlayer = function() {
    return true;
};

var playerImgages = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];

Player.prototype.init = function() {
    this.sprite = playerImgages[Math.floor(Math.random()*playerImgages.length)];
    this.lives = 3;
    this.score = 0;
    this.reset();
};

Player.prototype.isAlive = function() {
    return this.lives > 0;
};

Player.prototype.reset = function() {
    this.x = blockWidth*(Math.floor(numCols/2));
    this.y = blockHeight*4 - verticalOffset;
};

Player.prototype.update = function() {
    if (this.controlKey === 'left' && this.x > 0) {
        this.x -= blockWidth;
    } else if (this.controlKey === 'right' && this.x < blockWidth*(numCols-1)) {
        this.x += blockWidth;
    } else if (this.controlKey === 'up' && this.y > 0) {
        this.y -= blockHeight;
    } else if (this.controlKey === 'down' && this.y < blockHeight*(numRows-2)) {
        this.y += blockHeight;
    }
    this.controlKey = null;
};

Player.prototype.handleInput = function(key) {
    this.controlKey = key;
};

var Heart = function() {
    GameObject.call(this);
    this.init();
};

Heart.prototype = Object.create(GameObject.prototype);

Heart.prototype.isHeart = function() {
    return true;
};

Heart.prototype.init = function() {
    this.sprite = 'images/Heart.png';
    this.reset();
};

Heart.prototype.reset = function() { // set initial location
    this.x = blockWidth*Math.floor(Math.random()*numCols);
    this.y = blockHeight*(Math.floor(Math.random()*3) + 1);
};

var Gem = function() {
    GameObject.call(this);
    this.init();
};

Gem.prototype = Object.create(GameObject.prototype);

Gem.prototype.isGem = function() {
    return true;
};

var gemImages = [
    'images/Gem Orange.png',
    'images/Gem Blue.png',
    'images/Gem Green.png'
];

Gem.prototype.init = function() {
    this.reset();
};

Gem.prototype.reset = function() {
    this.x = blockWidth*Math.floor(Math.random()*numCols);
    this.y = blockHeight*(Math.floor(Math.random()*3) + 1) - verticalOffset;
    var randIdx =[0, 0, 0, 1, 1, 2][Math.floor(Math.random()*6)];
    this.sprite = gemImages[randIdx];
    this.score = (function() {
        switch (randIdx) {
            case 0:
                return scores.orangeGem;
                break;
            case 1:
                return scores.blueGem;
                break;
            case 2:
                return scores.greenGem;
                break;
        }
    })();
};

var Scoreboard = function() {

};

Scoreboard.update = function() {
    this.score = player.score;
    this.lives = player.lives;
};

Scoreboard.render = function() {
    ctx.font = "20px Helvetica";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + this.score, 15, 610);
    ctx.fillText("Lives: " + this.lives, blockWidth*(numCols-1) + 15, 610);
};

var GameOver = function() {

};

GameOver.render = function() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(0, 50, 505, 539);

    ctx.font = "50px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillText("GAME OVER", 100, 630/2);
};

// Now instantiate your objects.
// Place all enemy objects in an array called gameObjects
// Place the player object in a variable called player
var gameObjects = [];

gameObjects.push(new Enemy());
gameObjects.push(new Enemy());
gameObjects.push(new Enemy());

gameObjects.push(new Heart());
gameObjects.push(new Gem());

var player = new Player();
gameObjects.push(player);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
