class Bottels extends MovableObject{
    y = 338;
    height = 80;
    width = 80;
    energy = true;
    speed = 0;
    collected = false;
    offset = {
        top: 12,
        bottom: 8,
        right: 16,
        left: 20,
    };
    
    IMAGES_BOTTELS= [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor(){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTELS);
        this.animate();
        this.x = 500 + Math.random() * 3500;
    }

    /**
     * 
     * show or delete IMG of the bottle
     */
    animate(){
        setInterval(() => {
            if(!this.energy && !this.collected){
                this.deleteBottel(this.getNumBottel(this));
                this.collected = true;
            }
            else
                this.playAnimation(this.IMAGES_BOTTELS);
        }, 200);
    }

    /**
     * delete IMG of the bottle
     * @param {string} [path=""] - index of bottle
     */
    deleteBottel(num){
        level1.bottels.splice(num, 1);
    }

    /**
     * calculate the index of the bottle
     * @param {string} [path=""] - object bottle
     */
    getNumBottel(obj){
        for (let i = 0; i < level1.bottels.length; i++) {
            if (level1.bottels[i].x == obj.x ) {
                return i;
            }
        }
    }
}