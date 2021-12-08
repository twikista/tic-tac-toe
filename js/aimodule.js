const aiModule = (function () {
  //define player mark
  const humanPlayer = "x";
  const aiPlayer = "o";
  //function that get the index of the empty cells from the currentboardstate array
  function getEmptyCellsIndex(currentBoardState) {
    return currentBoardState.filter((i) => i !== "x" && i !== "o");
  }
  //function that determines win state
  function checkForWin(currentBoardState, currentPlayerMark) {
    if (
      (currentBoardState[0] === currentPlayerMark &&
        currentBoardState[1] === currentPlayerMark &&
        currentBoardState[2] === currentPlayerMark) ||
      (currentBoardState[3] === currentPlayerMark &&
        currentBoardState[4] === currentPlayerMark &&
        currentBoardState[5] === currentPlayerMark) ||
      (currentBoardState[6] === currentPlayerMark &&
        currentBoardState[7] === currentPlayerMark &&
        currentBoardState[8] === currentPlayerMark) ||
      (currentBoardState[0] === currentPlayerMark &&
        currentBoardState[4] === currentPlayerMark &&
        currentBoardState[8] === currentPlayerMark) ||
      (currentBoardState[2] === currentPlayerMark &&
        currentBoardState[4] === currentPlayerMark &&
        currentBoardState[6] === currentPlayerMark) ||
      (currentBoardState[0] === currentPlayerMark &&
        currentBoardState[3] === currentPlayerMark &&
        currentBoardState[6] === currentPlayerMark) ||
      (currentBoardState[1] === currentPlayerMark &&
        currentBoardState[4] === currentPlayerMark &&
        currentBoardState[7] === currentPlayerMark) ||
      (currentBoardState[2] === currentPlayerMark &&
        currentBoardState[5] === currentPlayerMark &&
        currentBoardState[8] === currentPlayerMark)
    ) {
      return true;
    } else {
      return false;
    }
  }
  //define the miniMax function
  function miniMax(currentBoardState, currentPlayerMark) {
    const emptyCells = getEmptyCellsIndex(currentBoardState);
    //check for a terminal board state
    if (checkForWin(currentBoardState, humanPlayer)) {
      return { score: -1 };
    } else if (checkForWin(currentBoardState, aiPlayer)) {
      return { score: 1 };
    } else if (emptyCells.length === 0) {
      return { score: 0 };
    }
    //save all test play outcome for future refernce
    const allTestPlayResults = [];

    //loop that check for various possible outcomes based on player move
    for (let i = 0; i < emptyCells.length; i++) {
      const currentTestPlayResult = {};
      currentTestPlayResult.index = currentBoardState[emptyCells[i]];
      currentBoardState[emptyCells[i]] = currentPlayerMark;
      if (currentPlayerMark === aiPlayer) {
        //recursively call the minimax function
        const result = miniMax(currentBoardState, humanPlayer);
        currentTestPlayResult.score = result.score;
      } else {
        const result = miniMax(currentBoardState, aiPlayer);
        currentTestPlayResult.score = result.score;
      }
      currentBoardState[emptyCells[i]] = currentTestPlayResult.index;
      allTestPlayResults.push(currentTestPlayResult);
    }

    //variable to store reference the best test play result
    let bestTestPlayResult = null;

    //loop to loop through all test result to determine best test outcome
    if (currentPlayerMark === aiPlayer) {
      let bestScore = -Infinity;
      for (let i = 0; i < allTestPlayResults.length; i++) {
        if (allTestPlayResults[i].score > bestScore) {
          bestScore = allTestPlayResults[i].score;
          bestTestPlayResult = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < allTestPlayResults.length; i++) {
        if (allTestPlayResults[i].score < bestScore) {
          bestScore = allTestPlayResults[i].score;
          bestTestPlayResult = i;
        }
      }
    }

    return allTestPlayResults[bestTestPlayResult];
  }

  return { miniMax };
})();
