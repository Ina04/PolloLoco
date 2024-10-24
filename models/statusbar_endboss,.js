class StatusbarEndboss extends DrawableObject{

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',,
    ];

    percentage = 100;

    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 480;
        this.y = 20;
        this.width = 200;
        this.height = 60
        this.setPercentage(100);
    }

    /**
     * refresh the new percentage of the endboss energy bar
     * @param {string} [path=""] - get the new percentage
     */
    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()]; 
        this.img = this.imageCache[path];     
    }

    /**
     * refresh the img depending on the energy of the endboss
     * 
     */
    resolveImageIndex(){
        if(this.percentage >= 100)
            return 5;
        else if (this.percentage > 80)
            return 4;
        else if (this.percentage > 60)
            return 3;
        else if (this.percentage > 40)
            return 2;
        else if (this.percentage > 10)
            return 1;
        else
            return 0;
    }
}