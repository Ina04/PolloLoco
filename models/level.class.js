class Level{
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottels;
    gameOver;
    won;
    startScreen;
    level_end_x = 4450;

    constructor(enemies, clouds, backgroundObjects, coins, bottels, gameOver, won, startScreen){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottels = bottels;
        this.gameOver = gameOver;
        this.won = won;
        this.startScreen = startScreen;
    }

    createNewLevel() {
        return new Level(this.enemies, this.clouds, this.backgroundObjects, this.coins, this.bottels, this.gameOver, this.won, this.startScreen);
    }

}