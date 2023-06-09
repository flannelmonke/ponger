export class player{
    constructor(name, id, score){
        this.name = name;
        this.id = id;
        var score = 0;
    }
    getCords(id){
        let box = id.getBoundingClientRect();
        
        return {
          top: box.top + window.pageYOffset + 4,
          bottom: box.bottom + window.pageYOffset,
          left: box.left + window.pageXOffset,
          right: box.right + window.pageXOffset
        };
    }
    moveUP(id){
        let top = parseFloat(getComputedStyle(id).getPropertyValue("top"));
        top -= 20;
        id.style.top = top + "px";
        return;
    }
    moveDOWN(id){
        let top = parseFloat(getComputedStyle(id).getPropertyValue("top"));
        top += 20;
        id.style.top = top + "px";
        return ;
    }  
    increaseScore(id, score){
        this.score += 1;
    }
}
export class projectile{
    constructor(id, ballVector){
        this.id = id;
        this.ballVector = {up: false, down: false, left: false, right: false};
    }
    moveUP(id){
        let top = parseFloat(getComputedStyle(id).getPropertyValue("top"));
        top -= Math.floor(Math.random() * 7) + 3;
        id.style.top = top + "px";
        return;
    }
    moveDOWN(id){
        let top = parseFloat(getComputedStyle(id).getPropertyValue("top"));
        top += Math.floor(Math.random() * 7) + 3;
        id.style.top = top + "px";
        return;
    }
    moveLeft(id) {
        let left = parseFloat(getComputedStyle(id).getPropertyValue('left'));
        left -= Math.floor(Math.random() * 7) + 3;
        id.style.left = left + 'px';
    }
    moveRight(id) {
        let left = parseFloat(getComputedStyle(id).getPropertyValue('left'));
        left += Math.floor(Math.random() * 7) + 3;
        id.style.left = left + 'px';
    }
    getCords(id){
        let box = id.getBoundingClientRect();
        let mid = getComputedStyle(id).getPropertyValue('width');
        mid = mid/2;
        return {
          top: box.top + window.pageYOffset + 4,
          bottom: box.bottom + window.pageYOffset,
          left: box.left + window.pageXOffset,
          right: box.right + window.pageXOffset
        };
    }
    hitDetection(p1Cords, p2Cords, ballCords, screenPOS){
        var ball_mid = (ballCords.bottom + ballCords.top) / 2;
        var p1_mid = (p1Cords.top + p1Cords.bottom) / 2;
        var p2_mid = (p2Cords.top + p2Cords.bottom) / 2;
        
        if(ballCords.left <= screenPOS.left){
            return "player 2 score!"
        }if(ballCords.right >= screenPOS.right){
            return "player 1 score!";
        }
        if(ballCords.left <= p1Cords.right && 
            (ball_mid <= p1Cords.bottom && ball_mid >= p1Cords.top)){
                this.ballVector.left = false;
                this.ballVector.right = true;
                if(ball_mid > p1_mid){
                    this.ballVector.down = true;
                    this.ballVector.up = false;
                }else if(ball_mid < p1_mid){
                    this.ballVector.up = true;
                    this.ballVector.down = false;
                }else{
                    this.ballVector.down = false;
                    this.ballVector.up = false;
                }
            }
        else if(ballCords.right >= p2Cords.left &&
            (ball_mid <= p2Cords.bottom && ball_mid >= p2Cords.top)){
                this.ballVector.left = true;
                this.ballVector.right = false;
                if(ball_mid > p2_mid){
                    this.ballVector.down = true;
                    this.ballVector.up = false;
                }else if (ball_mid < p2_mid){
                    this.ballVector.down = false;
                    this.ballVector.up = true;
                }else{
                    this.ballVector.down = false;
                    this.ballVector.up = false;
                }
            }
        if(ballCords.top <= screenPOS.top){
            this.ballVector.down = true;
            this.ballVector.up = false;
        } 
        if(ballCords.bottom >= screenPOS.bottom){
            this.ballVector.up = true;
            this.ballVector.down = false;
        }  
    }
    reset(p1, p2, ball_pointer) {
        p1.style.top = "275px";
        p2.style.top = "80px";
        ball_pointer.style.left = "350px";
        ball_pointer.style.top = "0px";
        this.ballVector.down = false;
        this.ballVector.up = false;
        this.ballVector.left = false;
        this.ballVector.right = false;        
    }
}