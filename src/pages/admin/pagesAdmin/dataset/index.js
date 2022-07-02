import React from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import TypeButton from "../../../../component/typeButton";
import Title from "../../../../component/title";
import TableAll from "./type/all";
import TableTrain from "./type/train";
import TableTest from "./type/test";
import TambahModal from "../../../../component/tambahModal";
import TambahExcel from "../../../../component/tambahExcel";
import CustomButton from "../../../../component/customButton";
import color from "../../../../utility/color";
import services from "../../../../process/service";
import { useResetRecoilState } from "recoil";
import { getDataset, getDatatest, getDatatrain } from "../../../../state";
import swal from "sweetalert";

const useQuery = () => new URLSearchParams(useLocation().search);

const Dataset = () => {
  const query = useQuery();

  const setDatasetState = useResetRecoilState(getDataset);
  const setDatatrainState = useResetRecoilState(getDatatrain);
  const setDatatestState = useResetRecoilState(getDatatest);

  const buttonData = [
    {
      title: "All",
      component: <TableAll />,
    },
    {
      title: "Train",
      component: <TableTrain />,
    },
    {
      title: "Test",
      component: <TableTest />,
    },
  ];

  const handleDelete = () => {
    swal({
      title: "Apakah anda yakin ingin menghapus semua data?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        services.deleteAllBerita().then((_) => {
          swal("Data berhasil dihapus", {
            icon: "success",
          });
          setDatasetState();
          setDatatestState();
          setDatatrainState();
        });
      }
    });
  };

  return (
    <Container>
      <Title title="Dataset" />
      <div style={{ display: "flex", marginBottom: 20 }}>
        {buttonData.map((e, index) => (
          <TypeButton key={index} title={e.title} param={query.get("type")} />
        ))}
      </div>
      <div style={{ display: "flex", marginBottom: 20 }}>
        <TambahModal />
        <TambahExcel />
        <div className="mb-1" onClick={() => handleDelete()}>
          <CustomButton
            title="Delete All Berita"
            textColor={color.gray}
            bgColor={color["blue-light"]}
          />
        </div>
      </div>
      {buttonData.map((e, index) =>
        e.title.toLowerCase() === (query.get("type") ?? "all") ? (
          <div key={index}>{e.component}</div>
        ) : (
          <div key={index} />
        )
      )}
    </Container>
  );
};

export default Dataset;
