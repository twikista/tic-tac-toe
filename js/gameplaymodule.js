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




    playerMove(e) {
      const target = e.target;
      const rowIndex = parseInt(target.dataset.rowindex);
      const colIndex = parseInt(target.dataset.colindex);
      gameDisplay.displayGameBoard(target);
      gameBoard.board[rowIndex][colIndex] = this.currentPlayer;
      players.playerMoveOutcome();
      players.switchCurrentPlayer();
      gameDisplay.displayPlayerTurn();
    },
    playerMoveOutcome() {
      if (gameBoard.boardState() === "win") {
        console.log(`player ${players.currentPlayer} is the winner`);
        gameState.gameEnd();
        this.win();
      } else if (gameBoard.boardState() === "draw") {
        console.log("draw");
        gameState.gameEnd();
        this.tie();
      }
    },
    win() {
      endOfGameModal.firstElementChild.textContent = `player ${players.currentPlayer} is the winner`;
    },
    tie() {
      endOfGameModal.firstElementChild.textContent = `Tie Game!`;
    },
  };

  const gameModal = {
    openModal() {
      endOfGameModal.classList.add("active");
    },
    closeModal() {
      endOfGameModal.classList.remove("active");
    },
  };

  const gameState = {
    gameEnd() {
      gameModal.openModal();
    },
    gameReset(e) {
      const target = e.target;
      if (target.classList.contains("reset-game-btn")) {
        gameBoard.resetBoard();
        gameDisplay.resetGameDisplay();
        players.currentPlayer = symbols.playerOneSymbol;
        gameDisplay.displayPlayerTurn();
      }
      console.table(gameBoard.board);
    },
    newGame(e) {
      const target = e.target;
      if (target.classList.contains("play-again-btn")) {
        gameModal.closeModal();
        gameBoard.resetBoard();
        gameDisplay.resetGameDisplay();
        if (players.currentPlayer === symbols.playerOneSymbol) {
          return;
        } else {
          players.currentPlayer = symbols.playerOneSymbol;
          gameDisplay.displayPlayerTurn();
        }
      }
    },
  };

  const gameDisplay = {
    displayGameBoard(target) {
      if (target.textContent !== "") {
        return;
      }
      target.textContent = players.currentPlayer;
    },
    displayPlayerTurn() {
      const playerTurn = appBody.firstElementChild;
      playerTurn.textContent = `player's turn to play: ${players.currentPlayer}`;
    },

    resetGameDisplay() {
      const displayCells = [...boardCells.children];
      let i = 0;
      while (i < displayCells.length) {
        displayCells[i].textContent = "";
        i++;
      }
    },
    endGame(e) {
      const target = e.target;
      if (!target.classList.contains("end-game-btn")) {
        return;
      }
      const endGamepage = appBody.nextElementSibling;
      const targetPage = document.querySelector(target.dataset.displaypage);
      if (targetPage === endGamepage) {
        appBody.style.display = "none";
        endGamepage.style.display = "flex";
      }
      gameModal.closeModal();
    },
  };

  boardCells.addEventListener("click", players.playerMove.bind(players));
  appBody.addEventListener("click", gameState.gameReset.bind(gameState));
  appBody.addEventListener("click", gameState.newGame.bind(gameState));
  this.addEventListener("DOMContentLoaded", gameDisplay.displayPlayerTurn);
  appBody.addEventListener("click", gameDisplay.endGame);
})();
