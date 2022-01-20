import './square.css';

export default function Square(props) {
  const { x, y, image, selected, showMoveHint, showCheckHint, onClick } = props;

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

  // Whether or not to show a red circle to indicate that the king is in check
  const checkClass = showCheckHint ? 'checkHint' : '';

  return (
    <div 
      className={`square ${squareColor} ${selectedClass} ${checkClass}`}
      onClick={() => onClick(x, y)}
    >
      {showMoveHint && 
        <div className="moveHint"></div>
      }

      {showCheckHint && 
        <div className="checkHint"></div>
      }

      {image && 
        <img className="piece" src={image} draggable="false"/>
      }

    </div>

  )
}