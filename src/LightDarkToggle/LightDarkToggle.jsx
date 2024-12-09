import React, { useState } from "react";
import "./ToggleSwitch.css"; // Updated CSS file

const LightDarkToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="theme-toggle"
        className="toggle-checkbox"
        checked={darkMode}
        onChange={toggleTheme}
      />
      <label htmlFor="theme-toggle" className="toggle-label">
        <span className="toggle-button" />
      </label>
    </div>
  );
};

export default LightDarkToggle;
