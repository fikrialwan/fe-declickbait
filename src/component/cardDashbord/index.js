import React from "react";
import { Card } from "react-bootstrap";
import color from "../../utility/color";

const CardDashboard = (props) => {
  return (
    <Card
      style={{
        textAlign: "center",
        color: color.black,
        backgroundColor: color.white,
        border: "none",
      }}
      className="rounded-3 shadow-sm p-3"
    >
      <Card.Title
        style={{
          fontSize: 14,
          fontWeight: 400,
        }}
      >
        {props.title}
      </Card.Title>
      <Card.Body
        style={{
          fontSize: 50,
          fontWeight: 600,
        }}
        className="m-1"
      >
        {props.body}
      </Card.Body>
    </Card>
  );
};

export default CardDashboard;