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
  function playersMove(e) {
    humanPlayerMove(e);
    setTimeout(() => {
      aiPlayerMove(gameBoardModule.currentBoardState);
    }, 1000);
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
  function aiPlayerMove(board) {
    //save AI player best game move determined by minimax function to a variable
    const bestPlayMoveInfo = aiModule.miniMax(
      gameBoardModule.currentBoardState,
      aiPlayer
    );
    //grab the index of gameBoard cell for AI player
    const targetCellIndex = bestPlayMoveInfo.index;
    const aiTargetCells = [...boardCells.children];
    let aiTargetCell = aiTargetCells[targetCellIndex];
    if (aiTargetCell.textContent !== "") {
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

  boardCells.addEventListener("click", playersMove);
  appBody.addEventListener("click", gameReset);
  appBody.addEventListener("click", newGame);
  this.addEventListener("DOMContentLoaded", displayPlayerTurn);
  // appBody.addEventListener("click", endGame);

  return { currentPlayer };
})();
