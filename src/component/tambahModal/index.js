import React, { Fragment, useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import color from "../../utility/color";
import CustomButton from "../customButton";
import services from "../../process/service";
import { useResetRecoilState } from "recoil";
import { getDataset, getDatatest, getDatatrain } from "../../state";
import swal from "sweetalert";

const TambahModal = () => {
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);

  const [judulBerita, setJudulBerita] = useState("");
  const [sumberBerita, setSumberBerita] = useState("");
  const [statusData, setStatusData] = useState("");
  const [label, setLabel] = useState("");
  const idAdmin = localStorage.getItem("user") ?? 0;

  
  const setDatasetState = useResetRecoilState(getDataset);
  const setDatatrainState = useResetRecoilState(getDatatrain);
  const setDatatestState = useResetRecoilState(getDatatest);

  const handleAddBerita = async () => {
    await services
      .postBerita({
        judulBerita,
        sumberBerita,
        statusData,
        label,
        idAdmin,
      })
      .then((result) => {
        handleClose();
        setDatatrainState();
        setDatatestState();
        setDatasetState();
        swal("Data berhasil ditambah", {
          icon: "success",
        });
      })
      .catch((error) => {
        setIsError(true);
        swal("Data gagal ditambah", {
          icon: "warning",
        });
      });
  };

  const handleClose = () => {
    setShow(false);
    setIsError(false);
  };
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
          {isError ? (
            <Alert variant="danger">
              Terdapat kesalahan ketika menambahkan data
            </Alert>
          ) : null}
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
                onChange={(value) => setJudulBerita(value.target.value)}
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
                onChange={(value) => setSumberBerita(value.target.value)}
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
                onChange={(value) => setStatusData(value.target.value)}
              >
                <option hidden>Masukkan keterangan data</option>
                <option value="train">Data Train</option>
                <option value="test">Data Test</option>
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
                onChange={(value) => setLabel(value.target.value)}
              >
                <option hidden>Masukkan label data</option>
                <option value="Clickbait">Clickbait</option>
                <option value="Bukan Clickbait">Bukan Clickbait</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div onClick={handleAddBerita}>
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
