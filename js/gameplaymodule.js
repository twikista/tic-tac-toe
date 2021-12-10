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
    currentPlayer = currentPlayer === humanPlayer ? aiPlayer : humanPlayer;
    console.log(currentPlayer);
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
      return;
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
    // console.log(board);
    //save AI player best game move determined by minimax function to a variable
    const bestPlayMoveInfo = aiModule.miniMax(
      gameBoardModule.currentBoardState,
      aiPlayer
    );
    console.log(bestPlayMoveInfo);
    //grab the index of gameBoard cell for AI player
    const targetCellIndex = bestPlayMoveInfo.index;
    const aiTargetCells = [...boardCells.children];
    let aiTargetCell = aiTargetCells[targetCellIndex];
    console.log(aiTargetCell);
    if (gameBoardModule.boardIsFilled()) {
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
    // console.log(board);
    //save AI player best game move determined by minimax function to a variable
    const emptyBoardCells = gameBoardModule.getEmptyIndex(
      gameBoardModule.currentBoardState
    );
    const selectedPlayCell = beatableAiModule.aiMove(emptyBoardCells);
    console.log(selectedPlayCell);
    //grab the index of gameBoard cell for AI player
    const aiTargetCells = [...boardCells.children];
    let aiTargetCell = aiTargetCells[selectedPlayCell];
    console.log(aiTargetCell);
    if (gameBoardModule.boardIsFilled()) {
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
      displayGameModal();
    } else if (gameBoardModule.boardIsFilled() && !boardWinState) {
      endOfGameModal.firstElementChild.textContent = `Tie Game!`;
      displayGameModal();
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
      closeGameModal();
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
      console.log(target.textContent);
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

  function displayGameModal() {
    endOfGameModal.classList.add("active");
  }

  function closeGameModal() {
    endOfGameModal.classList.remove("active");
  }
  //choose game mode;
  let activeGameMode = null;
  function setGameMode() {
    const gameModeElement = document.querySelector("#game-mode");
    gameModeElement.addEventListener("change", () => {
      activeGameMode =
        gameModeElement.options[gameModeElement.selectedIndex].value;
      console.log(activeGameMode);
      console.log(typeof activeGameMode);
    });
    return activeGameMode;
  }

  boardCells.addEventListener("click", (e) => {
    playersMove(e, setGameMode());
  });
  appBody.addEventListener("click", gameReset);
  appBody.addEventListener("click", newGame);
  this.addEventListener("DOMContentLoaded", displayPlayerTurn);
  // appBody.addEventListener("click", endGame);

  return { currentPlayer };
})();
