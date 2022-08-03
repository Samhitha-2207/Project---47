class Player{
    constructor(){
        this.index = null;
        this.playerName = null;
        this.individualScore = 0;
        this.score = null;
        this.rank = null;
        this.teamName = null;
    }

    getTeamInfo(){
        var teamPlayerIndex = 'playerTeam/player'+this.index;
        database.ref(teamPlayerIndex).set({
            playerName:this.playerName
        })
    }
    getPlayerCount(){
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value",(data)=>{
          playerCount = data.val();
        })
      }
    updatePlayerCount(count){
        database.ref('/').update({
          playerCount: count
        });
    }
    getScore(){
        var scoreInfo = database.ref('score/PC');
        scoreInfo.on("value",(data)=>{
            this.score = data.val();
        })
    }
    getRankInfo(){
        var rankInfo = database.ref('rank/PC');
        rankInfo.on("value",(data)=>{
            this.rank = data.val();
        })
    }
    updateRank(rank){
        database.ref('/').set({
            rank:rank
        })
    }
    static getPlayerInfo(){
        var playerInfoRef = database.ref('player');
        playerInfoRef.on("value",(data)=>{
          allPlayers = data.val();
        })
      }
}

