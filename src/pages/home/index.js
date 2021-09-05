import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import color from "../../utility/color";

const Home = () => {
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
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Masukkan judul berita"
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
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
              >
                <option hidden>Masukkan sumber berita</option>
                <option value="Tribunnews.com">Tribunnews.com</option>
                <option value="Kompas.com">Kompas.com</option>
                <option value="Suara.com">Suara.com</option>
              </Form.Select>
            </Form.Group>
            <Button
              type="submit"
              className="col-12 btn"
              style={{
                color: color.white,
                backgroundColor: color.red,
                border: "none",
              }}
            >
              Klasifikasi
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
