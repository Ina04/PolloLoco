class Chicken extends MovableObject{
    y = 360;
    width = 70;
    height = 60;
    energy = true;
    isKilled = false;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.speed = 0.15 + Math.random() * 0.5;
        this.x = 500 + Math.random() * 3500;
    }

    /**
     * animate the chickens of the game
     * 
     */
    animate(){
        setInterval(() => {
            if(!this.isKilled && this.run)
                this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() => {
            if(this.energy && this.isKilled){
                this.energy = false;
                this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
                setTimeout(() => {
                    this.deleteChicken(this.getNumChicken(this));
                }, 1000);
            }
            else if(!this.isKilled && this.run)
                this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    /**
     * delete IMG of the chicken
     * @param {string} [path=""] - index of chicken
     */
    deleteChicken(num){
        level1.enemies.splice(num, 1);
    }

    /**
     * calculate the index of the chicken
     * @param {string} [path=""] - object chicken
     */
    getNumChicken(obj){
        for (let i = 0; i < level1.enemies.length; i++) {
            if (level1.enemies[i].x == obj.x ) {
                return i;
            }
        }
    }
}