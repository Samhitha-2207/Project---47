class CPlayer{
    constructor(){
        this.index = null;
        this.score = null;
        this.rank = null;
    }

    CgetScore(){
        var CscoreInfo = database.ref('score/NPC');
        CscoreInfo.on("value",(data)=>{
            this.score = data.val();
        })
    }
    CgetRankInfo(){
        var CrankInfo = database.ref('rank/NPC');
        CrankInfo.on("value",(data)=>{
            this.rank = data.val();
        })
    }
    CupdateRank(rank){
        database.ref('/').set({
            rank:rank
        })
    }
}

