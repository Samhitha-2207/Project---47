var courtImg;
var database;
var gameState, playerCount;
var form, player, game;
var players, cplayers;
var allPlayers;
var ball;

function preload(){
    courtImg = loadImage("images/football_field.jpeg");
    computerImg = loadImage("images/computer_paddles.webp");
    playerImg = loadImage("images/player_paddle.webp");
    ballImg = loadImage("images/football.png");
}

function setup(){
    createCanvas(2000,1000);
    database = firebase.database();

    game = new Game();
    game.getGameState();
    game.start();
}

function draw(){
    if(playerCount === 7){
        game.updateGameState(1);
    }
    if(gameState === 1){
        clear();
        game.play();
    }
    if(gameState === 2){
        game.end();
    }
}