const player = (mark) => {

    return {
        mark,
        playerMoveListener
    }
}

const Controller = (() => {

    // listen for clicks on menu
    const menuListener = (() => {
        document.body.addEventListener('click', function(event){
            if(event.target.classList.contains('restart')) {
                gameRestart()
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
    
    // handle moves for each player
    const playerMove = (cell) => {
        if (currentMove(cell).valid == true){
            // player one
            if (currentTurn.playerOne == true) {
                cell.textContent = "X";
                gameboard.splice(cell.id, 1, 'X')
                currentTurn.playerOne = false;
                currentTurn.playerTwo = true;
                checkForOutcome()
            }

            // player two
            else if (currentTurn.playerTwo == true) {
                cell.textContent = "O";
                gameboard.splice(cell.id, 1, 'O');
                currentTurn.playerTwo = false;
                currentTurn.playerOne = true;
                currentMove.valid = false;
                checkForOutcome()
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

    // all possible outcomes hardcoded- there's a more elegant solution with loops that can scale relative to grid size but I am not smart enough for that yet 
    const possibleOutcomes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

    const checkForOutcome = () => {   
        for (outcome of possibleOutcomes){
            x = gameboard[outcome[0]];
            y = gameboard[outcome[1]];
            z = gameboard[outcome[2]];
            // handle player one win
            if (x == 'X' && y == 'X' && z == 'X'){
                colour = 'playerOneColour'
                highlightWinningCombination(outcome, colour)
                updateScoreboard('X');
                gameEnd()
            }
            // handle player two win
            if (x == 'O' && y == 'O' && z == 'O'){
                colour = 'playerTwoColour'
                highlightWinningCombination(outcome, colour)
                updateScoreboard('O');
                gameEnd()
            }
        }

        // handle draws
        if (gameboard[0] && gameboard[1] && gameboard[2] && gameboard[3] && gameboard[4] && gameboard[5] && gameboard[6] && gameboard[7] && gameboard[8] !== null){
            gameEnd()
            updateScoreboard('D')
        }
    }

    // highlighting for winning combination
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

    // visually clean up and call gameStart() to start over
    const gameRestart = () => {
        cells = document.querySelectorAll('.cell')
        cells.forEach (cell => {
            cell.innerText = '';
            cell.classList.remove('playerOneColour', 'playerTwoColour')
        });
        gameStart();
    }

    // clear data once game ends
    const gameEnd = () => {
        gameboard = [null, null, null, null, null, null, null, null, null];
        currentTurn.playerOne = false;
        currentTurn.playerTwo = false;
    }

    // update scoreboard with outcomes
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

