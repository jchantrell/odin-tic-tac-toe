const player = (name, mark) => {

    const playing = false;  

    return {
        name,
        mark
    }
}

const Controller = (() => {

    const home = document.querySelector('.home');
    const options = document.querySelector('.options');
    const game = document.querySelector('.game');
    const form = document.getElementById('playerForm'); 
    const formDescription = document.querySelector('.playerOrComputer')
    const normalBot = document.querySelector('.normalDifficulty');
    const impossibleBot = document.querySelector('.impossibleDifficulty');
    const secondPlayerNameInput = document.querySelector('.playerTwoNameInput');
    const secondPlayerDescription = document.querySelector('.enterSecondPlayerName');
    const secondPlayerButton = document.querySelector('.twoPlayerButton');
    let playerOneName = document.querySelector('.playerOneName');
    let playerTwoName = document.querySelector('.playerTwoName');
    let playerOne = null;
    let playerTwo = null;

    // listener for form
    window.addEventListener("load", function() {
    document.getElementById('playerForm').addEventListener("submit", function(e) {
        e.preventDefault();

        if (form.playerOneNameInput.value == ""){
            validateForm();
            return
        }

        if (vsBot == false && form.playerTwoNameInput.value == ""){
            validateForm();
            return
        }

        let playerOneNameForm = form.playerOneNameInput.value
        createPlayerOne(playerOneNameForm)

        let playerTwoNameForm = form.playerTwoNameInput.value
        createPlayerTwo(playerTwoNameForm)

        let difficulty = document.activeElement.getAttribute('value')

        if (difficulty != null){
            createBot(difficulty);
            playGameVsBot(difficulty);
        }
        else if (difficulty == null){
            normalBotLoaded = false;
            insaneBotLoaded = false;
            vsBot = false;
            playGameVsPlayer();
        }
    })
    });

    const validateForm = () => {
        if (form.playerOneNameInput.value == "") {
            playerOneInput = document.querySelector('.playerOneNameInput');
            playerOneInput.classList.add('shake');
            playerOneInput.addEventListener('animationend', function (){
                playerOneInput.classList.remove('shake');
            }, {once: true})
        }
    }


    const playerMoveListener = (() => {
        document.body.addEventListener('click', function(event){
            if(event.target.classList.contains('cell')) {
                if (vsBot == true && currentTurn.playerOne == true){
                    cell = event.target;
                    Controller.playerMove(cell);
                }
                else if (vsBot == false){
                    cell = event.target;
                    Controller.playerMove(cell);
                }
            };
          });
    })();

    // listen for clicks on certain amounts
    const clickListener = (() => {
        document.body.addEventListener('click', function(event){
            if(event.target.classList.contains('restart')) {
                gameRestart()
            };
            if(event.target.classList.contains('home')) {
                goHome();
            };
            if(event.target.classList.contains('goHome')) {
                goHome();
            };
            if(event.target.classList.contains('onePlayer')) {
                onePlayerOptions();
            };
            if(event.target.classList.contains('twoPlayer')) {
                twoPlayerOptions();
            };
          });
    })();

    // handle menu functions
    const goHome = () => {
        game.classList.add('hidden');
        game.classList.remove('shown');
        options.classList.add('hidden');
        options.classList.remove('shown');
        home.classList.add('shown');
        home.classList.remove('hidden');
        gameRestart();
        gameEnd();
        clearData();
    }

    const goOptions = (numOfPlayers) => {
        game.classList.add('hidden');
        game.classList.remove('shown');
        options.classList.add('shown');
        options.classList.remove('hidden');
        home.classList.add('hidden');
        home.classList.remove('shown');
        gameRestart();
        gameEnd();

        if (numOfPlayers == "one"){
            vsBot = true;
            impossibleBot.classList.add('shown');
            impossibleBot.classList.remove('hidden');
            normalBot.classList.add('shown');
            normalBot.classList.remove('hidden');
            secondPlayerNameInput.classList.add('hidden');
            secondPlayerNameInput.classList.remove('shown');
            secondPlayerDescription.classList.add('hidden');
            secondPlayerDescription.classList.remove('shown');
            secondPlayerButton.classList.add('hidden');
            secondPlayerButton.classList.remove('shown');
            formDescription.textContent = 'Choose difficulty..';

        }
        else if (numOfPlayers == "two"){
            vsBot = false;
            impossibleBot.classList.add('hidden');
            impossibleBot.classList.remove('shown');
            normalBot.classList.add('hidden');
            normalBot.classList.remove('shown');
            secondPlayerNameInput.classList.add('shown');
            secondPlayerNameInput.classList.remove('hidden');
            secondPlayerDescription.classList.add('shown');
            secondPlayerDescription.classList.remove('hidden');
            secondPlayerButton.classList.add('shown');
            secondPlayerButton.classList.remove('hidden');
            formDescription.textContent = '';
        }
    }

    const goGame = () => {
        game.classList.add('shown');
        game.classList.remove('hidden');
        options.classList.add('hidden');
        options.classList.remove('shown');
        home.classList.add('hidden');
        home.classList.remove('shown');
    }

    const onePlayerOptions = () => {
        goOptions("one")
    }

    const twoPlayerOptions = () => {
        goOptions("two")
    }

    const createPlayerOne = (playerOneNameForm) => {
        playerOneName.innerText = playerOneNameForm;
        playerOne = player(playerOneNameForm, 'X');
    }

    const createPlayerTwo = (playerTwoNameForm) => {
        playerTwoName.innerText = playerTwoNameForm;
        playerTwo = player(playerTwoNameForm, 'O');
    }

    const playGameVsPlayer = () => {
        goGame();
        gameStart();
    }

    // utility function that helps simulate human reaction time
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const playGameVsBot = (difficulty) => {
        if (difficulty == 'normal'){
            document.querySelector('.playerTwoName').innerText = playerTwo.name;
            normalBotLoaded = true;
            insaneBotLoaded = false;
            vsBot = true;
            gameStart();;
        }
        
        else if (difficulty == 'impossible'){
            document.querySelector('.playerTwoName').innerText = playerTwo.name;
            insaneBotLoaded = true;
            normalBotLoaded = false;
            vsBot = true;
            gameStart();
        }
        goGame();
    }

    const createBot = (difficulty) => {
        if (difficulty == 'normal'){
            playerTwo = player("Normal bot", 'O');
        }
        else if (difficulty == 'impossible'){
            playerTwo = player("Impossible bot", 'O');
        }
    }

    let normalBotLoaded = false;
    let insaneBotLoaded = false;
    let vsBot = false;

    const normalBotPlay = async () => {
        if (currentTurn.playerTwo == true){
            let pickCell = Math.floor(Math.random() * 9)
            if (gameboard[pickCell] != null) {
                normalBotPlay();
            }
            else if (gameboard[pickCell] == null){
                await delay(1000);
                document.getElementById(pickCell).textContent = '0'
                gameboard.splice(pickCell, 1, 'O');
                currentTurn.playerTwo = false;
                currentTurn.playerOne = true;
                checkForOutcome();
                highlightPlayerOne();
            }
    }} 

    const insaneBotPlay = () => {
        if (currentTurn.playerTwo == true){
            let pickCell = Math.floor(Math.random() * 9)
    }}

    const invokeBot = () => {
        if (currentTurn.playerTwo == true && normalBotLoaded == true){
            normalBotPlay();
        }
        else if (currentTurn.playerTwo == true && insaneBotLoaded == true){
            insaneBotPlay();
        }
    }

    // create array of 9 empty elements to represent gameboard
    let gameboard = [null, null, null, null, null, null, null, null, null];

    // on page load, start the game
    const pageLoaded = (() => {
        document.addEventListener('DOMContentLoaded', function() {
            gameStart()
          }, false);
    })();
    
    // handle moves for each player
    const playerMove = (cell, mark) => {
        if (currentMove(cell).valid == true){
            // player one
            if (currentTurn.playerOne == true) {
                cell.textContent = "X";
                gameboard.splice(cell.id, 1, 'X')
                highlightPlayerTwo();
                currentTurn.playerOne = false;
                currentTurn.playerTwo = true;
                checkForOutcome();
                invokeBot();
            }

            // player two
            else if (currentTurn.playerTwo == true) {
                cell.textContent = "O";
                gameboard.splice(cell.id, 1, 'O');
                highlightPlayerOne();
                currentTurn.playerTwo = false;
                currentTurn.playerOne = true;
                currentMove.valid = false;
                checkForOutcome();
            }
        }
        else return;
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

    // all possible outcomes hardcoded - there's a more elegant solution with loops that can scale relative to grid size but I am not smart enough for that yet 
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
            else if (x == 'O' && y == 'O' && z == 'O'){
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
        highlightPlayerOne();
    }

    // visually clean up and call gameStart() to start over
    const gameRestart = () => {
        cells = document.querySelectorAll('.cell')
        cells.forEach (cell => {
            cell.innerText = '';
            cell.classList.remove('playerOneColour', 'playerTwoColour')
        });
        gameboard.fill(null, 0, 9);
        gameStart();
    }

    // restrict turns, clear internal data once game ends
    const gameEnd = () => {
        currentTurn.playerOne = false;
        currentTurn.playerTwo = false;
        gameboard.fill(null, 0, 9)
        clearHighlights();
    }

    const clearData = () => {
        playerOneScoreData = 0;
        document.querySelector('.playerOneScore').innerText = "0";
        playerTwoScoreData = 0;
        document.querySelector('.playerTwoScore').innerText = "0";
        tiesScoreData = 0;
        document.querySelector('.tiesScore').innerText = "0";
    }

    const clearHighlights = () => {
        document.querySelector('.playerOne').classList.remove('currentTurn');
        document.querySelector('.playerTwo').classList.remove('currentTurn');
    }

    const highlightPlayerOne = () => {
        document.querySelector('.playerOne').classList.add('currentTurn');
        document.querySelector('.playerTwo').classList.remove('currentTurn');
    }

    const highlightPlayerTwo = () => {
        document.querySelector('.playerOne').classList.remove('currentTurn');
        document.querySelector('.playerTwo').classList.add('currentTurn');
    }

    let playerOneScoreData = 0;
    let playerTwoScoreData = 0;
    let tiesScoreData = 0;

    // update scoreboard with outcomes
    const updateScoreboard = (outcome) => {

        playerOne = document.querySelector('.playerOneScore');
        playerTwo = document.querySelector('.playerTwoScore');
        ties = document.querySelector('.tiesScore');

        if (outcome == 'X') {
            playerOneScoreData ++;
            playerOne.innerText = playerOneScoreData;
            playerOne.classList.add('pop');
            playerOne.addEventListener('animationend', function (){
                playerOne.classList.remove('pop');
            }, {once: true})
        }

        else if (outcome == 'O') {
            playerTwoScoreData ++;
            playerTwo.innerText = playerTwoScoreData;
            playerTwo.classList.add('pop');
            playerTwo.addEventListener('animationend', function (){
                playerTwo.classList.remove('pop');
            }, {once: true})
        }
        else if (outcome == 'D') {
            tiesScoreData ++;
            ties.innerText = tiesScoreData;
            ties.classList.add('pop');
            ties.addEventListener('animationend', function (){
                ties.classList.remove('pop');
            }, {once: true})
        }
    }
    return {
        playerMove,
        currentTurn,
        clearHighlights
    }
})();

// AI

 