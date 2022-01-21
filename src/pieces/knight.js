import { inBounds, isCapturable, isEmptyOrCapturable } from "./core";

export function getKnightMoves(board, knight) {
  const { x, y, player } = knight;
  const direction = player;

  const upLeftLong = {x: x + direction + direction, y: y - 1};
  const upLeftShort = {x: x + direction, y: y - 2};
  const upRightLong = {x: x + direction + direction, y: y + 1};
  const upRightShort = {x: x + direction, y: y + 2};
  const downLeftLong = {x: x - direction - direction, y: y - 1};
  const downLeftShort = {x: x - direction, y: y - 2};
  const downRightLong = {x: x - direction - direction, y: y + 1};
  const downRightShort = {x: x - direction, y: y + 2};

  const allMoves = [upLeftLong, upLeftShort, upRightLong, upRightShort, 
                    downLeftLong, downLeftShort, downRightLong, downRightShort];

  const moves = allMoves.filter(move => inBounds(move.x, move.y) && isEmptyOrCapturable(board, knight, move.x, move.y));
  const captures = allMoves.filter(move => inBounds(move.x, move.y) && isCapturable(board, knight, move.x, move.y));

  return { moves, captures };
}
