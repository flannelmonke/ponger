import { player } from "./classes.js";
import { projectile } from "./classes.js";

const p1 = document.getElementById("player1");//left player
const p2 = document.getElementById("player2"); // right player
const ball_pointer = document.getElementById("projectile");//ball projectile
const screen = document.getElementById("screen");//screen dimensions for accessibility
var yVector;
var xVector;

const player1 = new player("player1", p1);
const player2 = new player("player2", p2);
const ball = new projectile(ball_pointer);

var playerKeyMap = {"W": false, "S": false, "Up": false, "Down": false};

console.log(player1);
console.log(player2);
console.log(ball);

//TODO: MAKE SCREEN CLASS
function POS(id){
        let box = id.getBoundingClientRect();
        
        return {
          top: box.top + window.pageYOffset + 4,
          bottom: box.bottom + window.pageYOffset,
          left: box.left + window.pageXOffset,
          right: box.right + window.pageXOffset
        };
    }
const screenPOS = POS(screen);

document.addEventListener("keydown", event=>{
    if (event.key === "ArrowUp"){
        playerKeyMap.Up = true;
        }
    if(event.key === "ArrowDown"){
        playerKeyMap.Down = true;
    }
    if(event.key === "W" || event.key === "w"){
        playerKeyMap.W = true;
    }
    if(event.key === "S" || event.key === "s"){
        playerKeyMap.S = true;
    }
    if(event.key === "i"){
        ball.moveUP(ball_pointer);
    }
    if(event.key === "k"){
        ball.moveDOWN(ball_pointer);
    }
    if(event.key === "l"){
        ball.moveRight(ball_pointer);
    }
    if(event.key === "j"){
        ball.moveLeft(ball_pointer);
    }
    if(playerKeyMap.W){player1.moveUP(p1)}
    if(playerKeyMap.S){player1.moveDOWN(p1)}
    if(playerKeyMap.Up){player2.moveUP(p2)}
    if(playerKeyMap.Down){player2.moveDOWN(p2)}
});
document.addEventListener("keyup", event=>{
    if (event.key === "ArrowUp"){
        playerKeyMap.Up = false;
    }
    if (event.key === "ArrowDown"){
        playerKeyMap.Down = false;
    }
    if (event.key === "W" || event.key === "w"){
        playerKeyMap.W = false;
    }
    if(event.key === "S" || event.key === "s"){
        playerKeyMap.S = false;
    }
});

setInterval(function(){
    ball.hitDetection(player1.getCords(p1), player2.getCords(p2), ball.getCords(ball_pointer), screenPOS);
    console.log(ball.ballVector);
    if(ball.ballVector.down == true){
        ball.moveDOWN(ball_pointer);
    }if(ball.ballVector.up == true){
        ball.moveUP(ball_pointer);
    }if(ball.ballVector.right == true){
        ball.moveRight(ball_pointer);
    }if(ball.ballVector.left == true){
        ball.moveLeft(ball_pointer);
    }
}, 10);