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
    constructor(id){
        this.id = id;
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
}
//switch statement for ball vector
//will use a function that detects hits as parameter
