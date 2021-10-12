import React, { Fragment, useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import color from "../../utility/color";
import CustomButton from "../customButton";
import services from "../../process/service";
import { useResetRecoilState } from "recoil";
import { getDataset, getDatatest, getDatatrain } from "../../state";
import swal from "sweetalert";

const EditedModal = (props) => {
  const { id, judul, sumber, typeData, label } = props;

  const [handleJudul, setHandleJudul] = useState(judul);
  const [handleSumber, setHandleSumber] = useState(sumber);
  const [handleTypeData, setHandleTypeData] = useState(typeData);
  const [handleLabel, setHandleLabel] = useState(label);
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const idAdmin = localStorage.getItem("user") ?? 0;

  const setDatasetState = useResetRecoilState(getDataset);
  const setDatatrainState = useResetRecoilState(getDatatrain);
  const setDatatestState = useResetRecoilState(getDatatest);

  const handleUpdateBerita = async () => {
    await services
      .putBerita({
        judulBerita: handleJudul,
        sumberBerita: handleSumber,
        statusData: handleTypeData,
        label: handleLabel,
        idAdmin,
      }, id)
      .then((result) => {
        handleClose();
        setDatasetState();
        setDatatestState();
        setDatatrainState();
        swal("Data berhasil diedit", {
          icon: "success",
        });
      })
      .catch((error) => {
        setIsError(true);
        swal("Data gagal diedit", {
          icon: "warning",
        });
      });
  };

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
          {isError ? (
            <Alert variant="danger">
              Terdapat kesalahan ketika mengubah data
            </Alert>
          ) : null}
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Judul"
                value={handleJudul}
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                onChange={(value) => setHandleJudul(value.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Sumber"
                value={handleSumber}
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                onChange={(value) => setHandleSumber(value.target.value)}
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
                onChange={(value) => setHandleTypeData(value.target.value)}
              >
                <option value={handleTypeData} hidden>
                  {handleTypeData}
                </option>
                <option value="train">train</option>
                <option value="test">test</option>
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
                onChange={(value) => setHandleLabel(value.target.value)}
              >
                <option value={handleLabel} hidden>
                  {handleLabel}
                </option>
                <option value="Clickbait">Clickbait</option>
                <option value="Bukan Clickbait">Bukan Clickbait</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div onClick={handleUpdateBerita}>
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
