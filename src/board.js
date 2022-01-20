import Square from './square';
import React, { useState } from 'react';
import { range, copyBoard } from './utils';

import dark_pawn from './images/dark_pawn.png';
import light_pawn from './images/light_pawn.png';
import dark_rook from './images/dark_rook.png';
import light_rook from './images/light_rook.png';
import dark_bishop from './images/dark_bishop.png';
import light_bishop from './images/light_bishop.png';
import dark_knight from './images/dark_knight.png';
import light_knight from './images/light_knight.png';
import dark_queen from './images/dark_queen.png';
import light_queen from './images/light_queen.png';
import dark_king from './images/dark_king.png';
import light_king from './images/light_king.png';

import { getValidMoves, tryMovePiece, PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING } from './pieces/core';
import { WHITE, BLACK } from './pieces/core';

import './board.css';

export default function Board(props) {
  const [board, setBoard] = useState(initializeBoard());
  const [turn, setTurn] = useState(WHITE);
  const [selected, setSelected] = useState({x: -1, y: -1});
  const [moveHints, setMoveHints] = useState([]);

  const handleClick = (x, y) => {
    if (selected.x === x && selected.y === y) {
      // Undo selection if clicked on twice
      setSelected({x: -1, y: -1});
      setMoveHints([]);
    } else if (selected.x === -1 && selected.y === -1) {
      if (board[x][y].piece && board[x][y].player === turn) {
        // Newly selected piece, highlight the square
        setSelected({x: x, y: y});
        setMoveHints(getValidMoves(board, board[x][y], x, y));
      }
    } else if (board[selected.x][selected.y].piece) {
      if (tryMovePiece(board, board[selected.x][selected.y], x, y)) {
        // Piece has been selected, move it to new square
        const boardCopy = copyBoard(board);
        const pieceCopy = { ...boardCopy[selected.x][selected.y], x: x, y: y };
        boardCopy[x][y] = pieceCopy
        boardCopy[selected.x][selected.y] = {};
        setBoard(boardCopy);

        setSelected({x: -1, y: -1});
        setMoveHints([]);
        setTurn(turn === WHITE ? BLACK : WHITE);
      } else {
        // Piece cannot be moved here, undo the piece selection
        setSelected({x: -1, y: -1});
        setMoveHints([]);
      }
    }
  }

  return (
    <div id="board">
      {range(8).map(x => (
        <div className="board-row" key={x}>
          {range(8).map(y => (
            <Square 
              x={x} 
              y={y} 
              key={(y * 8) + x}
              image={board[x][y].image} 
              selected={selected.x === x && selected.y === y}
              showMoveHint={shouldShowMoveHint(moveHints, x, y)}
              onClick={handleClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function initializeBoard() {
  const board = Array(8);
  for (let i = 0; i < board.length; i++) {
    board[i] = Array(8);
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = {};
    }
  }

  board[0][0] = { image : dark_rook, player: BLACK, piece: ROOK, x: 0, y: 0 };
  board[0][1] = { image : dark_knight, player: BLACK, piece: KNIGHT, x: 0, y: 1 };
  board[0][2] = { image : dark_bishop, player: BLACK, piece: BISHOP, x: 0, y: 2 };
  board[0][3] = { image : dark_queen, player: BLACK, piece: QUEEN, x: 0, y: 3 };
  board[0][4] = { image : dark_king, player: BLACK, piece: KING, x: 0, y: 4 };
  board[0][5] = { image : dark_bishop, player: BLACK, piece: BISHOP, x: 0, y: 5 };
  board[0][6] = { image : dark_knight, player: BLACK, piece: KNIGHT, x: 0, y: 6};
  board[0][7] = { image : dark_rook, player: BLACK, piece: ROOK, x: 0, y: 7 };
  board[1][0] = { image : dark_pawn, player: BLACK, piece: PAWN, x: 1, y: 0 };
  board[1][1] = { image : dark_pawn, player: BLACK, piece: PAWN, x: 1, y: 1 };
  board[1][2] = { image : dark_pawn, player: BLACK, piece: PAWN, x: 1, y: 2 };
  board[1][3] = { image : dark_pawn, player: BLACK, piece: PAWN, x: 1, y: 3 };
  board[1][4] = { image : dark_pawn, player: BLACK, piece: PAWN, x: 1, y: 4 };
  board[1][5] = { image : dark_pawn, player: BLACK, piece: PAWN, x: 1, y: 5 };
  board[1][6] = { image : dark_pawn, player: BLACK, piece: PAWN, x: 1, y: 6 };
  board[1][7] = { image : dark_pawn, player: BLACK, piece: PAWN, x: 1, y: 7 };
  
  board[6][0] = { image : light_pawn, player: WHITE, piece: PAWN, x: 6, y: 0 };
  board[6][1] = { image : light_pawn, player: WHITE, piece: PAWN, x: 6, y: 1 };
  board[6][2] = { image : light_pawn, player: WHITE, piece: PAWN, x: 6, y: 2 };
  board[6][3] = { image : light_pawn, player: WHITE, piece: PAWN, x: 6, y: 3 };
  board[6][4] = { image : light_pawn, player: WHITE, piece: PAWN, x: 6, y: 4 };
  board[6][5] = { image : light_pawn, player: WHITE, piece: PAWN, x: 6, y: 5 };
  board[6][6] = { image : light_pawn, player: WHITE, piece: PAWN, x: 6, y: 6 };
  board[6][7] = { image : light_pawn, player: WHITE, piece: PAWN, x: 6, y: 7 };
  board[7][0] = { image : light_rook, player: WHITE, piece: ROOK, x: 7, y: 0 };
  board[7][1] = { image : light_knight, player: WHITE, piece: KNIGHT, x: 7, y: 1 };
  board[7][2] = { image : light_bishop, player: WHITE, piece: BISHOP, x: 7, y: 2 };
  board[7][3] = { image : light_queen, player: WHITE, piece: QUEEN, x: 7, y: 3 };
  board[7][4] = { image : light_king, player: WHITE, piece: KING, x: 7, y: 4 };
  board[7][5] = { image : light_bishop, player: WHITE, piece: BISHOP, x: 7, y: 5 };
  board[7][6] = { image : light_knight, player: WHITE, piece: KNIGHT, x: 7, y: 6 };
  board[7][7] = { image : light_rook, player: WHITE, piece: ROOK, x: 7, y: 7 };

  return board;
};

function shouldShowMoveHint(moveHints, x, y) {
  return moveHints && moveHints.some(hint => hint.x === x && hint.y === y);
}
