const gameBoardModule = (function () {
  //define game board array
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  //get current state of gameBoard
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
  //get all empty cells on gameboard
  const emptyBoardCellIndex = [];
  function getEmptyIndex(bla) {
    emptyBoardCellIndex.splice(0, emptyBoardCellIndex.length);
    for (let i = 0; i < bla.length; i++) {
      if (bla[i] !== "x" && bla[i] !== "o") {
        emptyBoardCellIndex.splice(i, 0, i);
      }
    }
    return emptyBoardCellIndex;
  }
  //check if all cells on gameBoard is filled
  function boardIsFilled() {
    let count = null;
    for (i = 0; i < 9; i++) {
      if (gameBoard[i] !== "") {
        count++;
      }
    }
    return count === 9;
  }
  //determine if a win state exist on gameBoard
  function gameBoardWinStates() {
    if (
      (gameBoard[0] !== "" &&
        gameBoard[0] === gameBoard[1] &&
        gameBoard[1] === gameBoard[2]) ||
      (gameBoard[3] !== "" &&
        gameBoard[3] === gameBoard[4] &&
        gameBoard[4] === gameBoard[5]) ||
      (gameBoard[6] !== "" &&
        gameBoard[6] === gameBoard[7] &&
        gameBoard[7] === gameBoard[8]) ||
      (gameBoard[0] !== "" &&
        gameBoard[0] === gameBoard[3] &&
        gameBoard[3] === gameBoard[6]) ||
      (gameBoard[1] !== "" &&
        gameBoard[1] === gameBoard[4] &&
        gameBoard[4] === gameBoard[7]) ||
      (gameBoard[2] !== "" &&
        gameBoard[2] === gameBoard[5] &&
        gameBoard[5] === gameBoard[8]) ||
      (gameBoard[0] !== "" &&
        gameBoard[0] === gameBoard[4] &&
        gameBoard[4] === gameBoard[8]) ||
      (gameBoard[2] !== "" &&
        gameBoard[2] === gameBoard[4] &&
        gameBoard[4] === gameBoard[6])
    ) {
      return true;
    } else {
      return false;
    }
  }

  //finctionality to reset gameboard
  function resetBoard() {
    for (let i = 0; i < gameBoard.length; i++) {
      console.log(gameBoard.length);
      gameBoard[i] = "";
    }
  }
  //return
  return {
    gameBoard,
    boardIsFilled,
    gameBoardWinStates,
    currentBoardState,
    resetBoard,
    updateCurrentBoardState,
  };
})();
