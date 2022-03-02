// player factory

const player = (mark) => {
    return mark;
}

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

    // listens for clicks on each cell
    const playerMoveListener = (() => {
        document.body.addEventListener('click', function(event){
            if(event.target.classList.contains('cell')) {
                cell = event.target;
                Controller.playerMove(cell);
            };
          });
    })();
      
    const playerMove = (cell) => {

        if (currentMove(cell).valid == true){

            // player one
            if (currentTurn.playerOne == true) {
                cell.textContent = "X";
                gameboard.splice(cell.id, 1, 'X')
                currentTurn.playerOne = false;
                currentTurn.playerTwo = true;
                checkForWin()
            }

            // player two
            else if (currentTurn.playerTwo == true) {
                cell.textContent = "O";
                gameboard.splice(cell.id, 1, 'O');
                currentTurn.playerTwo = false;
                currentTurn.playerOne = true;
                currentMove.valid = false;
                checkForWin()
            }
        }
        else return;
    }

    const displayNotification = () => {

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

    const possibleOutcomes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

    const checkForWin = () => {   
        for (outcome of possibleOutcomes){
            x = gameboard[outcome[0]];
            y = gameboard[outcome[1]];
            z = gameboard[outcome[2]];
            if (x == 'X' && y == 'X' && z == 'X'){
                colour = 'playerOneColour'
                highlightWinningCombination(outcome, colour)
                updateScoreboard('X');
                gameEnd()
            }
            if (x == 'O' && y == 'O' && z == 'O'){
                colour = 'playerTwoColour'
                highlightWinningCombination(outcome, colour)
                updateScoreboard('O');
                gameEnd()
            }
        }
    }

    const highlightWinningCombination = (outcome) => {
        document.getElementById(outcome[0]).classList.toggle(colour)
        document.getElementById(outcome[1]).classList.toggle(colour)
        document.getElementById(outcome[2]).classList.toggle(colour)
    }

    const gameStart = () => {
        currentTurn.playerOne = true;
        // prompt for name
        // prompt for vs player or PC
        // after prompts, set current turn to player 1
    }

    const gameRestart = () => {
        gameboard = [null, null, null, null, null, null, null, null, null];
        cells = document.querySelectorAll('.cell')
        cells.forEach (cell => {
            cell.innerText = '';
            cell.classList.remove('playerOneColour', 'playerTwoColour')
        });
        gameStart();
    }

    const gameEnd = () => {
        currentTurn.playerOne = false;
        currentTurn.playerTwo = false;
    }

    const updateScoreboard = (outcome) => {
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
    }

    return {
        playerMove
    }
})();


// AI

