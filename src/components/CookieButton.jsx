import React from "react";
import cookieImage from "./cookie.png";

export default function CookieButton({ incrementCookies }) {
  return (
    <div id="cookie-btn" onClick={incrementCookies}>
      <img id="cookie-image" src={cookieImage} alt="cookie" />
    </div>
  );
}
