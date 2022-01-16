import { inBounds, isEmptyOrCapturable } from "./core";

export function getValidKnightMoves(board, knight, x, y) {
  const direction = knight.player;

  const upLeftLong = {x: x + direction + direction, y: y - 1};
  const upLeftShort = {x: x + direction, y: y - 2};
  const upRightLong = {x: x + direction + direction, y: y + 1};
  const upRightShort = {x: x + direction, y: y + 2};
  const downLeftLong = {x: x - direction - direction, y: y - 1};
  const downLeftShort = {x: x - direction, y: y - 2};
  const downRightLong = {x: x - direction - direction, y: y + 1};
  const downRightShort = {x: x - direction, y: y + 2};

  const moves = [upLeftLong,
                 upLeftShort,
                 upRightLong,
                 upRightShort,
                 downLeftLong,
                 downLeftShort,
                 downRightLong,
                 downRightShort].filter(
    move => inBounds(move.x, move.y) && isEmptyOrCapturable(board, knight, move.x, move.y));
  return moves;
}
