import { getValidBishopMoves } from "./bishop";
import { getValidKnightMoves } from "./knight";
import { getValidPawnMoves } from "./pawn";
import { getValidRookMoves } from "./rook";
import { getValidQueenMoves } from "./queen";
import { getValidKingMoves } from "./king";
import { updateBoard } from "../utils";

export const WHITE = -1;
export const BLACK = 1;

export const PAWN = 'pawn';
export const KNIGHT = 'knight';
export const BISHOP = 'bishop';
export const ROOK = 'rook';
export const QUEEN = 'queen';
export const KING = 'king';

export function inBounds(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

export function isEmptyOrCapturable(board, selection, x, y) {
  // Can move to this square if it is empty or if it is occupied by an enemy piece.
  // Cannot move to a square occupied by one of your own pieces
  return isEmpty(board, x, y) ||
         isCapturable(board, selection, x, y);
}

export function isEmpty(board, x, y) {
  return !board[x][y].piece;
}

export function isCapturable(board, selection, x, y) {
  return board[x][y].piece &&
         board[x][y].player !== selection.player;
}

export function tryMovePiece(board, selection, newX, newY) {
  return getValidMoves(board, selection)
    .some(move => move.x === newX && move.y === newY);
}

export function getValidMoves(board, selection) {
  let choices = {};

  if (selection.piece === PAWN) {
    choices = getValidPawnMoves(board, selection);
  } else if (selection.piece === KNIGHT) {
    choices = getValidKnightMoves(board, selection);
  } else if (selection.piece === BISHOP) {
    choices = getValidBishopMoves(board, selection);
  } else if (selection.piece === ROOK) {
    choices = getValidRookMoves(board, selection);
  } else if (selection.piece === QUEEN) {
    choices = getValidQueenMoves(board, selection);
  } else if (selection.piece === KING) {
    choices = getValidKingMoves(board, selection);
  } else {
    throw new Error("Unrecognized piece " + selection.piece);
  }

  return choices.moves.filter(move => !isKingInCheckWithMove(board, selection, move.x, move.y));
}

export function getKing(board, player) {
  return board
      .flatMap(x => x)
      .filter(square => square.piece && square.player === player && square.piece === KING)
      [0];
}

export function isKingInCheck(board, selection) {
  return isKingInCheckHelper(board, selection);
}

function isKingInCheckWithMove(board, selection, newX, newY) {
  const { boardCopy, pieceCopy } = updateBoard(board, selection, newX, newY);
  return isKingInCheckHelper(boardCopy, pieceCopy);
}

function isKingInCheckHelper(board, selection) {
  const kingPosition = getKing(board, selection.player);

  const enemy = selection.player === WHITE ? BLACK : WHITE;
  const enemyPieces = board
      .flatMap(x => x)
      .filter(square => square.piece && square.player === enemy);

  // King is in check if any of the enemy pieces can capture the king
  return enemyPieces.some(enemyPiece => {
    const captures = getCaptures(board, enemyPiece);
    return captures.some(capture => capture.x === kingPosition.x && capture.y === kingPosition.y)
  });
}

function getCaptures(board, selection) {
  if (selection.piece === PAWN) {
    return getValidPawnMoves(board, selection).captures;
  } else if (selection.piece === KNIGHT) {
    return getValidKnightMoves(board, selection).captures;
  } else if (selection.piece === BISHOP) {
    return getValidBishopMoves(board, selection).captures;
  } else if (selection.piece === ROOK) {
    return getValidRookMoves(board, selection).captures;
  } else if (selection.piece === QUEEN) {
    return getValidQueenMoves(board, selection).captures;
  } else if (selection.piece === KING) {
    return getValidKingMoves(board, selection).captures;
  } else {
    throw new Error("Unrecognized piece " + selection.piece);
  }
}


