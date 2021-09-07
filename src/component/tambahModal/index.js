import React, { Fragment, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import color from "../../utility/color";
import CustomButton from "../customButton";

const TambahModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <div onClick={() => handleShow()}>
        <CustomButton
          title="Tambah Data"
          bgColor={color.red}
          textColor={color.gray}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Judul"
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Sumber"
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
                <option hidden>Masukkan keterangan data</option>
                <option value="Data Train">Data Train</option>
                <option value="Data Test">Data Test</option>
              </Form.Select>
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
                <option hidden>Masukkan label data</option>
                <option value="Clickbait">Clickbait</option>
                <option value="Bukan Clickbait">Bukan Clickbait</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div onClick={handleClose}>
            <CustomButton
              title="Tambah"
              bgColor={color.red}
              textColor={color.gray}
              className="col-md-12"
            />
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default TambahModal;
