import { getValidBishopMoves } from "./bishop";
import { getValidRookMoves } from "./rook";

export function getValidQueenMoves(board, queen, x, y) {
  // Queens can move like rooks or bishops
  return getValidBishopMoves(board, queen, x, y)
    .concat(getValidRookMoves(board, queen, x, y));
}