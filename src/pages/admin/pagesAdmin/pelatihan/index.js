import React, { useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";
import CardDashboard from "../../../../component/cardDashbord";
import CustomButton from "../../../../component/customButton";
import TableData from "../../../../component/table";
import Title from "../../../../component/title";
import { defaultSortedDataset } from "../../../../dummy/dataset";
import services from "../../../../process/service";
import { getCommons, getDatatrain } from "../../../../state";
import color from "../../../../utility/color";
import loading from "../../../../assets/svg/loading.svg";
import swal from "sweetalert";

const Pelatihan = () => {
  const data = useRecoilValue(getDatatrain);
  const resetData = useResetRecoilState(getDatatrain);
  const resetCommons = useResetRecoilState(getCommons);
  const [isProses, setIsProses] = useState(false);

  const { w_unik, w_total_clickbait, w_total_not_clickbait } =
    useRecoilValue(getCommons);

  const trainProses = async () => {
    setIsProses(true);
    try {
      await services.train();
      setIsProses(false);
      resetData();
      resetCommons();
      swal("Pelatihan data berhasil", {
        icon: "success",
      });
    } catch (_) {
      setIsProses(false);
      swal("Pelatihan data gagal", {
        icon: "warning",
      });
    }
  };

  const columns = [
    {
      dataField: "judul_berita",
      text: "Judul",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "sumber_berita",
      text: "Sumber",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "id",
      text: "Action",
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
      formatter: (_, row) => {
        const { id } = row;
        return (
          <div className="mb-1">
            <CustomButton
              title="Detail"
              textColor={color.gray}
              bgColor={color.red}
              isLink={true}
              link={`/detail?beritaid=${id}`}
            />
          </div>
        );
      },
    },
  ];
  return (
    <Container>
      <Title title="Hasil Pelatihan" />
      <div
        onClick={() => {
          if (!isProses) trainProses();
        }}
      >
        <CustomButton
          title={isProses ? "Proses..." : "Mulai Pelatihan"}
          bgColor={isProses ? color.white : color.red}
          textColor={isProses ? color.red : color.gray}
        />
      </div>
      <Modal
        show={isProses}
        onHide={() => setIsProses(false)}
        backdrop="static"
      >
        <Modal.Body>
          <div className="row">
            <div className="col-md-2" />
            <img
              src={loading}
              alt="img-not-found"
              className="p-2 col-md-8"
              // width="100%"
              // height="auto"
            />
            <div className="col-md-2" />
          </div>
          <p
            style={{
              fontSize: 30,
              textAlign: "center",
              padding: 10,
            }}
          >
            Proses....
          </p>
        </Modal.Body>
      </Modal>
      <div className="row mb-2">
        <div className="col-md-4 p-2">
          <CardDashboard
            title="Total W (TF-IDF) pada kelas Clickbait"
            body={w_total_clickbait.toFixed(3)}
          />
        </div>
        <div className="col-md-4 p-2">
          <CardDashboard
            title="Total W (TF-IDF) pada kelas bukan Clickbait"
            body={w_total_not_clickbait.toFixed(3)}
          />
        </div>
        <div className="col-md-4 p-2">
          <CardDashboard title="Total IDF" body={w_unik.toFixed(3)} />
        </div>
      </div>
      <TableData
        columns={columns}
        data={data.filter((e) => e.kataCount > 0)}
        defaultSorted={defaultSortedDataset}
      />
    </Container>
  );
};

export default Pelatihan;
