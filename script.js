// player factory

const player = (() => {

    // listens for clicks on each cell
    const playerMoveListener = (() => {
        document.body.addEventListener('click', function(event){
            if(event.target.classList.contains('cell')) {
                move()
            };
          });
    })();

    const move = () => {
        Controller.playerMove()
    }

})();

const Controller = (() => {

    // create array of 9 empty elements to represent gameboard
    let gameboard = [null, null, null, null, null, null, null, null, null];

    // on page load, start the game
    const pageLoaded = (() => {
        document.addEventListener('DOMContentLoaded', function() {
            gameStart()
          }, false);
    })();
      
    const playerMove = () => {

        // check if the move is valid
        // REWRITE THIS TO CHECK ARRAY, NOT HTML
        if (event.target.textContent == ""){
             currentMove.isValid = true;
        }

        if (currentMove.isValid == true){

            // player one
            if (currentTurn.playerOne == true) {
                event.target.textContent = "X";
                currentTurn.playerOne = false;
                currentTurn.playerTwo = true;
                currentMove.isValid = false;
                gameboard.splice(event.target.id, 1, 'X')
                gameStatus()
            }

            // player two
            else if (currentTurn.playerTwo == true) {
                event.target.textContent = "O";
                currentTurn.playerTwo = false;
                currentTurn.playerOne = true;
                currentMove.isValid = false;
                gameboard.splice(event.target.id, 1, 'O')
                gameStatus()
            }
        }
        else return;
    }

    const displayNotification = () => {

    }

    const gameRestart = () => {
        gameboard = [null, null, null, null, null, null, null, null, null]
    }

    const currentTurn = () => {
        playerOne = false;
        playerTwo = false;
    }

    // rewrite this jank
    const currentMove = () => {
        let isValid = false;
        return {
            isValid
        }
    }

    const gameStatus = () => {

        // handle player one win conditions
        if (
            gameboard[0] == 'X' && gameboard[1] == 'X' && gameboard[2] == 'X'|| gameboard[3] == 'X' && gameboard[4] == 'X' && gameboard[5] == 'X'|| gameboard[6] == 'X' && gameboard[7] == 'X' && gameboard[8] == 'X'||
            gameboard[0] == 'X' && gameboard[3] == 'X' && gameboard[6] == 'X'||
            gameboard[1] == 'X' && gameboard[4] == 'X' && gameboard[7] == 'X'||
            gameboard[2] == 'X' && gameboard[5] == 'X' && gameboard[8] == 'X'||
            gameboard[0] == 'X' && gameboard[4] == 'X' && gameboard[8] == 'X'||
            gameboard[2] == 'X' && gameboard[4] == 'X' && gameboard[6] == 'X'
        ){
            gameOutcome('X')
        }

        // handle player two win conditions
        else if (
            gameboard[0] == 'O' && gameboard[1] == 'O' && gameboard[2] == 'O'|| gameboard[3] == 'O' && gameboard[4] == 'O' && gameboard[5] == 'O'|| gameboard[6] == 'O' && gameboard[7] == 'O' && gameboard[8] == 'O'||
            gameboard[0] == 'O' && gameboard[3] == 'O' && gameboard[6] == 'O'||
            gameboard[1] == 'O' && gameboard[4] == 'O' && gameboard[7] == 'O'||
            gameboard[2] == 'O' && gameboard[5] == 'O' && gameboard[8] == 'O'||
            gameboard[0] == 'O' && gameboard[4] == 'O' && gameboard[8] == 'O'||
            gameboard[2] == 'O' && gameboard[4] == 'O' && gameboard[6] == 'O'
        ){
            gameOutcome('O')
        }

        // handle draw conditions
        else if (
            gameboard[0] && 
            gameboard[1] && 
            gameboard[2] && 
            gameboard[3] && 
            gameboard[4] && 
            gameboard[5] && 
            gameboard[6] && 
            gameboard[7] && 
            gameboard[8] !== null ){
                gameOutcome('D')
        }
    }

    const gameStart = () => {
        currentTurn.playerOne = true;
        // prompt for name
        // prompt for vs player or PC
        // after prompts, set current turn to player 1
    }

    const gameOutcome = (outcome) => {
        if (outcome == 'X') {
            console.log('player one wins')
        }
        else if (outcome == 'O') {
            console.log('player two wins')
        }
        else if (outcome == 'D') {
            console.log('draw')
        }
        currentTurn.playerOne = false;
        currentTurn.playerTwo = false;
    }

    return {
        playerMove
    }
})();


// AI

