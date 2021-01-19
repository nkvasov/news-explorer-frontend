import React from "react";
import './HamburgerButton.css';

const HamburgerButton = ({ onClick, isPressed, themeLight, isHidden }) => {

  const className = `hamburger hamburger_icon_white-lines
  ${isPressed && 'hamburger_icon_white-cross'}
  ${themeLight && 'hamburger_icon_black-lines'}
  ${isPressed && themeLight && 'hamburger_icon_black-cross'}
  ${isHidden && 'hamburger_hidden'}`;
  return (
    <button className={className} onClick={onClick} />
  )
};

export default HamburgerButton;
