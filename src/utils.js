
export function range(start, end) {
  const low = end ? start : 0;
  const high = end ? end : start;

  const arr = Array(high - low);
  for (let i = 0; i < high - low; i++) {
    arr[i] = low + i;
  }
  return arr;
}

export function copyBoard(board) {
  return board.map(row => [...row]);
} 

export function updateBoard(board, piece, newX, newY) {
    const boardCopy = copyBoard(board);
    const pieceCopy = { ...piece, x: newX, y: newY };
    boardCopy[newX][newY] = pieceCopy
    boardCopy[piece.x][piece.y] = {};

    return { boardCopy, pieceCopy };
}