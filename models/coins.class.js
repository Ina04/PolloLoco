class Coins extends MovableObject{
    y = 60;
    width = 100;
    height = 100;
    energy = true;
    speed = 0;
    collected = false;
    offset = {
        top: 32,
        bottom: 32,
        right: 32,
        left: 32,
    };

    IMAGES_COINS= [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor(){
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.animate();
        this.y = 60 + Math.random() * 60;
        this.x = 200 + Math.random() * 3500;
    }

    /**
     * animate the coins of the game
     * 
     */
    animate(){
        setInterval(() => {
            if(!this.energy && !this.collected){
                this.deleteCoin(this.getNumCoin(this));
                this.collected = true;
            }
            else
                this.playAnimation(this.IMAGES_COINS);
        }, 200);
    }

    /**
     * delete IMG of the Coin
     * @param {string} [path=""] - index of chicken
     */
    deleteCoin(num){
        level1.coins.splice(num, 1);
    }

    /**
     * 
     * calculate the index of the coin
     */
    getNumCoin(obj){
        for (let i = 0; i < level1.coins.length; i++) {
            if (level1.coins[i].x == obj.x ) {
                return i;
            }
        }
    }
}