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

var hitDetect= {"player1HIT": false, "player2HIT": false,
 "topWall": false, "bottomWall": false};

 var ballVector = {"up": false, "down": false, 
"left": false, "right": false}

console.log(player1);
console.log(player2);
console.log(ball);
function concat(a,b) {
    var c = [a, b];
    var result;
    for(var i =0; i < c.length; i++){
        switch(c[i]){
            case 0:
                c[i] = "0";
                break;
            case 1:
                c[i] = "1";
                break;
            case 2:
                c[i] = "2";
                break;
        }
        result = c[0] + c[1];
    }
    return parseInt(result);
}
var vector= concat(xVector,yVector);
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

//switch statement for ball vector
//will use a function that detects hits as parameter
function hitDetection(xVector, yVector){
    var p1Cords = player1.getCords(player1.id);
    var p2Cords = player2.getCords(player2.id);
    var ballCords = ball.getCords(ball.id);
    var ball_mid = (ballCords.bottom + ballCords.top) / 2;
    var p1_mid = (p1Cords.top + p1Cords.bottom) / 2;
    var p2_mid = (p2Cords.top + p2Cords.bottom) / 2;
    

    if(ballCords.left <= p1Cords.right && 
        (ball_mid <= p1Cords.bottom && ball_mid >= p1Cords.top)){
            xVector = 1;
            if(ball_mid > p1_mid){
                yVector = 2;
            }else if(ball_mid < p1_mid){
                yVector = 1;
            }else{
                yVector = 0;
            }
        }
    else if(ballCords.right >= p2Cords.left &&
        (ball_mid <= p2Cords.bottom && ball_mid >= p2Cords.top)){
            xVector = 2;
            if(ball_mid > p2_mid){
                yVector = 2;
            }else if (ball_mid < p2_mid){
                yVector = 1;
            }else{
                yVector = 0;
            }
        }else{
            xVector = xVector;
        }
    if(ballCords.top <= screenPOS.top){
        yVector = 1;
    }else{
        yVector = yVector;
    } 
    if(ballCords.bottom >= screenPOS.bottom){
        yVector = yVector;
    }  
    console.log("X vector");
    console.log(xVector);
    console.log(" yVector: " + yVector);
}
function updateBallVector(ballVector, vector){
    
    switch(vector){
        case 22:
            ballVector.down = true;
            ballVector.up = false;
            ballVector.right = false;
            ballVector.left = true;
            break;
        case 11:
            ballVector.right = true;
            ballVector.left = false;
            ballVector.up = true;
            ballVector.down = false;
            break;
        case 12:
            ballVector.right = true;
            ballVector.left = false;
            ballVector.up = false;
            ballVector.down = true;
            break;
        case 10:
            ballVector.right = true;
            ballVector.left = false;
            ballVector.up = true;
            ballVector.down = true;
            break;
        case 21:
            ballVector.right = false;
            ballVector.left = true;
            ballVector.up = true;
            ballVector.down = false;
            break;
        case 20:
            ballVector.right = true;
            ballVector.left = false;
            ballVector.up = true;
            ballVector.down = true;
            break;
    }
}
setInterval(function(){
    hitDetection(xVector, yVector);
    vector = concat(xVector, yVector);
    // updateBallVector(ballVector, vector);
    // console.log(ballVector);
}, 10);