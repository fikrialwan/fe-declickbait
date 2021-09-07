import React from "react";
import { Link } from "react-router-dom";
import color from "../../utility/color";

const TypeButton = (props) => {
  const { param, title } = props;
  return (
    <div style={{
      marginRight : 15
    }}>
      <Link
        to={`?type=${title.toLowerCase()}`}
        className="btn"
        style={{
          boxShadow: "none",
          outline: 0,
          backgroundColor:
            (param ?? "all") === title.toLowerCase() ? color.red : color.white,
          color:
            (param ?? "all") === title.toLowerCase() ? color.white : color.red,
        }}
      >
        {title}
      </Link>
    </div>
  );
};

export default TypeButton;
