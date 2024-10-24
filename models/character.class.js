class Character extends MovableObject{
    height = 280;
    width = 150;
    y = 150;
    speed = 10;
    offset = {
        top: 104,
        bottom: 0,
        left: 20,
        right: 40,
    }
    jumped = false;
    hurt_finished = false;
    dead = false;
    energy = 1000;
    lastAction = 0;
    firstMove = false;
    
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_IDLE= [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    world;
    run_sound = new Audio('audio/run.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    sleep_sound = new Audio('audio/sleep.mp3');

    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_IDLE);
        this.animate();
        this.applyGravity();
    }

    /**
     * animate the character of the game
     * 
     */
    animate(){
        setInterval(() => {this.checkKeyboardKeys();}, 12);
        setInterval(() => {
            if(this.isDead()){
                this.playCharacterDead();
            }else if(this.isHurt()){ 
                this.playCharacterHurt();
            }else if(this.isAboveGround()){
                this.playCharacterJump()
            }else{
                this.checkMoving();
                this.checkSleepingMode();  
            }                     
         }, 150);
    }

    /**
     * depending on the key set animation
     * 
     */
    checkKeyboardKeys(){
        if(this.world.keyboard.RIGHT &&  this.x < this.world.level.level_end_x){
            this.otherDirection = false;
            this.moveRight();
        }if(this.world.keyboard.LEFT && this.x > 0){
            this.otherDirection = true;
            this.moveLeft();
        }if(this.world.keyboard.SPACE && !this.isAboveGround()){
            this.jump();
            if(this.world.information.music)
                this.jump_sound.play();
        }
        this.world.camera_x = -this.x + 100;
    }

    /**
     * start Sleeping mode
     * 
     */
    checkSleepingMode(){
        let timePassed = new Date().getTime() - this.lastAction;
        timePassed = timePassed / 1000;
        if((timePassed > 5) && (this.firstMove)){
            this.playAnimation(this.IMAGES_SLEEP);
            if(this.world.information.music)
                this.sleep_sound.play();
        }else
            this.sleep_sound.pause();
    }

    /**
     * check movement of the character
     * 
     */
    checkMoving(){
        if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
            this.playAnimation(this.IMAGES_WALKING);
            this.lastAction = new Date().getTime();
            this.firstMove = true;
        }else
            this.playAnimation(this.IMAGES_IDLE);
        if(this.jumped || this.hurt_finished)
        {
            this.jumped = false;
            this.hurt_finished = false;
            this.loadImage('img/2_character_pepe/2_walk/W-21.png');
            this.lastAction = new Date().getTime();
            this.firstMove = true;
        }
    }

    /**
     * play animation of dead character
     * 
     */
    playCharacterDead(){
        this.playAnimation(this.IMAGES_DEAD);
        this.dead = true;
    }

    /**
     * play animation of hurting character
     * 
     */
    playCharacterHurt(){
        this.playAnimation(this.IMAGES_HURT);
        this.hurt_finished = true;
    }

    /**
     * play animation of jumping character
     * 
     */
    playCharacterJump(){
        this.playAnimation(this.IMAGES_JUMPING);
        this.jumped = true;
    }
}