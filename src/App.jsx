import React, { useState, useEffect } from "react";
import CookieButton from "./components/CookieButton";
import UpgradeButton from "./components/UpgradeButton";
import AutoClickerButton from "./components/AutoClickerButton";
import ResetButton from "./components/ResetButton";
import resetSound from "./components/sounds/reset-sound.mp3";
import biteSound from "./components/sounds/bite-sound.mp3";
import upgradeSound from "./components/sounds/upgrade-sound.mp3";
import alertSound from "./components/sounds/alert-sound.mp3";
import cookieMonsterSound from "./components/sounds/cookie-monster.mp3";
import "./index.css";

export default function App() {
  const [cookies, setCookies] = useState(
    Number(localStorage.getItem("cookies")) || 0
  );
  const [cps, setCps] = useState(Number(localStorage.getItem("cps")) || 0);
  const [clickPower, setClickPower] = useState(
    Number(localStorage.getItem("clickPower")) || 1
  );

  const resetSoundAudio = new Audio(resetSound);
  const biteSoundAudio = new Audio(biteSound);
  const upgradeSoundAudio = new Audio(upgradeSound);
  const alertSoundAudio = new Audio(alertSound);
  const cookieMonsterAudio = new Audio(cookieMonsterSound);

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies((current) => current + cps);
    }, 1000);

    return () => clearInterval(interval);
  }, [cps]);

  useEffect(() => {
    localStorage.setItem("cookies", cookies);
    localStorage.setItem("cps", cps);
    localStorage.setItem("clickPower", clickPower);
  }, [cookies, cps, clickPower]);

  const incrementCookies = () => {
    biteSoundAudio.play();
    setCookies(cookies + clickPower);
  };

  const upgradeOptions = [
    { cost: 50, increment: 2 },
    { cost: 75, increment: 3 },
  ];

  const buyUpgrade = (increment, cost) => {
    if (cookies >= cost) {
      setClickPower(clickPower + increment);
      setCookies(cookies - cost);
      upgradeSoundAudio.play();
    } else {
      alertSoundAudio.play();
      alert("You don't have enough cookies to upgrade!");
    }
  };

  const buyAutoClicker = () => {
    if (cookies >= 100) {
      setCps(cps + 1);
      setCookies(cookies - 100);
      cookieMonsterAudio.play();
    } else {
      alertSoundAudio.play();
      alert("You don't have enough cookies for an auto clicker!");
    }
  };

  const resetGame = () => {
    setCookies(0);
    setCps(0);
    setClickPower(1);
    localStorage.clear();
    resetSoundAudio.play();
  };

  return (
    <div className="flex-container">
      <h1>Cookie Clicker</h1>
      <CookieButton incrementCookies={incrementCookies} />
      <p>Cookies: {cookies}</p>
      <p>CPS: {cps}</p>

      <div className="upgrade-buttons">
        {upgradeOptions.map((option, index) => (
          <UpgradeButton
            key={index}
            buyUpgrade={() => buyUpgrade(option.increment, option.cost)}
            text={`Upgrade Clicker +${option.increment} (Cost: ${option.cost} cookies)`}
          />
        ))}
        <AutoClickerButton buyAutoClicker={buyAutoClicker} />
      </div>

      <ResetButton resetGame={resetGame} />
    </div>
  );
}
