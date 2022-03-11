import React, { Fragment, useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import color from "../../utility/color";
import CustomButton from "../customButton";
import services from "../../process/service";
import { useResetRecoilState } from "recoil";
import { getDataset, getDatatest, getDatatrain } from "../../state";
import swal from "sweetalert";

const TambahExcel = () => {
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isProses, setIsProses] = useState(false);

  const [dataFile, setDataFile] = useState();
  // const [sumberBerita, setSumberBerita] = useState("");
  const idAdmin = localStorage.getItem("user") ?? 0;

  const setDatasetState = useResetRecoilState(getDataset);
  const setDatatrainState = useResetRecoilState(getDatatrain);
  const setDatatestState = useResetRecoilState(getDatatest);

  const handleAddBerita = async () => {
    setIsProses(true);
    const data = new FormData();
    data.append("data", dataFile);
    // data.append("sumberBerita", sumberBerita);
    data.append("idAdmin", idAdmin);
    await services
      .postBeritaExcel(data)
      .then((result) => {
        handleClose();
        setDatatrainState(true);
        setDatatestState(true);
        setDatasetState(true);
        setIsProses(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsProses(false);
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
          title="Tambah Data With Excel"
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
                type="file"
                placeholder="Judul"
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                onChange={(value) => {
                  setDataFile(value.target.files[0]);
                }}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
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
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div onClick={handleAddBerita}>
            <CustomButton
              title={isProses ? "Loading..." : "Tambah"}
              bgColor={isProses ? "#808080" : color.red}
              textColor={color.gray}
              className="col-md-12"
            />
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default TambahExcel;
