var playerImgages = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.init();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    if (this.x > spriteWidth * numCols) {
        this.init();
    }
};

Enemy.prototype.init = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -spriteWidth;
    this.y = spriteHeight*(Math.floor(Math.random()*3) + 1) - 20;
    this.speed = Math.floor(Math.random()*400) + 100;
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.init();
};

Player.prototype.init = function() {
    // this.sprite = playerImgages[Math.floor(Math.random()*5)];
    this.sprite = 'images/char-boy.png';
    this.x = spriteWidth*(Math.floor(numCols/2));
    this.y = spriteHeight*4 - 20;
};

Player.prototype.update = function() {
    if (this.controlKey === 'left' && this.x > 0) {
        this.x -= spriteWidth;
    } else if (this.controlKey === 'right' && this.x < spriteWidth*(numCols-1)) {
        this.x += spriteWidth;
    } else if (this.controlKey === 'up' && this.y > 0) {
        this.y -= spriteHeight;
    } else if (this.controlKey === 'down' && this.y < spriteHeight*(numRows-2)) {
        this.y += spriteHeight;
    }
    this.controlKey = null;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    this.controlKey = key;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var e0 = new Enemy();
allEnemies.push(e0);
var e1 = new Enemy();
allEnemies.push(e1);
var e2 = new Enemy();
allEnemies.push(e2);

var player = new Player();

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
