import { inBounds, isCapturable, isEmptyOrCapturable } from "./core";
import { KING } from '../constants';

export function getKingMoves(board, king) {
  const { x, y } = king;

  const upRight = {x: x + 1, y: y + 1};
  const right = {x: x, y: y + 1};
  const downRight = {x: x - 1, y: y + 1};
  const down = {x: x - 1, y: y};
  const downLeft = {x: x - 1, y: y - 1};
  const left = {x: x, y: y - 1};
  const upLeft = {x: x + 1, y: y - 1};
  const up = {x: x + 1, y: y};

  const allMoves = [upRight, right, downRight, down, downLeft, left, upLeft, up];

  const moves = allMoves.filter(
    move => inBounds(move.x, move.y) && isEmptyOrCapturable(board, king, move.x, move.y));

  const captures = allMoves.filter(
    move => inBounds(move.x, move.y) && isCapturable(board, king, move.x, move.y));

  return { moves, captures };
}

export function getKing(board, player) {
  return board
      .flatMap(x => x)
      .filter(square => square.piece && square.player === player && square.piece === KING)
      [0];
}