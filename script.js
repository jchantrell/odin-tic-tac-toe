// player factory

const player = (() => {

    // listens for clicks on each cell
    const playerMoveListener = (() => {
        document.body.addEventListener('click', function(event){
            if(event.target.classList.contains('cell')) {
                cell = event.target;
                move(cell);
            };
          });
    })();

    const move = () => {
        Controller.playerMove(cell)
    }

})();

const Controller = (() => {

    const menuListener = (() => {
        document.body.addEventListener('click', function(event){
            if(event.target.classList.contains('restart')) {
                gameRestart()
                console.log('restart')
            };
            if(event.target.classList.contains('home')) {
                gameStart()
            };
          });
    })();

    // create array of 9 empty elements to represent gameboard
    let gameboard = [null, null, null, null, null, null, null, null, null];

    // on page load, start the game
    const pageLoaded = (() => {
        document.addEventListener('DOMContentLoaded', function() {
            gameStart()
          }, false);
    })();
      
    const playerMove = (cell) => {

        if (currentMove(cell).valid == true){

            // player one
            if (currentTurn.playerOne == true) {
                cell.textContent = "X";
                gameboard.splice(cell.id, 1, 'X')
                currentTurn.playerOne = false;
                currentTurn.playerTwo = true;
                gameStatus()
            }

            // player two
            else if (currentTurn.playerTwo == true) {
                cell.textContent = "O";
                currentTurn.playerTwo = false;
                currentTurn.playerOne = true;
                currentMove.valid = false;
                gameboard.splice(cell.id, 1, 'O')
                gameStatus()
            }
        }
        else return;
    }

    const displayNotification = () => {

    }

    const gameRestart = () => {
        gameboard = [null, null, null, null, null, null, null, null, null];
        cells = document.querySelectorAll('.cell')
        cells.forEach (cell => {
            cell.innerText = '';
        });
        gameStart();
    }

    const currentTurn = () => {
        playerOne = false;
        playerTwo = false;
    }

    const currentMove = (cell) => {
        let valid = false;
        if (gameboard[cell.id] == null) {
            valid = true;
        }
        return {
            valid
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

        playerOne = document.querySelector('.playerOneScore');
        playerTwo = document.querySelector('.playerTwoScore');
        ties = document.querySelector('.tiesAmount');

        if (outcome == 'X') {
            playerOne.innerText = parseInt(playerOne.innerText) + 1;
        }
        else if (outcome == 'O') {
            playerTwo.innerText = parseInt(playerTwo.innerText) + 1;
        }
        else if (outcome == 'D') {
            ties.innerText = parseInt(ties.innerText) + 1;
        }
        currentTurn.playerOne = false;
        currentTurn.playerTwo = false;
    }

    return {
        playerMove
    }
})();


// AI

