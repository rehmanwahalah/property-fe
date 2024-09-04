import React from "react";
import classes from "./button.module.css";

const ButtonPrimary = ({
  text = "Click me",
  icon,
  onClick = () => {},
  className,
}) => {
  return (
    <button
      className={`${className} ${classes.buttonWrapper}`}
      onClick={onClick}
    >
      {icon && <img src={icon} alt="Icon" />}
      <span>{text}</span>
    </button>
  );
};

export default ButtonPrimary;
