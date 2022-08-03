class Form{
    constructor(){
        this.formImage = createImg("images/form_background.jpeg");
        this.input = createInput("Name");
        this.greeting = createElement('h2');
        this.titleName = createElement('h2');
        this.playButton = createButton("Click to play");
        this.resetButton = createButton("Click to reset");
        //this.image = loadImage("images/form_background.jpeg");
        
    }

    hide(){
        this.input.hide();
        this.greeting.hide();
        this.playButton.hide();
        this.titleName.hide();
    }

    bgHide(){
        this.formImage.hide();
    }

    resetButtonPosition(){
        this.resetButton.position(50,50);
    }

    display(){
        this.formImage.position(0,0);
        this.formImage.class("imgIncreasedSize");
        //image(this.image,500,500,2000,1000);

        this.titleName.class("titleFont");
        this.titleName.html("Varsity Footballers!!");
        this.titleName.position(570,50);

        this.playButton.position(850,600);
        this.playButton.class("increaseSize");

        this.resetButton.position(850,300);
        this.resetButton.class("increaseSize");

        //this.greeting.position(670,650);

        this.input.position(750,450);
        this.input.class("increaseSize");

        this.playButton.mousePressed(()=>{
            this.greeting.html("Please wait while your teammates join");
            this.greeting.position(830,500);
            this.input.hide();
            this.playButton.hide();
            
            player.name = this.input.value();
            playerCount+=1;
            player.index = playerCount;
            player.updatePlayerCount(playerCount);
            player.getTeamInfo();
        })

        this.resetButton.mousePressed(()=>{
            game.updateGameState(0);
            player.updatePlayerCount(0);
            var players = firebase.database().ref('playerTeam');
            players.remove();
            location.reload();
        })
    }
}