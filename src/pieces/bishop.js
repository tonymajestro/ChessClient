import { inBounds, isCapturable, isEmpty } from "./core";

export function getValidBishopMoves(board, bishop, x, y) {
  const moves = [];

  tryBishopMoves(board, bishop, moves, x, y, 1, 1);
  tryBishopMoves(board, bishop, moves, x, y, -1, 1);
  tryBishopMoves(board, bishop, moves, x, y, 1, -1);
  tryBishopMoves(board, bishop, moves, x, y, -1, -1);

  return moves;
}

function tryBishopMoves(board, bishop, moves, x, y, xDiff, yDiff) {
  for (let i = 1; i < 8; i++) {
    const newX = x + (i * xDiff);
    const newY = y + (i * yDiff);
    if (!inBounds(newX, newY)) {
      // Not in bounds
      break;
    } else if (isEmpty(board, bishop, newX, newY)) {
      // Empty space, can move here
      moves.push({x: newX, y: newY});
    } else if (isCapturable(board, bishop, newX, newY)) {
      // Can capture this piece, cannot move further in this direction
      moves.push({x: newX, y: newY});
      break;
    } else {
      // Ran into own piece, cannot move here or move further in this direction
      break;
    }
  }
}