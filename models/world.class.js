class World{
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    information;
    camera_x = 0;
    statusBar = new Statusbar();
    coinsBar = new Coinsbar();
    bottelsBar = new Bottelbar();
    statusBarEndboss = new StatusbarEndboss();
    throwableObject = [];
    numCoins = 0;
    numBottle = 0;    
    endboss = new Endboss();
    start = false;
    stopGame = false;
    timerDead = 0;
    coin_sound = new Audio('audio/coin.mp3');
    smash_sound = new Audio('audio/smash.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');
    music_sound = new Audio('audio/sound.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    won_sound = new Audio('audio/won.mp3');
    loose_sound = new Audio('audio/loose.mp3');

    constructor(canvas, keyboard, information){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.information = information;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * set the new world
     * 
     */
    setWorld(){
        this.character.world = this;
    }

    /**
     * let the game run
     * 
     */
    run(){
        setInterval(() => {
            this.checkCollisions();
        }, 10);
        setInterval(() => {
            this.checkThrowObjects();
        }, 100);
    }

    /**
     * check diffrent collisions with objects
     * 
     */
    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            this.checkCollisionCharacterEnemy(enemy);
        })
        this.level.coins.forEach((coin) => {
            this.checkCollisionCharacterCoin(coin);
        })
        this.level.bottels.forEach((bottle) => {
            this.checkCollisionCharacterBottle(bottle);
        })
        if(this.character.isColliding(this.endboss)){
            this.checkCollisionCharacterEndboss();
        }
    }

    /**
     * check collisionsbetween character and enemy
     * @param {string} [path=""] - object enemy
     */
    checkCollisionCharacterEnemy(enemy){
        if(this.character.isColliding(enemy)){
            if(this.character.speedY < 0 && this.character.isAboveGround()){
                if(this.information.music)
                    this.smash_sound.play();
                enemy.isKilled = true;
            }
            else if(!enemy.isKilled){
                if(this.information.music)
                    this.hurt_sound.play();
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        }
    }

    /**
     * check collisionsbetween character and coin
     * @param {string} [path=""] - object coin
     */
    checkCollisionCharacterCoin(coin){
        if(this.character.isColliding(coin)){
            if(coin.energy)
            {
                if(this.information.music)
                    this.coin_sound.play();
                coin.energy = false;
                this.numCoins++;
                this.coinsBar.setPercentage(this.numCoins);
            }
        }
    }

    /**
     * check collisionsbetween character and bottle
     * @param {string} [path=""] - object bottle
     */
    checkCollisionCharacterBottle(bottle){
        if(this.character.isColliding(bottle)){
            if(bottle.energy)
            {
                if(this.information.music)
                    this.bottle_sound.play();
                bottle.energy = false;
                this.numBottle++;
                this.bottelsBar.setPercentage(this.numBottle);
            }
        }
    }

    /**
     * check collisionsbetween character and endboss
     * 
     */
    checkCollisionCharacterEndboss(){
        if(this.information.music)
            this.hurt_sound.play();
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }
    
    /**
     * throw object and check collision
     * 
     */
    checkThrowObjects(){
        if((this.keyboard.throwB == 2) && this.numBottle){
            let bottle = new throwableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.numBottle--;
            this.bottelsBar.setPercentage(this.numBottle);
            setInterval(() => {this.checkCollisionEndbossBottle(bottle)},500);
            setInterval(() => {this.checkCollisionEnemyBottle(bottle)},10);
            this.keyboard.throwB = 0;
        } else if((this.keyboard.throwB == 2) && !this.numBottle)
            this.keyboard.throwB = 0;
    }

    /**
     * check collisionsbetween endboss and bottle
     * @param {string} [path=""] - object bottle
     */
    checkCollisionEndbossBottle(bottle){
        if(this.endboss.isColliding(bottle)){
            this.throwableObject.splice(-1, 1);
            this.endboss.energy = this.endboss.energy - 20;
            this.endboss.hurtBottle = true;
            this.statusBarEndboss.setPercentage(this.endboss.energy);
            if(this.information.music)
                this.smash_sound.play();
        }
    }

    /**
     * check collisionsbetween enemy and bottle
     * @param {string} [path=""] - object enemy
     */
    checkCollisionEnemyBottle(bottle){
        this.level.enemies.forEach((enemy) => {
            if(bottle.isColliding(enemy)){
                enemy.isKilled = true;
                if(this.information.music)
                    this.smash_sound.play();
            }
        })
    }

    /**
     * draw the world
     * 
     */
    draw(){
        if(this.information.start && !this.start)
            this.runChicken();
        if(!this.information.start && !this.start)
            this.openStartScreen();
        else if(this.character.dead && !this.stopGame)
            this.playDeadCharacter();
        else if(this.character.dead && this.stopGame && ((Date.now() - this.timerDead) > 2000))
            this.openLooseScreen();
        else if(this.endboss.energy <= 0 && !this.stopGame)
            this.playDeadEndboss();
        else if(this.endboss.energy <= 0 && this.stopGame && ((Date.now() - this.timerDead) > 3000))
             this.openWonScreen();
        else
            this.playGame(); 
    }

    /**
     * play normale game mode
     * 
     */
    playGame(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.showStaticObject();
        this.ctx.translate(-this.camera_x, 0); 
        this.showBars();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.throwableObject); 
        this.showMoveObject();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function (){
            self.draw();
        });
    }

    /**
     * show character, endboss, enemies
     * 
     */
    showMoveObject(){
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
    }

    /**
     * show background, clouds, coins, bottels
     * 
     */
    showStaticObject(){
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottels);
    }

    /**
     * show all bars
     * 
     */
    showBars(){
        this.addToMap(this.statusBar);
        this.addToMap(this.coinsBar); 
        this.addToMap(this.bottelsBar); 
        this.addToMap(this.statusBarEndboss); 
    }

    /**
     * open the won screen
     * 
     */
    openWonScreen(){
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.won);
        if(this.information.music)
            this.won_sound.play();
        document.getElementById("playAgain").classList.remove("d-none");
        document.getElementById("restart").classList.remove("d-none");
        document.getElementById("playInfo").classList.add("d-none");
    }

    /**
     * play dead endboss until show end screen
     * 
     */
    playDeadEndboss(){
        this.stopGame = true;
        this.timerDead = Date.now();
        let self = this;
        requestAnimationFrame(function (){
            self.draw();
        });
    }

    /**
     * open the loose screen
     * 
     */
    openLooseScreen(){
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.gameOver);
        if(this.information.music)
            this.loose_sound.play();
        document.getElementById("playAgain").classList.remove("d-none");
        document.getElementById("restart").classList.remove("d-none");
        document.getElementById("playInfo").classList.add("d-none");
    }

    /**
     * play dead character until show end screen
     * 
     */
    playDeadCharacter(){
        this.stopGame = true;
        this.timerDead = Date.now();
        let self = this;
        requestAnimationFrame(function (){
            self.draw();
        });
    }

    /**
     * open the start screen
     * 
     */
    openStartScreen(){
        this.addObjectsToMap(this.level.startScreen);
        let self = this;
        requestAnimationFrame(function (){
            self.draw();
        });
    }

    /**
     * add objects to the map
     * @param {string} [path=""] - array of objects
     */
    addObjectsToMap(objects){
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * add one object to the map
     * @param {string} [path=""] - object
     */
    addToMap(mo){
        if(mo.otherDirection)
            this.flipImage(mo);

        mo.draw(this.ctx);

        if(mo.otherDirection)
            this.flipImageBack(mo);
    }

    /**
     * flip Image to negativ x side
     * @param {string} [path=""] - object
     */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * flip Image to positive x side
     * @param {string} [path=""] - object
     */
    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * let the chickens run
     * 
     */
    runChicken(){
        this.level.enemies.forEach((enemy) => {
            enemy.run = true;
        });
        this.start = true;
    }
}