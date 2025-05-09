import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const modes = ["dark", "system", "light"];

const ThemeToggleButton = ({ mode = "system", onModeChange }) => {
  const [modeIndex, setModeIndex] = useState(modes.indexOf(mode));

  useEffect(() => {
    setModeIndex(modes.indexOf(mode));
  }, [mode]);

  useEffect(() => {
    onModeChange && onModeChange(modes[modeIndex]);
  }, [modeIndex]);

  const handleClick = () => {
    setModeIndex((prev) => (prev + 1) % modes.length);
  };

  const renderIcon = () => {
    const currentMode = modes[modeIndex];
    if (currentMode === "dark") return <Brightness4Icon />;
    if (currentMode === "light") return <Brightness7Icon />;
    return <BrightnessAutoIcon />;
  };

  return (
    <IconButton onClick={handleClick} color="inherit">
      {renderIcon()}
    </IconButton>
  );
};
export default ThemeToggleButton;
