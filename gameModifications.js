function checkIfGameDraws(moverecord,row=6)
{
    for(var i=0; i<moverecord.length; i++)
    {
        if(moverecord[i]!=6){return false;}
    }
    return true;
}
function checkIfValidMove(col,moverecord)
{
    if(moverecord[col]<6){return true;}
    return false;
}
function checkWin(gameMatrix, i, j) {
    const WINNING_LENGTH=4;
    // an invaild cell
    if (i < 0 || i >= gameMatrix.length || j < 0 || j >= gameMatrix[0].length) {
        return false;
    }

    PLAYER_ID = gameMatrix[i][j];
    console.log(PLAYER_ID);

    // checking vertical win (↕↕↕↕)
    counted_length = 1;

    indx = i;
    while (indx + 1 < gameMatrix.length && PLAYER_ID == gameMatrix[indx + 1][j] && counted_length <= WINNING_LENGTH) {
        indx++;
        counted_length++;
        if (counted_length == 4) {
            return true;
        }
    }
    indx = i;
    while (indx - 1 >= 0 && PLAYER_ID == gameMatrix[indx - 1][j] && counted_length <= WINNING_LENGTH) {
        indx--;
        counted_length++
        if (counted_length == 4) {
            return true;
        }
    }

    // checking horizontal win (↔↔↔)
    counted_length = 1;

    jndx = j;
    while (jndx + 1 < gameMatrix[0].length && PLAYER_ID == gameMatrix[i][jndx + 1] && counted_length <= WINNING_LENGTH) {
        jndx++;
        counted_length++;
        if (counted_length == 4) {
            return true;
        }
    }
    jndx = j;
    while (jndx - 1 >= 0 && PLAYER_ID == gameMatrix[i][jndx - 1] && counted_length <= WINNING_LENGTH) {
        jndx--;
        counted_length++
        if (counted_length == 4) {
            return true;
        }
    }

    // checking south-west win (↓→↓→↓→)
    counted_length = 1;

    indx = i;
    jndx = j;
    while (indx + 1 < gameMatrix.length && jndx + 1 < gameMatrix[0].length && PLAYER_ID == gameMatrix[indx + 1][jndx + 1] && counted_length <= WINNING_LENGTH) {
        indx++; jndx++;
        counted_length++;
        if (counted_length == 4) {
            return true;
        }
    }
    indx = i;
    jndx = j;
    while (indx - 1 >= 0 && jndx - 1 >= 0 && PLAYER_ID == gameMatrix[indx - 1][jndx - 1] && counted_length <= WINNING_LENGTH) {
        indx--; jndx--;
        counted_length++
        if (counted_length == 4) {
            return true;
        }
    }

    // checking south-east win (↓←↓←↓←)
    counted_length = 1;

    indx = i;
    jndx = j;
    while (indx + 1 < gameMatrix.length && jndx - 1 >= 0 && PLAYER_ID == gameMatrix[indx + 1][jndx - 1] && counted_length <= WINNING_LENGTH) {
        indx++; jndx--;
        counted_length++;
        if (counted_length == 4) {
            return true;
        }
    }
    indx = i;
    jndx = j;
    while (indx - 1 >= 0 && jndx + 1 < gameMatrix[0].length && PLAYER_ID == gameMatrix[indx - 1][jndx + 1] && counted_length <= WINNING_LENGTH) {
        indx--; jndx++;
        counted_length++
        if (counted_length == 4) {
            return true;
        }
    }

    return false;
}


exports.checkIfGameDraws = checkIfGameDraws;
exports.checkIfValidMove = checkIfValidMove;
exports.checkWin=checkWin;