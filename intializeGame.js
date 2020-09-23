function IntializeNewMatrix(col=7,row=6)
{
    var gameMatrix = new Array(row); 
    for (var i = 0; i < row; i++) { 
        gameMatrix[i] = new Array(col); 
    }
    for(var i=0; i< row; i++)
    {
        for(var j=0; j<col; j++)
        {
            gameMatrix[i][j]=-1;
        }
    }
    return gameMatrix; 
}
function IntializeNewRecord(col=7)
{
    var record = new Array(col);
    for (var i = 0; i < col; i++) { 
        record[i] = 0; 
    }
    return record;
}

exports.getNewMoveRecord = IntializeNewRecord;
exports.getNewGameMatrix = IntializeNewMatrix;