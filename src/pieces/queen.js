import { getBishopMoves } from "./bishop";
import { getRookMoves } from "./rook";

export function getQueenMoves(board, queen) {
  // Queens can move like rooks or bishops
  const bishopMoves = getBishopMoves(board, queen);
  const rookMoves = getRookMoves(board, queen);

  const moves = bishopMoves.moves.concat(rookMoves.moves);
  const captures = bishopMoves.captures.concat(rookMoves.captures);
  return { moves, captures };
}