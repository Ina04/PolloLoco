class Coinsbar extends DrawableObject{

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    percentage = 0;

    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 65;
        this.width = 200;
        this.height = 60
        this.setPercentage(0);
    }

    /**
     * refresh the new percentage of the coins bar
     * @param {string} [path=""] - get the new percentage
     */
    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()]; 
        this.img = this.imageCache[path];     
    }

    /**
     * refresh the img depending on the number of bottels
     * 
     */
    resolveImageIndex(){
        if(this.percentage == 10)
            return 5;
        else if (this.percentage > 8)
            return 4;
        else if (this.percentage > 6)
            return 3;
        else if (this.percentage > 3)
            return 2;
        else if (this.percentage >= 1)
            return 1;
        else
            return 0;
    }
}