class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 500;
    lastHit = 0;
    collision_top = false;
    run = false;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }

    /**
     * add calculation of the gravity
     * 
     */
    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
    
        }, 1000 / 25)
    };

    /**
     * after hit less energy
     * 
     */
    hit(){
        this.energy -= 5;
        if(this.energy < 0)
            this.energy = 0;
        else
            this.lastHit = new Date().getTime();
    }

    /**
     * check if object is dead
     * @returns {Promise<object>} true - dead, false - alive
     */
    isDead(){ 
        return this.energy <= 0;
    }

    /**
     * check last hurt of object
     * @returns {Promise<object>} true - time is over
     */
    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.4;
    }

    /**
     * check if object is over ground
     * @returns {Promise<object>} true - object above ground
     */
    isAboveGround(){
        if(this instanceof throwableObject)
            return true;
        else
            return this.y < 140;
    }

    /**
     * move object to the right
     * 
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * move object to the left
     * 
     */
    moveLeft(){
        this.x -= this.speed;
    }

    /**
     * show img of the object
     * @param {string} [path=""] - array of images
     */
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * let object jump
     * 
     */
    jump(){
        this.speedY = 30;
    }

    /**
     * check if object collids with other object
     * @param {string} [path=""] - object
     */
    isColliding(obj){
        return (this.x + this.width - this.offset.right) >= obj.x + obj.offset.left
            && this.x + this.offset.left < obj.x + obj.width - obj.offset.right
            && (this.y + this.height - this.offset.bottom) > obj.y + obj.offset.top
            && (this.y + this.offset.top) < (obj.y + obj.height - obj.offset.bottom);
    }
}