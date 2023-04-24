var player1 = document.getElementById("player1");
var player2 = document.getElementById("player2");
var projectile = document.getElementById("projectile");
var who = {p1HIT: false, p2HIT: false};
function moveUP(player){
    let top = parseFloat(getComputedStyle(player).getPropertyValue("top"));
    top -= 20;
    player.style.top = top + "px";
    let cords = getCords(player);
    console.log(cords);
}
function moveDOWN(player){
    let top = parseFloat(getComputedStyle(player).getPropertyValue("top"));
    top += 20;
    player.style.top = top + "px";
    console.log(getCords(player));
}
document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp") {
        moveUP(player2);
    }
    if (event.key === "ArrowDown") {
        moveDOWN(player2);
    }
    if (event.key === "w" || event.key === "W") {
        moveUP(player1);
    }
    if (event.key === "s" || event.key === "S") {
        moveDOWN(player1);
    }
});
function getCords(item){
    let box = item.getBoundingClientRect();

    return {
      top: box.top + window.pageYOffset,
      bottom: box.bottom + window.pageYOffset,
      left: box.left + window.pageXOffset,
      right: box.right + window.pageXOffset
    };
}

//TO DO: MAKE A NEW FUNCTION FOR PLAYER COLLISION TO MAKE DETECT COLISION FAILURE

// function playerCollision(){
//     let p1Cords = getCords(player1);
//     let p2Cords = getCords(player2);
//     let projectileCords = getCords(projectile);
//     let projectilePOSL = parseFloat(getComputedStyle(projectile).getPropertyValue("left"));
    
//         if(projectileCords.top > p1Cords.top && projectileCords.bottom < p1Cords.bottom){
//         if(projectilePOSL > 0 && projectilePOSL < 50){
//             who.p1HIT = true;
//         }
    
//         if(projectileCords.top > p2Cords.top && projectileCords.bottom < p2Cords.bottom){
//         if(projectilePOSL > 700 && projectilePOSL < 750){
//            who.p2HIT= true;
//         }
//     }
//     }
// }
setInterval(() => {
    let p1Cords = getCords(player1);
    let p2Cords = getCords(player2);
    let projectileCords = getCords(projectile);
    let projectilePOSL = parseFloat(getComputedStyle(projectile).getPropertyValue("left"));
    
    if(projectileCords.top > p1Cords.top && projectileCords.bottom < p1Cords.bottom){
    if(projectilePOSL > 0 && projectilePOSL < 50){
            if(projectile.classList=="rightToLeft"){
            projectile.classList.remove("rightToLeft");
            projectile.classList.add("leftToRight");
        }
    }
}

    if(projectileCords.top > p2Cords.top && projectileCords.bottom < p2Cords.bottom){
    if(projectilePOSL > 700 && projectilePOSL < 750){
        if(projectile.classList=="leftToRight"){
            projectile.classList.remove("leftToRight");
            projectile.classList.add("rightToLeft");
        }
    }
}
}, 100);
