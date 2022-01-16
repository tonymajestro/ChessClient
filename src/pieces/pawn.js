import { BLACK, WHITE, inBounds} from "./core";

export function getValidPawnMoves(board, pawn, x, y) {
  const moves = [];

  // Check if we can move two spaces on first move
  const direction = pawn.player;
  const doubleMove = {x: x + direction + direction, y: y};
  if ((pawn.player === BLACK && x == 1 || pawn.player === WHITE && x === 6) &&
      inBounds(doubleMove.x, doubleMove.y) && 
      !board[doubleMove.x][doubleMove.y].piece) {
    moves.push(doubleMove);
  }

  // Try to move one space forward
  const singleMove = {x: x + direction, y: y};
  if (inBounds(singleMove.x, singleMove.y) && 
      !board[singleMove.x][singleMove.y].piece) {
    moves.push(singleMove);
  }

  // Try to capture to capture diagonally left
  const captureLeft = {x: x + direction, y: y - 1};
  if (inBounds(captureLeft.x, captureLeft.y) && 
      board[captureLeft.x][captureLeft.y].piece &&
      board[captureLeft.x][captureLeft.y].player !== pawn.player) {
    moves.push(captureLeft);
  }

  // Try to capture to capture diagonally left
  const captureRight = {x: x + direction, y: y + 1};
  if (inBounds(captureRight.x, captureRight.y) && 
      board[captureRight.x][captureRight.y].piece &&
      board[captureRight.x][captureRight.y].player !== pawn.player) {
    moves.push(captureRight);
  }

  return moves;
}
