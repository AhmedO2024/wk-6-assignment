import React from "react";

export default function AutoClickerButton({ buyAutoClicker }) {
  return (
    <button className="auto-clicker-btn" onClick={buyAutoClicker}>
      Buy Auto Clicker (Cost: 100 Cookies)
    </button>
  );
}
