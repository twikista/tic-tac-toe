const gamePlayModule = (function () {
  //cache HTML elements
  const boardCells = document.querySelector(".game-board");
  const endOfGameModal = document.querySelector(".end-of-game-modal");
  const appBody = document.querySelector(".app-body");
  //define users
  const aiPlayer = "o";
  const humanPlayer = "x";
  //set current player
  currentPlayer = "x";
  //switch between players after each board move
  function switchCurrentPlayer() {
    if (
      gameBoardModule.gameBoardWinStates() ||
      gameBoardModule.boardIsFilled()
    ) {
      return;
    }
    currentPlayer = currentPlayer === humanPlayer ? aiPlayer : humanPlayer;
    return currentPlayer;
  }
  //function that handles players move
  function playersMove(e, gameMode) {
    if (gameMode === "hard") {
      humanPlayerMove(e);
      setTimeout(aiPlayerMove, 1000);
    } else if (gameMode === "easy") {
      humanPlayerMove(e);
      setTimeout(beatableAiMove, 1000);
    } else {
      displayElement(appBody.firstElementChild.firstElementChild);
    }
  }

  //function that handles human player moves and save move to gameBoard
  function humanPlayerMove(e) {
    const target = e.target;
    const cellIndex = parseInt(target.dataset.cellindex);
    if (
      !target.classList.contains("game-board-cell") ||
      target.textContent !== ""
    ) {
      return;
    }
    displayGameBoard(target);
    gameBoardModule.gameBoard[cellIndex] = humanPlayer;
    gameBoardModule.updateCurrentBoardState();
    playerMoveOutcome();
    switchCurrentPlayer();
    displayPlayerTurn();
  }
  //function that handles AI player moves and save move to gameBoard
  function aiPlayerMove() {
    //save AI player best game move determined by minimax function to a variable
    const bestPlayMoveInfo = aiModule.miniMax(
      gameBoardModule.currentBoardState,
      aiPlayer
    );
    //grab the index of gameBoard cell for AI player
    const targetCellIndex = bestPlayMoveInfo.index;
    const aiTargetCells = [...boardCells.children];
    let aiTargetCell = aiTargetCells[targetCellIndex];
    if (
      gameBoardModule.boardIsFilled() ||
      gameBoardModule.gameBoardWinStates()
    ) {
      return;
    }
    //display AI player move
    aiTargetCell.textContent = aiPlayer;
    //add AI player move to gameBoard
    gameBoardModule.gameBoard[targetCellIndex] = aiPlayer;
    //update current board state to reflect AI player move
    gameBoardModule.updateCurrentBoardState();
    playerMoveOutcome();
    switchCurrentPlayer();
    displayPlayerTurn();
  }

  /************hhhhhhhhhh */
  function beatableAiMove() {
    //save AI player best game move determined by minimax function to a variable
    const emptyBoardCells = gameBoardModule.getEmptyIndex(
      gameBoardModule.currentBoardState
    );
    const selectedPlayCell = beatableAiModule.aiMove(emptyBoardCells);
    //grab the index of gameBoard cell for AI player
    const aiTargetCells = [...boardCells.children];
    let aiTargetCell = aiTargetCells[selectedPlayCell];
    if (
      gameBoardModule.boardIsFilled() ||
      gameBoardModule.gameBoardWinStates()
    ) {
      return;
    }
    //display AI player move
    aiTargetCell.textContent = aiPlayer;
    //add AI player move to gameBoard
    gameBoardModule.gameBoard[selectedPlayCell] = aiPlayer;
    //update current board state to reflect AI player move
    gameBoardModule.updateCurrentBoardState();
    playerMoveOutcome();
    switchCurrentPlayer();
    displayPlayerTurn();
  }

  /*********hhhhhh */
  //convert winning player symbol to winning player name
  function gameWinner(currentPlayer) {
    let winner = null;
    if (currentPlayer === "x") {
      winner = "human-Player";
    } else {
      winner = "ai-Player";
    }
    return winner;
  }
  //determine if player move result in a terminal state (win or draw)
  function playerMoveOutcome() {
    const boardWinState = gameBoardModule.gameBoardWinStates();
    if (boardWinState) {
      endOfGameModal.firstElementChild.textContent = `${gameWinner(
        currentPlayer
      )} Wins`;
      displayElement(endOfGameModal);
    } else if (gameBoardModule.boardIsFilled() && !boardWinState) {
      endOfGameModal.firstElementChild.textContent = `Tie Game!`;
      displayElement(endOfGameModal);
    }
  }
  //reset game on button click
  function gameReset(e) {
    const target = e.target;
    if (target.classList.contains("reset-game-btn")) {
      gameBoardModule.resetBoard();
      resetGameDisplay();
      currentPlayer = humanPlayer;
      displayPlayerTurn();
    }
  }

  //statrt new game after a game ends
  function newGame(e) {
    const target = e.target;
    if (target.classList.contains("play-again-btn")) {
      hideElement(endOfGameModal);
      gameBoardModule.resetBoard();
      resetGameDisplay();
      if (currentPlayer === humanPlayer) {
        return;
      } else {
        currentPlayer = humanPlayer;
        displayPlayerTurn();
      }
    }
  }

  function displayGameBoard(target) {
    if (target.textContent !== "") {
      return;
    }
    target.textContent = humanPlayer;
  }
  function displayPlayerTurn() {
    const playerTurn = appBody.firstElementChild.nextElementSibling;
    playerTurn.textContent = `player's turn to play: ${currentPlayer}`;
  }

  function resetGameDisplay() {
    const displayCells = [...boardCells.children];
    let i = 0;
    while (i < displayCells.length) {
      displayCells[i].textContent = "";
      i++;
    }
  }

  function displayElement(ele) {
    ele.classList.add("active");
  }

  function hideElement(ele) {
    ele.classList.remove("active");
  }
  //choose game mode;
  let activeGameMode = null;
  function setGameMode() {
    const gameModeElement = document.querySelector("#game-mode");
    gameModeElement.addEventListener("change", () => {
      activeGameMode =
        gameModeElement.options[gameModeElement.selectedIndex].value;
      //validate game mode selection
      hideElement(appBody.firstElementChild.firstElementChild);
      //reset game on change of game mode
      gameBoardModule.resetBoard();
      resetGameDisplay();
      currentPlayer = humanPlayer;
    });
    return activeGameMode;
  }
  setGameMode();

  boardCells.addEventListener("click", (e) => {
    playersMove(e, setGameMode());
  });
  appBody.addEventListener("click", gameReset);
  appBody.addEventListener("click", newGame);
  this.addEventListener("DOMContentLoaded", displayPlayerTurn);
  return { currentPlayer };
})();
