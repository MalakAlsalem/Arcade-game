
// Enemies our player must avoid
var Enemy = function(x,y) {
    "use strict";
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/Rock.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    "use strict";
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //set speed for enemy
    if(this.x <= 505) { 
        this.x = this.x + this.speed * dt;
    } else {
        this.x = -2;
    }

    // set the distance between the enemy and the player
    if (player.x < this.x + 60 &&
    player.x + 50 > this.x &&
    player.y < this.y + 50 &&
    70 + player.y > this.y) {
        // when player lose
        alert ("You lost, play agian?");
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// palyer class
var Player = function() {
    "use strict";
    this.sprite = 'images/char-princess-girl.png';
    // Set the initial position for player
    this.x= 200;
    this.y= 350;
    this.score= 0;
};

// update method
Player.prototype.update = function(dt) {
    "use strict";
    // Set the movements for player
    if(this.Key === 'up' && this.y > -10) {
        this.y -= 50;
    }
    if(this.Key === 'down' && this.y < 400) {
        this.y += 50;
    }
    if(this.Key === 'left' && this.x > 30) { 
        this.x -= 60;
    }
    if(this.Key === 'right' && this.x < 350) { 
        this.x += 60;

    }
    this.Key = null;

    //When player wins
    if(this.y <1) {
        alert("You win! Do it agian?");
        this.reset();
        // calculate score and show it 
        var s = document.getElementById('score-counter');
        this.score+=1;
        s.innerText = this.score ;

    }
};
    
// set a timer 
var seconds=10; 
var count = document.getElementById('seconds-counter');
var counter=setInterval(timer, 1000);
function timer() {
    "use strict";
    seconds-=1;
    if (seconds <= 0) {
        // when time ended player lose 
        alert ("You lost, play again?");
        // counter stopped
        clearInterval(counter);
        // player will rest
        player.reset();
        // counter will start agian
        counter=setInterval(timer, 1000);
        return;
    }
    // showing the number of seconds
    count.innerText = seconds ;
}

// render method
Player.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handleInput method
Player.prototype.handleInput = function(e) {
    "use strict";
    this.Key = e;
};

//reset method
Player.prototype.reset = function() {
    "use strict";
    this.x = 200;
    this.y = 350;
    seconds=11;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Set the number, positions, and speed for eneimes
var allEnemies = [];
for (var i= 2; i < 5; i++) {
    speed = Math.floor(Math.random() *10 +4) * 30; 
    allEnemies.push(new Enemy(1, 70 +47 *i, speed));
}

var player = new Player(200, 350);

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