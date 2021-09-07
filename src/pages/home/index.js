import React, { useState } from "react";
import { Card, Form, Button, Modal } from "react-bootstrap";
import color from "../../utility/color";
import cautionIMG from "../../assets/svg/error.svg";
import safeIMG from "../../assets/svg/shield.svg";

const Home = () => {
  const [judul, setJudul] = useState("");
  const [sumber, setSumber] = useState("");
  const [sumberLainnya, setSumberLainnya] = useState("");
  const [show, setShow] = useState(false);
  const [isClickbait, setIsClickbait] = useState(true);

  const HandleClasify = (event) => {
    event.preventDefault();
    setIsClickbait(!isClickbait);
    setShow(true);
  };

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
        <Card.Title>Klasifikasi Berita Clickbait</Card.Title>
        <Card.Body>
          <Form onSubmit={(e) => HandleClasify(e)}>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Masukkan judul berita"
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                onChange={(e) => setJudul(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Select
                className="mb-3"
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                onChange={(e) => setSumber(e.target.value)}
              >
                <option hidden>Masukkan sumber berita</option>
                <option value="Tribunnews.com">Tribunnews.com</option>
                <option value="Kompas.com">Kompas.com</option>
                <option value="Suara.com">Suara.com</option>
                <option value="lainnya">Lainnya</option>
              </Form.Select>
            </Form.Group>
            {sumber === "lainnya" ? (
              <Form.Group className="mb-3">
                <Form.Control
                  placeholder="Masukkan sumber berita"
                  style={{
                    borderColor: color.black,
                    opacity: 0.5,
                    outline: 0,
                    boxShadow: "none",
                  }}
                  onChange={(e) => setSumberLainnya(e.target.value)}
                />
              </Form.Group>
            ) : (
              <div />
            )}
            <Button
              type="submit"
              className="col-12 btn"
              style={{
                color: color.white,
                backgroundColor: color.red,
                border: "none",
                outline: 0,
                boxShadow: "none",
              }}
              // onClick={()=>HandleClasify()}
            >
              Klasifikasi
            </Button>
            <Modal show={show} onHide={() => setShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Hasil Klasifikasi</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-md-4" />
                  <img
                    src={isClickbait ? cautionIMG : safeIMG}
                    alt="img-not-found"
                    className="p-2 col-md-4"
                    // width="100%"
                    // height="auto"
                  />
                  <div className="col-md-4" />
                </div>
                <p style={{
                  textAlign: "center",
                  padding: 10
                }}>
                  Berita dengan judul berita "{judul}" dari "
                  {sumber === "lainnya" ? sumberLainnya : sumber}" termasuk
                  kategori{" "}
                  <span
                    className="btn"
                    style={{
                      cursor: "none",
                      color: isClickbait ? color.gray : color.black,
                      backgroundColor: isClickbait ? color.red : color.blue,
                    }}
                  >
                    {isClickbait ? "CLickbait" : "Bukan Clickbait"}
                  </span>
                </p>
              </Modal.Body>
            </Modal>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
