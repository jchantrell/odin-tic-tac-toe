const Logic = (() => {
    let gameboard = [null, null, null, null, null, null, null, null, null];

    const currentTurn = () => {
        playerOne = null;
        playerTwo = null;
    }

    const currentMove = () => {
        let isValid = false;
        return {
            isValid
        }
    }

    const checkGameStatus = () => {
        // handle player one win conditions
        if (gameboard[0] == 'X' && gameboard[1] == 'X' && gameboard[2] == 'X'){
            Controller.gameWon()
        }
        if (gameboard[3] == 'X' && gameboard[4] == 'X' && gameboard[5] == 'X'){
            Controller.gameWon()
        }
        if (gameboard[6] == 'X' && gameboard[7] == 'X' && gameboard[8] == 'X'){
            Controller.gameWon()
        }
        if (gameboard[0] == 'X' && gameboard[3] == 'X' && gameboard[6] == 'X'){
            Controller.gameWon()
        }
        if (gameboard[1] == 'X' && gameboard[4] == 'X' && gameboard[7] == 'X'){
            Controller.gameWon()
        }
        if (gameboard[2] == 'X' && gameboard[5] == 'X' && gameboard[8] == 'X'){
            Controller.gameWon()
        }
        if (gameboard[0] == 'X' && gameboard[4] == 'X' && gameboard[8] == 'X'){
            Controller.gameWon()
        }
        if (gameboard[2] == 'X' && gameboard[4] == 'X' && gameboard[6] == 'X'){
            Controller.gameWon()
        }

        // handle player two win conditions
        if (gameboard[0] == 'O' && gameboard[1] == 'O' && gameboard[2] == 'O'){
            Controller.gameWon()
        }
        if (gameboard[3] == 'O' && gameboard[4] == 'O' && gameboard[5] == 'O'){
            Controller.gameWon()
        }
        if (gameboard[6] == 'O' && gameboard[7] == 'O' && gameboard[8] == 'O'){
            Controller.gameWon()
        }
        if (gameboard[0] == 'O' && gameboard[3] == 'O' && gameboard[6] == 'O'){
            Controller.gameWon()
        }
        if (gameboard[1] == 'O' && gameboard[4] == 'O' && gameboard[7] == 'O'){
            Controller.gameWon()
        }
        if (gameboard[2] == 'O' && gameboard[5] == 'O' && gameboard[8] == 'O'){
            Controller.gameWon()
        }
        if (gameboard[0] == 'O' && gameboard[4] == 'O' && gameboard[8] == 'O'){
            Controller.gameWon()
        }
        if (gameboard[2] == 'O' && gameboard[4] == 'O' && gameboard[6] == 'O'){
            Controller.gameWon()
        }
        
        // handle draw
        if (gameboard[0] && 
            gameboard[1] && 
            gameboard[2] && 
            gameboard[3] && 
            gameboard[4] && 
            gameboard[5] && 
            gameboard[6] && 
            gameboard[7] && 
            gameboard[8] !== null){
            console.log('probably draw?')
        }
    }

    return {
        gameboard,
        currentTurn,
        currentMove,
        checkGameStatus
    }
})();

const Controller = (() => {

    // on page load, start the game
    document.addEventListener('DOMContentLoaded', function() {
        gameStart()
      }, false);

    // listen for clicks on each cell and attempt to make a move
    document.body.addEventListener('click', function(event){
        if(event.target.classList.contains('cell')) {
            playerMove()
        };
      });

    const playerMove = () => {

        // check if the move is valid
        if (event.target.textContent == ""){
             Logic.currentMove.isValid = true;
        }

        if (Logic.currentMove.isValid == true){

            // player one
            if (Logic.currentTurn.playerOne == true) {
                event.target.textContent = "X";
                Logic.currentTurn.playerOne = false;
                Logic.currentTurn.playerTwo = true;
                Logic.currentMove.isValid = false;
                Logic.gameboard.splice(event.target.id, 1, 'X')
                Logic.checkGameStatus()
            }

            // player two
            else if (Logic.currentTurn.playerTwo == true) {
                event.target.textContent = "O";
                Logic.currentTurn.playerTwo = false;
                Logic.currentTurn.playerOne = true;
                Logic.currentMove.isValid = false;
                Logic.gameboard.splice(event.target.id, 1, 'O')
                Logic.checkGameStatus()
            }
        }
        else return;
    }

    const displayNotification = () => {

    }

    const gameStart = () => {
        Logic.currentTurn.playerOne = true;
        // prompt for name
        // prompt for vs player or PC
        // after prompts, set current turn to player 1
    }

    const gameWon = () => {
        console.log('wow')
        Logic.currentTurn.playerOne = false;
        Logic.currentTurn.playerTwo = false;

    }

    const gameRestart = () => {
        Logic.gameboard = [null, null, null, null, null, null, null, null, null]
    }

    return {
        playerMove,
        gameWon
    }
})();


// AI

