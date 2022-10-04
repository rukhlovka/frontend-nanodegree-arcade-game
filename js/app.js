// Enemies our player must avoid
const Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.height = 75;
    this.width = 100;
    this.x = 0;
    this.y = 60;
    this.speed = Math.random() * 500 + 200;
    //  this.player = player;
};
let score = 0;
const row = 85;
const col = 101;
const playground = {
    height: row * 5,
    width: col * 6
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += dt * this.speed;
    //console.log(this.x, ' - this.x');
    // console.log(playground.col, ' - playground.col');
    if (this.x > playground.width) {
        //  console.log(this.x, ' - this.x111');
        //  console.log(playground.col, ' - playground.col111');
        this.x = 0;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // return dt * 5;
    // console.log(dt, ' - dt!');
    // dt += 234234;
    // console.log(dt, ' - dt!');
    // return dt;
    this.checkCollisions1();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const start = {
    x: 200,
    y: 400
};
// const bodyScore = 
// function score2() {
//     ctx21.strokeText('Score', 265, 15);
// }
// score2();
const Player = function (start) {
    this.sprite = 'images/char-boy.png';
    this.height = 75;
    this.width = 75;
    this.x = start.x;
    this.y = start.y;
    this.moving = false;
};

Player.prototype.update = function (dt) {
    // return dt;
    // console.log(dt, ' - dt!!!');
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    scoreBoard();
};

Player.prototype.handleInput = function (key) {
    switch (key) {
        case "left":
            if (this.x > 0) {
                this.x -= col;
            }
            break;
        case "right":
            if (this.x < playground.width / 2) {
                this.x += col;
            }
            break;
        case "up":
            if (this.y < row) {
                finish();
            };
            if (this.y > 0) {
                this.y -= row;
            }

            //   }

            break;
        case "down":
            if (this.y + row < playground.height) {
                this.y += row;
            }
            //   }

            break;
    }
};

function scoreBoard() {
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'blue';
    ctx.font = '25px Helvetica';
    ctx.strokeText('Score:', 175, 30);
    ctx.font = '30px Helvetica';
    ctx.fillText(score, 260, 33);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player(start);

let bug1 = new Enemy();
let bug2 = new Enemy();
bug2.y = 145;
let bug3 = new Enemy();
bug3.y = 220;
let allEnemies = [bug1, bug2, bug3];

// let allEnemies = []

function finish() {
    score++;
    player.x = start.x;
    player.y = start.y;

};
function lost() {
    if (score !== 0) {
        score--;
    }
    player.x = start.x;
    player.y = start.y;

};

// function checkCollisions(player, allEnemies) {
//     for (let i = 0; i < allEnemies.length; i++) {
//         if (collision(player, allEnemies[i])) {
//             player.lost();
//         }
//     }
// };

Enemy.prototype.checkCollisions1 = function () {
    for (let i = 0; i < allEnemies.length; i++) {
        if (collision(player, allEnemies[i])) {
            console.log('ewdf');
            lost();
        }
    }
};

function collision(first, second) {
    return !(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y);
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

