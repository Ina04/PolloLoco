class MiniChicken extends MovableObject{
    y = 380;
    width = 50;
    height = 40;
    energy = true;
    isKilled = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.speed = 0.15 + Math.random() * 0.5;
        this.x = 500 + Math.random() * 3500;
    }

    /**
     * animate the minichickens of the game
     * 
     */
    animate(){
        setInterval(() => {
            if(!this.isKilled && this.run)
                this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() => {
            this.checkEnergy();
        }, 200);
    }

    /**
     * check the energy of the chicken
     * 
     */
    checkEnergy(){
        if(this.energy && this.isKilled){
            this.energy = false;
            this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
            setTimeout(() => {
                this.deleteChicken(this.getNumChicken(this));
            }, 1000);
        }
        else if(!this.isKilled && this.run)
            this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * delete IMG of the minichicken
     * @param {string} [path=""] - index of minichicken
     */
    deleteChicken(num){
        level1.enemies.splice(num, 1);
    }

    /**
     * calculate the index of the minichicken
     * @param {string} [path=""] - object minichicken
     */
    getNumChicken(obj){
        for (let i = 0; i < level1.enemies.length; i++) {
            if (level1.enemies[i].x == obj.x ) {
                return i;
            }
        }
    }
}