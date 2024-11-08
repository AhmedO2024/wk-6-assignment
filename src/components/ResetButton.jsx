import React from "react";

export default function ResetButton({ resetGame }) {
  return (
    <button className="reset-btn" onClick={resetGame}>
      Reset Game
    </button>
  );
}
