const gameBoardModule = (function () {
  //define game board array
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  console.log(gameBoard);
  //get current board state
  const currentBoardState = [];
  function updateCurrentBoardState() {
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i] === "") {
        currentBoardState.splice(i, 1, i);
      } else {
        currentBoardState.splice(i, 1, gameBoard[i]);
      }
    }
  }
})();
