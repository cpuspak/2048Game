var grid = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]

var highScore = 0;
var curScore = 0;


function populateAnotherCell(){
    var cellsWithZero = [];
    for (let i = 0 ; i < 4 ; i++){
        for (let j = 0 ; j < 4 ; j++){
            if (grid[i][j] == 0) cellsWithZero.push([i,j]);
        }
    }
    if (cellsWithZero.length == 0) return;
    var randomPlace =  Math.floor(Math.random() * cellsWithZero.length);
    var probability = Math.random();
    if (probability < 0.5)
        grid[cellsWithZero[randomPlace][0]][cellsWithZero[randomPlace][1]] = 2;
    else grid[cellsWithZero[randomPlace][0]][cellsWithZero[randomPlace][1]] = 4;
}


function initialiseGrid() {
    for (let i = 0 ; i < 4 ; i++){
        for (let j = 0 ; j < 4 ; j++) grid[i][j] = 0;
    }
    
    populateAnotherCell();
    populateAnotherCell();
    curScore = 0;
    drawGrid();
}

function rotateGridAntiClockWise(){
    for (let i = 0; i < 2 ; i++) {
        for (let j = i; j < 4 - i - 1 ; j++) {
            var temp = grid[i][j];
            grid[i][j] = grid[j][4 - 1 - i];
            grid[j][4 - 1 - i] = grid[4 - 1 - i][4 - 1 - j];
            grid[4 - 1 - i][4 - 1 - j] = grid[4 - 1 - j][i];
            grid[4 - 1 - j][i] = temp;
        }
    }
}
function slideLeft(i){
    var gameOverFlag = 1;
    var temp = [0,0,0,0];
    var tempI = 0;
    for (let j = 0 ; j < 4 ; j++){
        if (grid[i][j] == 0) gameOverFlag = 0;
        if (grid[i][j] != 0){
            temp[tempI] = grid[i][j];
            tempI++
        }
    }
    grid[i] = temp;
    return gameOverFlag;
}

function moveGridLeft() {
    var gameOverFlag = 1;
    for (let i = 0 ; i < 4 ; i++){
        gameOverFlag = slideLeft(i);
    }

    for (let i = 0 ; i < 4 ; i++){
        let j = 0;
        while (j < 3){
            if (grid[i][j] == grid[i][j+1] && grid[i][j] != 0){
                curScore += 2*grid[i][j];
                grid[i][j] *= 2;
                grid[i][j+1] = 0;
                j += 2;
            } else j += 1;
        }
        gameOverFlag = slideLeft(i);
    }
    return gameOverFlag;
}

function checkMovement(){
    for (let i = 0 ; i < 4 ; i++){
        for (let j = 0 ; j < 4 ; j++){
            if (grid[i][j] == 0) return 1;
            if (i+1 < 4 && (grid[i][j] == grid[i + 1][j])) return 1;
            if (j+1 < 4 && (grid[i][j] == grid[i][j + 1])) return 1;
        }
    }
    return 0;
}

function checkGameOver(){ 
    if (checkMovement() == 1) return 0;
    rotateGridAntiClockWise();
    if (checkMovement() == 1) {
        rotateGridAntiClockWise();
        rotateGridAntiClockWise();
        rotateGridAntiClockWise();    
        return 0;
    }
    rotateGridAntiClockWise();
    if (checkMovement() == 1) {
        rotateGridAntiClockWise();
        rotateGridAntiClockWise();  
        return 0;
    }
    rotateGridAntiClockWise();
    if (checkMovement() == 1) {
        rotateGridAntiClockWise();
        return 0;
    }
    rotateGridAntiClockWise();
    return 1;
}

function adjustGridAfterMovement(direction){
    var gameOverFlag = 0;
    var gameOverFlag = checkGameOver();
    if (gameOverFlag == 1){
        return gameOverFlag;
    }
    //direction = {0 -> left, 1 -> up, 2 -> right, 3 -> down}
    switch(direction) {
        case 0:
            moveGridLeft();
            break;
        case 1:
            rotateGridAntiClockWise();
            moveGridLeft();
            rotateGridAntiClockWise();
            rotateGridAntiClockWise();
            rotateGridAntiClockWise();

            break;
        case 2:
            rotateGridAntiClockWise();
            rotateGridAntiClockWise();
            moveGridLeft();
            rotateGridAntiClockWise();
            rotateGridAntiClockWise();
            break;
        case 3:
            rotateGridAntiClockWise();
            rotateGridAntiClockWise();
            rotateGridAntiClockWise();
            moveGridLeft();            
            rotateGridAntiClockWise();
            break;
        default:
          // do nothing
    }
    //console.log(grid);
    return 0;
}

