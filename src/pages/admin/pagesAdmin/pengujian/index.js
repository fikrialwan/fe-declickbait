import React, { useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState} from "recoil";
import CardDashboard from "../../../../component/cardDashbord";
import CustomButton from "../../../../component/customButton";
import TableData from "../../../../component/table";
import Title from "../../../../component/title";
import { defaultSortedDataset } from "../../../../dummy/dataset";
import services from "../../../../process/service";
import { getCommons, getDatatest } from "../../../../state";
import color from "../../../../utility/color";
import loading from "../../../../assets/svg/loading.svg";

const Pengujian = () => {
  const data = useRecoilValue(getDatatest);
  const resetData = useResetRecoilState(getDatatest);
  const resetCommons = useResetRecoilState(getCommons);
  const { accuracy, recall, precisions } = useRecoilValue(getCommons);

  const [isProses, setIsProses] = useState(false);


  const testProses = async () => {
    setIsProses(true);
    try {
      await services.test();
      setIsProses(false);
      resetData();
      resetCommons();
    } catch (_) {
      setIsProses(false);
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
      dataField: "label",
      text: "Label",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "label_uji",
      text: "Hasil Klasifikasi",
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
      <Title title="Hasil Pengujian" />
      <div
        onClick={() => {
          if (!isProses) testProses();
        }}
      >
        <CustomButton
          title={ isProses ? "Proses..." : "Mulai Pengujian"}
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
            title="Accuracy"
            body={`${((accuracy ?? 0) * 100).toFixed(2)}%`}
          />
        </div>
        <div className="col-md-4 p-2">
          <CardDashboard
            title="Recall"
            body={`${((recall ?? 0) * 100).toFixed(2)}%`}
          />
        </div>
        <div className="col-md-4 p-2">
          <CardDashboard
            title="Precision"
            body={`${((precisions ?? 0) * 100).toFixed(2)}%`}
          />
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

export default Pengujian;
