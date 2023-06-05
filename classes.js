export class player{
    constructor(name, id){
        this.name = name;
        this.id = id;
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
        console.log(this.getCords(this.id));
        return;
    }
    moveDOWN(id){
        let top = parseFloat(getComputedStyle(id).getPropertyValue("top"));
        top += 20;
        id.style.top = top + "px";
        console.log(this.getCords(this.id));
        return ;
    }   
}
export class projectile{
    constructor(id, xVector, yVector, ballVector){
        this.id = id;
        this.xVector = xVector;
        this.yVector = yVector;
        this.ballVector = {up: false, down: false, left: false, right: false};
    }
    moveUP(id){
        let top = parseFloat(getComputedStyle(id).getPropertyValue("top"));
        top -= 5;
        id.style.top = top + "px";
        console.log(this.getCords(this.id));
        return;
    }
    moveDOWN(id){
        let top = parseFloat(getComputedStyle(id).getPropertyValue("top"));
        top += 5;
        id.style.top = top + "px";
        console.log(this.getCords(this.id));
        return;
    }
    moveLeft(id) {
        let left = parseFloat(getComputedStyle(id).getPropertyValue('left'));
        left -= 5;
        id.style.left = left + 'px';
    }
    moveRight(id) {
        let left = parseFloat(getComputedStyle(id).getPropertyValue('left'));
        left += 5;
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

}