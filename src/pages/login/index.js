import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import color from "../../utility/color";

const Login = () => {
    
    const history = useHistory();

    const HandleLogin = () => {
        history.push("/admin");
    }
    
    return (
        <div
      className="body-center"
      style={{ backgroundColor: color.gray, padding: 10 }}
    >
      <Card
        className="center rounded-3 shadow-sm col-lg-6 col-md-8 col-sm-12 col-12 "
        style={{
          backgroundColor: color.white,
          color: color.black,
          border: "none",
          paddingTop: 30,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Card.Title>Login Admin</Card.Title>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Username"
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password"
                placeholder="Password"
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
              />
            </Form.Group>
            <Button
              type="submit"
              className="col-12 btn"
              style={{
                color: color.white,
                backgroundColor: color.red,
                border : 'none'
              }}
              onClick = {() => HandleLogin() }
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
    );
}

export default Login;