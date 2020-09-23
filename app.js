const {checkIfValidMove,checkIfGameDraws, checkWin} = require("./gameModifications")
const {getNewGameMatrix, getNewMoveRecord} = require('./intializeGame')
const {GameModel} = require('./gameModel')
const mongoose = require('mongoose')
const express = require('express');
const app = express();

app.use(express.json());

mongoose

  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true

  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error(`Error : ${err} Could not connect to MongoDB...`));



app.get('/startGame',async(req,res)=>{
     
    var gameMatrix = getNewGameMatrix();
    var moveRecord = getNewMoveRecord();
    
    var gameData ={
        "gameMatrix":gameMatrix,
        "moveRecord":moveRecord,
        "redMoves": [],
        "yellowMoves": []
    };

    GameModel(gameData).save((err, doc)=>{
        if(err) return   res.status(400).send(err);
        const response = {
            "status":"Ready",
            "gameId":doc._id,
            "nextmove":doc.turn,
            "winner":"NA"
        }
        res.send(response);                  
    });
    
});



app.get('/getStatus/:id',async(req,res)=>{
    const _id = req.params.id;
    GameModel.find({_id:_id},(err,result)=>{
        if(err) return   res.status(400).send(err); 
        return res.send(result);
    });


})

app.post('/move',async(req, res)=>{
    
    var gameDatas = await GameModel.find({_id:req.body.gameId})
    if(gameDatas.length==0)return res.status(400).send("Invalid Game ID");
    var gameData = gameDatas[0];
    var col  = parseInt(req.body.playerMove);
    var row  = parseInt(gameData.moveRecord[0]);
    var max_row = 6;
    var turn = gameData.turn;
    var record = gameData.moveRecord;
    var response = {
        "gameId":gameData._id, //_id
        "status":"invalid move",  //valid or invalid
        "nextmove":turn,   //.turn if in valid then same person // if draw "NA"
        "winner":"NA", //draw , yellow, red    
    }

    if((req.body.player!="red" && req.body.player!="yellow") || req.body.player!=turn ){
        return res.send(response);
    }
    if(checkIfValidMove(col,gameData.moveRecord)){
        response.status="valid Move";
        if(turn=="yellow")
        {
            gameData.gameMatrix[6-row-1][col] = 0;
            gameData.yellowMoves.push(col);
            gameData.turn = "red";
                        
        }
        else{
            gameData.gameMatrix[6-row-1][col] = 1;
            gameData.redMoves.push(col);
            gameData.turn = "yellow";
        }
        gameData.moveRecord[col]++; 
        response.nextmove = gameData.turn;
        if(checkWin(gameData.gameMatrix,6-row-1,col))
        {
            response.winner=turn;
            response.nextmove="NA";
            await GameModel.deleteOne({_id:gameData._id}).catch(e => {return res.status(400).send(e);});
            return res.send(response);
        }
        await GameModel(gameData).save().catch(e => {return res.status(400).send(e);});
        
    } 
    if(checkIfGameDraws(record)){
        response.winner="Game Draw";
        response.nextmove="NA";
        await GameModel.deleteOne({_id:gameData._id}).catch(e => {return res.status(400).send(e);});
    }
    res.send(response);
})
  



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));