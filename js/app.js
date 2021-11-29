const ticTacToeGame = (function () {
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
  };
})();
