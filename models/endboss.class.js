class Endboss extends MovableObject{
    y = 55;
    width = 250;
    height = 400;
    energy = 100;
    hurtBottle = false;
    offset = {
        top: 64,
        bottom: 16,
        left: 8,
        right: 8,
    }
    count = false;
    attack = false;
    attackCount = 0;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    hadFirstContact = false;
    
    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.animate();
        this.speed = 0.15 + Math.random() * 0.5;
        this.x = 4400
    }

    /**
     * animate the endboss of the game
     * 
     */
    animate(){
        setInterval(() => {
            this.checkEnergy();      
        }, 200);

        
        setInterval(() => {
              this.moveEndboss();              
        }, 1000 / 60);

        setInterval(() => {
            this.attackCharacter();            
        }, 10);
    }

    /**
     * attack character if hit with bottle
     * 
     */
    attackCharacter(){
        if(this.attack){
            this.attackCount++;
            this.speed = 3;
            this.moveLeft();
            this.otherDirection = false;
            if(this.attackCount > 200){
                this.attackCount = 0;
                this.count = 200;
                this.attack = 0;
            }         
        }
        else
            this.speed = 1.5;
    }

     /**
     * move the endboss right/ left
     * @param {string} [path=""] - number of steps/ pixel
     */
    
    moveEndboss(){
        if(this.energy > 0 && !this.attack){
             if(this.count < 200){
                this.count++;
                this.moveLeft();
                this.otherDirection = false;
            }else if(this.count < 400){
                this.count++;
                this.moveRight();
                this.otherDirection = true;
            }else
                this.count = 0;
        }
    }

     /**
     * check the energy of endboss
     * 
     */
    checkEnergy(){
        if(this.hurtBottle){
            this.attack = true;
            this.playAnimation(this.IMAGES_HURT);
            setTimeout(() => {}, 1000);
            this.hurtBottle = false;
        }
        else if(this.attack)
            this.playAnimation(this.IMAGES_ATTACK);
        else if(this.energy <= 0)
            this.playAnimation(this.IMAGES_DEAD);
        else if(this.energy < 40)
            this.playAnimation(this.IMAGES_ALERT);
        else
            this.playAnimation(this.IMAGES_WALKING);
    }
}