import './board.css';

export default function Square(props) {
  const { x, y, image, selected, turn, showMoveHint, onClick } = props;

  const lightSquare = "light-square";
  const darkSquare = "dark-square";

  let squareColor;
  if (x % 2 === 0) {
    // Rows that begin with a light square
    squareColor = y % 2 === 0 ? lightSquare : darkSquare;
  } else {
    // Rows that begin with a dark square
    squareColor = y % 2 === 0 ? darkSquare : lightSquare;
  }
  
  // Whether or not the current square has been selected.
  // Render these squares with a darker baclground
  const selectedClass = selected && image ? 'selected' : '';

  // Whether or not to show a small circle on the square indicating
  // that the selected piece can move to this square.
  const moveHintClass = showMoveHint ? 'moveHint' : '';

  return (
    <div 
      className={`square ${squareColor} ${selectedClass}`}
      onClick={() => onClick(x, y)}
    >
      <div className={`moveHintContainer ${moveHintClass}`}>
        {image && 
          <img className="piece" src={image} />
        }
      </div>

    </div>
  )
}