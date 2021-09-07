import React, { Fragment, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import color from "../../utility/color";
import CustomButton from "../customButton";

const EditedModal = (props) => {

    const {judul, sumber, typeData, label} = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <div onClick={() => handleShow()}>
        <CustomButton
          title="Edit"
          textColor={color.black}
          bgColor={color.blue}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Judul"
                value={judul}
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
                value={sumber}
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
                <option value={typeData} hidden>{typeData}</option>
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
                <option value={label} hidden>{label}</option>
                <option value="Clickbait">Clickbait</option>
                <option value="Bukan Clickbait">Bukan Clickbait</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div onClick={handleClose}>
            <CustomButton
              title="Simpan"
              bgColor={color.blue}
              textColor={color.black}
              className="col-md-12"
            />
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default EditedModal;
