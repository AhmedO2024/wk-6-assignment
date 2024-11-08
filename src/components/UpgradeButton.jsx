import React from "react";

export default function UpgradeButton({ buyUpgrade, text }) {
  return (
    <button className="upgrade-btn" onClick={buyUpgrade}>
      {text}
    </button>
  );
}
