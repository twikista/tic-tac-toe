const gamePlayModule = (function () {
  //cache HTML elements
  const boardCells = document.querySelector(".game-board");
  const endOfGameModal = document.querySelector(".end-of-game-modal");
  const appBody = document.querySelector(".app-body");

  const gameBoard = {
    //define game board array
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    //check if game baord is filled up with palyer symbols
    boardIsFilled() {
      let count = null;
      for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
          if (gameBoard.board[i][j] !== "") {
            count++;
          }
        }
      }
      return count === 9;
    },

    //
    boardState() {
      let boardState = null;
      if (this.boardIsFilled()) {
        boardState = "draw";
      }
      for (i = 0; i < 3; i++) {
        if (
          this.board[i][0] !== "" &&
          this.board[i][0] === this.board[i][1] &&
          this.board[i][0] === this.board[i][2]
        ) {
          boardState = "win";
        }
      }

      for (j = 0; j < 3; j++) {
        if (
          this.board[0][j] !== "" &&
          this.board[0][j] === this.board[1][j] &&
          this.board[0][j] === this.board[2][j]
        ) {
          boardState = "win";
        }
      }

      for (i = 0; i < 3; i++) {
        if (
          (this.board[0][0] !== "" &&
            this.board[0][0] === this.board[1][1] &&
            this.board[0][0] === this.board[2][2]) ||
          (this.board[0][2] !== "" &&
            this.board[0][2] === this.board[1][1] &&
            this.board[0][2] === this.board[2][0])
        ) {
          boardState = "win";
        }
      }

      return boardState;
    },
    resetBoard() {
      for (let i = 0; i < gameBoard.board.length; i++) {
        for (let j = 0; j < gameBoard.board.length; j++) {
          gameBoard.board[i][j] = "";
        }
      }
    },
  };

  const symbols = {
    playerOneSymbol: "X",
    playerTwoSymbol: "O",
  };

  const players = {
    currentPlayer: symbols.playerOneSymbol,

    switchCurrentPlayer() {
      this.currentPlayer =
        this.currentPlayer === symbols.playerOneSymbol
          ? symbols.playerTwoSymbol
          : symbols.playerOneSymbol;
      return this.currentPlayer;
    },
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
