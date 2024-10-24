class DrawableObject{
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }

    /**
     * load all images of array
     * @param {string} [path=""] - array of images
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * load drwaable img
     * @param {string} [path=""] - path of img
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * draw img
     * @param {string} [path=""] - drawable space
     */
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * load all images of array
     * @param {string} [path=""] - drawable space
     */
    drawFrame(ctx){
        if(this instanceof Character || this instanceof Chicken || this instanceof Bottels || this instanceof Coins || this instanceof Endboss|| this instanceof MiniChicken)
        {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top,(this.x + this.width - this.offset.right) - (this.x + this.offset.left),(this.y + this.height - this.offset.bottom) - (this.y + this.offset.top));
            ctx.stroke();  
        } 
    }


}