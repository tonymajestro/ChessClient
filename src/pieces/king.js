import { inBounds, isEmptyOrCapturable } from "./core";

export function getValidKingMoves(board, king, x, y) {
  const upRight = {x: x + 1, y: y + 1};
  const right = {x: x, y: y + 1};
  const downRight = {x: x - 1, y: y + 1};
  const down = {x: x - 1, y: y};
  const downLeft = {x: x - 1, y: y - 1};
  const left = {x: x, y: y - 1};
  const upLeft = {x: x + 1, y: y - 1};
  const up = {x: x + 1, y: y};

  return [upRight, right, downRight, down, downLeft, left, upLeft, up]
    .filter(move => inBounds(move.x, move.y) && isEmptyOrCapturable(board, king, move.x, move.y));
}