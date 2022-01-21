import { getBishopMoves } from "./bishop";
import { getKnightMoves } from "./knight";
import { getPawnMoves } from "./pawn";
import { getRookMoves } from "./rook";
import { getQueenMoves } from "./queen";
import { getKing, getKingMoves } from "./king";
import { updateBoard } from "../utils";

import { WHITE, BLACK, PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING } from "../constants";

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
  let choices = getMoves(board, selection);
  return choices.moves.filter(move => !isKingInCheckWithMove(board, selection, move.x, move.y));
}

export function getMoves(board, selection) {
  if (selection.piece === PAWN) {
    return getPawnMoves(board, selection);
  } else if (selection.piece === KNIGHT) {
    return getKnightMoves(board, selection);
  } else if (selection.piece === BISHOP) {
    return getBishopMoves(board, selection);
  } else if (selection.piece === ROOK) {
    return getRookMoves(board, selection);
  } else if (selection.piece === QUEEN) {
    return getQueenMoves(board, selection);
  } else if (selection.piece === KING) {
    return getKingMoves(board, selection);
  } else {
    throw new Error("Unrecognized piece " + selection.piece);
  }
}

function getCaptures(board, selection) {
  return getMoves(board, selection).captures;
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