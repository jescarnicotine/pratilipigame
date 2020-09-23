const mongoose = require("mongoose");


const gameSchema =  mongoose.Schema({
    gameMatrix: {
        type: Array,
        required:[true]
        },
    moveRecord: { 
          type: Array,

        },
    turn:{
        type:String,
        default:"yellow"

    },    
    redMoves:{
          type: Array  
    },
    yellowMoves:{
        type: Array  
  }    
});

const gameModel = mongoose.model("gamedata",gameSchema,"gamedata");

exports.GameModel = gameModel;