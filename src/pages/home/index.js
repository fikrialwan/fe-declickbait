import React, { useState } from "react";
import { Card, Form, Button, Modal } from "react-bootstrap";
import color from "../../utility/color";
import cautionIMG from "../../assets/svg/error.svg";
import safeIMG from "../../assets/svg/shield.svg";
import background from "../../utility/background";
import { useRecoilValue } from "recoil";
import { getSumber } from "../../state";
import services from "../../process/service";

const Home = () => {
  const [judul, setJudul] = useState("");
  const [sumber, setSumber] = useState("");
  const [sumberLainnya, setSumberLainnya] = useState("");
  const [show, setShow] = useState(false);
  const [isClickbait, setIsClickbait] = useState();
  const [valueClickbait, setValueClickbait] = useState();
  const [valueNotClickbait, setValueNotClickbait] = useState();
  const [isProses, setIsProses] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("Terjadi kesalahan ketika melakukan deteksi berita");

  const sumberBerita = useRecoilValue(getSumber);

  const HandleClasify = async (event) => {
    event.preventDefault();
    const mulai = performance.now();
    if (!isProses) {
      setIsProses(true);
      try {
        if (judul === "" || sumber === "" || (sumber === "lainnya" && sumberLainnya === "")) {
          if (judul === "" && (sumber === "" || (sumber === "lainnya" && sumberLainnya === ""))) {
            setError("Terjadi kesalahan, judul berita dan sumber berita masih kosong");
          } else if (judul === "") {
            setError("Terjadi kesalahan, judul berita masih kosong");
          } else {
            setError("Terjadi kesalahan, dan sumber berita masih kosong");
          }
          throw new Error("error");
        }
        const detection = await services.detection({
          title: judul,
          sumberBerita: sumber === "lainnya" ? sumberLainnya : sumber,
        });
        if (detection.data.result.result === "Clickbait") {
          setIsClickbait(true);
        } else {
          setIsClickbait(false);
        }
        setValueClickbait(detection.data.result.valueClickbait);
        setValueNotClickbait(detection.data.result.valueNotClickbait);
        setIsProses(false);
        setShow(true);
        const selesai = performance.now();
        console.log(`waktu proses : ${selesai - mulai} miliseconds`);
      } catch (_) {
        setIsClickbait(false);
        setIsProses(false);
        setIsError(true);
        const selesai = performance.now();
        console.log(`waktu proses : ${selesai - mulai} miliseconds`);
      }
    }
  };

  return (
    <div
      className="body-center"
      style={{
        background,
        padding: 10,
      }}
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
                  {sumberBerita.map((e, index) => (
                    <option key={index} value={e}>
                      {e}
                    </option>
                  ))}
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
                  color: isProses ? color["blue-navy"] : color.white,
                  backgroundColor: isProses ? color.gray : color["blue-navy"],
                  border: "none",
                  outline: 0,
                  boxShadow: "none",
                }}
              // onClick={()=>HandleClasify()}
              >
                {isProses ? "Loading" : "Klasifikasi"}
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
                  <p
                    style={{
                      textAlign: "center",
                      padding: 10,
                    }}
                  >
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
                    {/* <br />
                  Karena nilai hasil multinomial naive bayes pada kelas{" "}
                  <span style={{ color: color.red }}>{isClickbait ? "CLickbait" : "Bukan Clickbait"}</span> bernilai{" "}
                  <span style={{ color: color.red }}>{isClickbait ? valueClickbait : valueNotClickbait}</span> lebih besar
                  dari pada hasil multinomial naive bayes pada kelas{" "}
                  <span style={{ color: color.red }}>{!isClickbait ? "CLickbait" : "Bukan Clickbait"}</span> yang bernilai{" "}
                  <span style={{ color: color.red }}>{!isClickbait ? valueClickbait : valueNotClickbait}</span> */}
                  </p>
                </Modal.Body>
              </Modal>
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
                    {error}
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

export default Home;
