import React, { useState } from "react";
import { Card, Form, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router";
import color from "../../utility/color";
import background from "../../utility/background";
import services from "../../process/service";
import cautionIMG from "../../assets/svg/error.svg";

const Login = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState(false);

  const [isProses, setIsProses] = useState(false);

  const HandleLogin = (event) => {
    event.preventDefault();
    if (!isProses) {
      setIsProses(true);
      services
        .login({ username, password })
        .then((result) => {
          if (result.data.status === "success") {
            localStorage.setItem("user", result.data.data.id);
            history.push("/admin");
          } else {
            setIsError(true);
          }
        })
        .catch((err) => setIsError(true));
      setIsProses(false);
    }
  };

  return (
    <div
      className="body-center"
      style={{ background, padding: 10 }}
    >
      <div className="col-lg-6 col-md-8 col-sm-12 col-12 card-custom">
        <Card
          className="center rounded-3 shadow-sm"
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
                  onChange={(value) => setUsername(value.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  style={{
                    borderColor: color.black,
                    opacity: 0.5,
                    outline: 0,
                    boxShadow: "none",
                  }}
                  onChange={(value) => setPassword(value.target.value)}
                />
              </Form.Group>

              <Button
                type="submit"
                className="col-12 btn"
                style={{
                  color: isProses ? color["blue-navy"] : color.white,
                  backgroundColor: isProses ? color.gray : color["blue-navy"],
                  border: "none",
                  outline: 0,
                  boxShadow: "none",
                }}
                onClick={(event) => HandleLogin(event)}
              >
                {isProses ? "Loading" : "Login"}
              </Button>
              <Modal show={isError} onHide={() => setIsError(false)}>
                <Modal.Body>
                  <div className="row">
                    <div className="col-md-4" />
                    <img
                      src={cautionIMG}
                      alt="img-not-found"
                      className="p-2 col-md-4"
                    // width="100%"
                    // height="auto"
                    />
                    <div className="col-md-4" />
                  </div>
                  <p
                    style={{
                      textAlign: "center",
                      padding: 10,
                    }}
                  >
                    Terjadi kesalahan, periksa kembali username dan password anda
                  </p>
                  <div className="row">
                    <div className="col-md-4" />
                    <button
                      className="btn col-md-4"
                      style={{
                        boxShadow: "none",
                        outline: 0,
                        backgroundColor: color.red,
                        color: color.gray,
                      }}
                      onClick={() => setIsError(false)}
                    >
                      Coba Lagi
                    </button>
                    <div className="col-md-4" />
                  </div>
                </Modal.Body>
              </Modal>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
