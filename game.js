// Import player and projectile classes from classes.js
import { player } from "./classes.js";
import { projectile } from "./classes.js";

// Get references to HTML elements
const p1 = document.getElementById("player1"); // Left player
const p2 = document.getElementById("player2"); // Right player
const ball_pointer = document.getElementById("projectile"); // Ball projectile
const screen = document.getElementById("screen"); // Screen dimensions for accessibility

// Create player objects and a ball object
const player1 = new player("player1", p1);
const player2 = new player("player2", p2);
const ball = new projectile(ball_pointer);

// Initialize scores and references to the scoreboard
var p1score = 0;
var p2score = 0;
var scoreBoard = document.getElementById("board");

// Define a key map to track player movement
var playerKeyMap = { "W": false, "S": false, "Up": false, "Down": false };

// Prevent default behavior for certain key presses
window.addEventListener("keydown", function(e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

// Function to introduce a delay (used for ball resets)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to calculate the position of an element on the screen
function POS(id) {
    let box = id.getBoundingClientRect();
    return {
        top: box.top + window.pageYOffset + 4,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset,
        right: box.right + window.pageXOffset
    };
}
const screenPOS = POS(screen);

// Event listener for keydown events (player movement)
document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp") {
        playerKeyMap.Up = true;
    }
    if (event.key === "ArrowDown") {
        playerKeyMap.Down = true;
    }
    if (event.key === "W" || event.key === "w") {
        playerKeyMap.W = true;
    }
    if (event.key === "S" || event.key === "s") {
        playerKeyMap.S = true;
    }
    if (event.key === "i") {
        ball.moveUP(ball_pointer);
    }
    if (event.key === "k") {
        ball.moveDOWN(ball_pointer);
    }
    if (event.key === "l") {
        ball.moveRight(ball_pointer);
    }
    if (event.key === "j") {
        ball.moveLeft(ball_pointer);
    }
    if (playerKeyMap.W) {
        player1.moveUP(p1);
    }
    if (playerKeyMap.S) {
        player1.moveDOWN(p1);
    }
    if (playerKeyMap.Up) {
        player2.moveUP(p2);
    }
    if (playerKeyMap.Down) {
        player2.moveDOWN(p2);
    }
});

// Event listener for keyup events (stop player movement)
document.addEventListener("keyup", event => {
    if (event.key === "ArrowUp") {
        playerKeyMap.Up = false;
    }
    if (event.key === "ArrowDown") {
        playerKeyMap.Down = false;
    }
    if (event.key === "W" || event.key === "w") {
        playerKeyMap.W = false;
    }
    if (event.key === "S" || event.key === "s") {
        playerKeyMap.S = false;
    }
});

// Game loop using setInterval
setInterval(function () {
    // Check for collisions and update scores
    var check = ball.hitDetection(player1.getCords(p1), player2.getCords(p2), ball.getCords(ball_pointer), screenPOS);
    if (check == "player 2 score!") {
        p2score += 1;
        scoreBoard.innerHTML = p1score + " | " + p2score;

        // Reset the ball's position and direction after a score
        ball.reset(p1, p2, ball_pointer);
        setTimeout(() => {
            ball.ballVector.right = true;
            ball.ballVector.left = false;
            ball.ballVector.down = false;
            ball.ballVector.up = false;
        }, 3000);

    } else if (check == "player 1 score!") {
        p1score += 1;
        scoreBoard.innerHTML = p1score + " | " + p2score;

        // Reset the ball's position and direction after a score
        ball.reset(p1, p2, ball_pointer);
        setTimeout(() => {
            ball.ballVector.left = true;
            ball.ballVector.right = false;
            ball.ballVector.down = false;
            ball.ballVector.up = false;
        }, 3000);
    }

    // Move the ball based on its direction
    if (ball.ballVector.down == true) {
        ball.moveDOWN(ball_pointer);
    }
    if (ball.ballVector.up == true) {
        ball.moveUP(ball_pointer);
    }
    if (ball.ballVector.right == true) {
        ball.moveRight(ball_pointer);
    }
    if (ball.ballVector.left == true) {
        ball.moveLeft(ball_pointer);
    }

}, 10);
