import { getValidBishopMoves } from "./bishop";
import { getValidRookMoves } from "./rook";

export function getValidQueenMoves(board, queen) {
  // Queens can move like rooks or bishops
  const bishopMoves = getValidBishopMoves(board, queen);
  const rookMoves = getValidRookMoves(board, queen);

  const moves = bishopMoves.moves.concat(rookMoves.moves);
  const captures = bishopMoves.captures.concat(rookMoves.captures);
  return { moves, captures };
}