function movementPossible(dx,dy){
    for (let i = 0 ; i < 4 ; i++){
        for (let j = 0 ; j < 4 ; j++){
            if ((i + dy) >= 0 && (i + dy) < 4 && (j + dx) >= 0 && (j + dx) < 4 && grid[i][j] != 0){
                if (grid[i+dy][j+dx] == 0 || grid[i+dy][j+dx] == grid[i][j]) return 1;
            }
        }
    }
    return 0;  
}

function drawGrid() {
    var gridDisplay = document.querySelector('#root');
    gridDisplay.innerHTML = '';

    for (let i = 0 ; i < 4 ; i++){
        for (let j = 0 ; j < 4 ; j++){
            square = document.createElement('div');
            switch(grid[i][j]){
                case 2:
                    square.className += 'two boxstyle';
                    break;
                case 4:
                    square.className += 'four boxstyle';
                    break;
                case 8:
                    square.className += 'eight boxstyle';
                    break;
                case 16:
                    square.className += 'sixteen boxstyle';
                    break;
                case 32:
                    square.className += 'thirtytwo boxstyle';
                    break;
                case 64:
                    square.className += 'sixtyfour boxstyle';
                    break;
                case 128:
                    square.className += 'onetwentyeight boxstyle';
                    break;
                case 256:
                    square.className += 'twofifitysix boxstyle';
                    break;
                case 512:
                    square.className += 'fivehundredtwelve boxstyle';
                    break;
                case 1024:
                    square.className += 'onethousandtwentyfour boxstyle';
                    break;
                case 2048:
                    square.className += 'twothousandfortyeight boxstyle';
                    break;
                default:
                    //do nothing 
                    break;
            }
            if (grid[i][j] != 0) square.innerHTML = grid[i][j];
            gridDisplay.appendChild(square);
        }
    }
    var highestScore = document.querySelector('#highestScore');
    highestScore.innerText = "High score : "+highScore;
    var currScore = document.querySelector('#currentScore');
    currScore.innerText = "Your score : "+curScore;
}

function winner(){
    for (let i = 0 ; i < 4 ; i++){
        for (let j = 0 ; j < 4 ; j++){
            if (grid[i][j] == 2048) return 1;
        }
    }
    return 0;
}

window.onload = function (){
    initialiseGrid();
    var gameOverFlag = 0;
    var populateFlag = 0;

    
    document.onkeyup =function keyUp(e) {
        var currKey=0,e=e||event;
        currKey=e.keyCode||e.which||e.charCode;
        var keyName = String.fromCharCode(currKey);
        switch (currKey){
            case 37:
                if (movementPossible(-1,0) == 1) populateFlag = 1;
                gameOverFlag = adjustGridAfterMovement(0);
                if (populateFlag == 1 && gameOverFlag == 0) populateAnotherCell();
                populateFlag = 0;
                drawGrid();
                break;
            case 38:
                if (movementPossible(0,-1) == 1) populateFlag = 1;
                gameOverFlag = adjustGridAfterMovement(1);
                if (populateFlag == 1 && gameOverFlag == 0) populateAnotherCell();
                populateFlag = 0;
                drawGrid();
                break;
            case 39:
                if (movementPossible(1,0) == 1) populateFlag = 1;
                gameOverFlag = adjustGridAfterMovement(2);
                if (populateFlag == 1 && gameOverFlag == 0) populateAnotherCell();
                populateFlag = 0;
                drawGrid();
                break;
            case 40:
                if (movementPossible(0,1) == 1) populateFlag = 1;
                gameOverFlag = adjustGridAfterMovement(3);
                if (populateFlag == 1 && gameOverFlag == 0) populateAnotherCell();
                populateFlag = 0;
                drawGrid();
                break;
        }
        
        if (winner() == 1){
            drawGrid();
            alert("Congratulations!! You Won");
            if (curScore > highScore) highScore = curScore;
            initialiseGrid();
        }
        else if (gameOverFlag == 1) {
            alert("Game Over!!");
            if (curScore > highScore) highScore = curScore;
            initialiseGrid();
        }
        
    }

    
}