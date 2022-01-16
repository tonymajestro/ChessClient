import { getValidKnightMoves } from "./knight";
import { getValidPawnMoves } from "./pawn";

export const WHITE = -1;
export const BLACK = 1;

export const PAWN = 1;
export const KNIGHT = 2;
export const BISHOP = 3;
export const ROOK = 4;
export const QUEEN = 5;
export const KING = 6;

export function inBounds(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

export function isEmptyOrCapturable(board, selection, x, y) {
  // Can move to this square if it is empty or if it is occupied by an enemy piece.
  // Cannot move to a square occupied by one of your own pieces
  return !board[x][y].piece ||
         board[x][y].player !== selection.player;
}

export function tryMovePiece(board, selection, x, y, newX, newY) {
  if (selection.piece === PAWN) {
    return getValidPawnMoves(board, selection, x, y).some(
      move => move.x === newX && move.y === newY);
  } else if (selection.piece === KNIGHT) {
    return getValidKnightMoves(board, selection, x, y).some(
      move => move.x === newX && move.y === newY);
  }
}

export function getValidMoves(board, selection, x, y) {
  if (selection.piece === PAWN) {
    return getValidPawnMoves(board, selection, x, y);
  } else if (selection.piece === KNIGHT) {
    return getValidKnightMoves(board, selection, x, y);
  }

  return false;
}