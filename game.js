class Game{
    constructor(){
        
    }
    getGameState(){
        var gameStateRef  = database.ref('gameState');
        gameStateRef.on("value",function(data){
            gameState = data.val();
        })
    }
    updateGameState(state){
        database.ref('/').update({
            gameState: state
        });
    }
    async start(){
        player = new Player();

        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
            playerCount = playerCountRef.val();
            playerCount = player.getPlayerCount();
        }

        form = new Form()
        form.display();

        ball = createSprite(1000,500);
        ball.addImage(ballImg);
        ball.scale = 0.05;
        
        var goalkeeper = createSprite(1800,500);
        goalkeeper.addImage(playerImg);
        goalkeeper.scale = 0.125;

        var defender1 = createSprite(1500,250);
        defender1.addImage(playerImg);
        defender1.scale = 0.125;

        var defender2 = createSprite(1500,750);
        defender2.addImage(playerImg);
        defender2.scale = 0.125;

        var midfielder1 = createSprite(1100,225);
        midfielder1.addImage(playerImg);
        midfielder1.scale = 0.125;

        var midfielder2 = createSprite(1100,725);
        midfielder2.addImage(playerImg);
        midfielder2.scale = 0.125;

        var striker1 = createSprite(300,200);
        striker1.addImage(playerImg);
        striker1.scale = 0.125;

        var striker2 = createSprite(300,700);
        striker2.addImage(playerImg);
        striker2.scale = 0.125;

        players = [goalkeeper,defender1,defender2,midfielder1,midfielder2,striker1,striker2];

        var cgoalkeeper = createSprite(200,500);
        cgoalkeeper.addImage(computerImg);
        cgoalkeeper.scale = 0.125;

        var cdefender1 = createSprite(500,250);
        cdefender1.addImage(computerImg);
        cdefender1.scale = 0.125;

        var cdefender2 = createSprite(500,750);
        cdefender2.addImage(computerImg);
        cdefender2.scale = 0.125;

        var cmidfielder1 = createSprite(900,225);
        cmidfielder1.addImage(computerImg);
        cmidfielder1.scale = 0.125;

        var cmidfielder2 = createSprite(900,725);
        cmidfielder2.addImage(computerImg);
        cmidfielder2.scale = 0.125;

        var cstriker1 = createSprite(1700,200);
        cstriker1.addImage(computerImg);
        cstriker1.scale = 0.125;

        var cstriker2 = createSprite(1700,700);
        cstriker2.addImage(computerImg);
        cstriker2.scale = 0.125;

        cplayers = [cgoalkeeper,cdefender1,cdefender2,cmidfielder1,cmidfielder2,cstriker1,cstriker2];

        var invisibleWallRight = createSprite(2000,500,4000,5);
        invisibleWallRight.visible = false;

        var invisibleWallLeft = createSprite(0,500,4000,5);
        invisibleWallLeft.visible = false;

        var invisibleWallDown = createSprite(500,2000,4000,5);
        invisibleWallDown.visible = false;

        var invisibleWallUp = createSprite(500,0,4000,5);
        invisibleWallUp.visible = false;

        var user1 = new Kinvey.User();
        var user2 = new Kinvey.User();
        var user3 = new Kinvey.User();
        var user4 = new Kinvey.User();
        var user5 = new Kinvey.User();
        var user6 = new Kinvey.User();
        var user7 = new Kinvey.User();
    }
    play(){
        form.hide();
        form.resetButtonPosition();
        form.bgHide();

        Player.getPlayerInfo();
        player.getRankInfo();

        console.log("Hello world!");

        if(allPlayers !== undefined){
            background(courtImg);

            setInterval(this.startGame,3000);

            for(var plr in allPlayers){

                index = index + 1 ;

                players[index-1].x = x;
                players[index-1].y = y;

                if (index === player.index){
                    players[index - 1].shapeColor = "black";
                    camera.position.x = displayWidth/2;
                    camera.position.y = players[index-1].y
                    ellipse(x,y,70);
                }

                const p1 = Object.assign(user1,goalkeeper);
                const p2 = Object.assign(user2,defender1);
                const p3 = Object.assign(user3,defender2);
                const p4 = Object.assign(user4,midfielder1);
                const p5 = Object.assign(user5,midfielder2);
                const p6 = Object.assign(user6,striker1);
                const p7 = Object.assign(user7,striker2);

                createEdgeSprites();

                ball.bounceOff(topEdge);
                ball.bounceOff(bottomEdge);

                ball.bounceOff("goalkeeper");
                ball.bounceOff("defender1");
                ball.bounceOff("defender2");
                ball.bounceOff("midfielder1");
                ball.bounceOff("midfielder2");
                ball.bounceOff("striker1");
                ball.bounceOff("striker2");

                ball.bounceOff("cgoalkeeper");
                ball.bounceOff("cdefender1");
                ball.bounceOff("cdefender2");
                ball.bounceOff("cmidfielder1");
                ball.bounceOff("cmidfielder2");
                ball.bounceOff("cstriker1");
                ball.bounceOff("cstriker2");

                goalkeeper.bounce("edges");
                defender1.bounce("edges");
                defender2.bounce("edges");
                midfielder1.bounce("edges");
                midfielder2.bounce("edges");
                striker1.bounce("edges");
                striker2.bounce("edges");

                cgoalkeeper.bounce("edges");
                cdefender1.bounce("edges");
                cdefender2.bounce("edges");
                cmidfielder1.bounce("edges");
                cmidfielder2.bounce("edges");
                cstriker1.bounce("edges");
                cstriker2.bounce("edges");

                if(ball.x>1850){
                    players.score = players.score + 1;
                    players.score = players.getScore();
                    players.rank = players.getRankInfo();
                }
                if(ball.x<150){
                    cplayers.score = cplayers.score + 1;
                    cplayers.score = cplayers.CgetScore();
                    cplayers.rank = cplayers.CgetRankInfo();
                }
        
                if(players.score === 5 || cplayers.score === 5){
                    game.updateGameState(2);
                    
                    if(players.score === 5){
                        players.updateRank(1);
                        cplayers.CupdateRank(2);
                    }
                    if(cplayers.score === 5){
                        cplayers.CupdateRank(1);
                        players.updateRank(2);
                    }
                }

                console.log(players.score);
            }
            
        }

        drawSprites();
    }
    end(){
        var scorePC = players.getScore();
        var scoreNPC = cplayers.CgetScore();

        if(scorePC > scoreNPC){
            textSize(60);
            text("You win!!! Congragualations!",850,600);
            text("Please click on reset to play again or to exit screen",750,800);
        } else{
            textSize(60);
            text("You lose! Better luck next time!",850,600);
            text("Please click on reset to play again or to exit screen",750,800);
        }
    }
    startGame(){
        ball.velocityY = 10;
        ball.velocityX = 10;

        user1.y = World.mouseY;
        user2.y = World.mouseY;
        user3.y = World.mouseY;
        user4.y = World.mouseY;
        user5.y = World.mouseY;
        user6.y = World.mouseY;
        user7.y = World.mouseY;

        return; 

        cdefender1.velocityY = 10;
        cdefender2.velocityY = 10;
        cmidfielder1.velocityY = 10;
        cmidfielder2.velocityY = 10;
        cstriker1.velocityY = 10;
        cstriker2.velocityY = 10;
    }
}