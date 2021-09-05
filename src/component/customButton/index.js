import React from "react";
import { Link } from "react-router-dom";
import color from "../../utility/color";

const CustomButton = (props) => {
  return (
    <div className="mx-1">
      <Link to={props.link} style={{
          color:color.white
      }} >{props.title}</Link>
    </div>
  );
};

export default CustomButton;
