import React from "react";
import { Container } from "react-bootstrap";
import CardDashboard from "../../../../component/cardDashbord";
import CustomButton from "../../../../component/customButton";
import TableData from "../../../../component/table";
import Title from "../../../../component/title";
import dataset, { defaultSortedDataset } from "../../../../dummy/dataset";
import color from "../../../../utility/color";

const Pelatihan = () => {
  const columns = [
    {
      dataField: "judul",
      text: "Judul",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "sumber",
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
        const { judul } = row;
        return (
          <div className="mb-1">
            <CustomButton
              title="Detail"
              textColor={color.gray}
              bgColor={color.red}
              isLink={true}
              link={`/detail?judul=${judul}`}
            />
          </div>
        );
      },
    },
  ];
  return (
    <Container>
      <Title title="Hasil Pelatihan" />
      <CustomButton
        title="Mulai Pelatihan"
        bgColor={color.red}
        textColor={color.gray}
      />
      <div className="row mb-2">
        <div className="col-md-4 p-2">
          <CardDashboard title="Total W pada kelas Clickbait" body="0.523" />
        </div>
        <div className="col-md-4 p-2">
          <CardDashboard
            title="Total W pada kelas bukan Clickbait"
            body="0.321"
          />
        </div>
        <div className="col-md-4 p-2">
          <CardDashboard title="Total IDF" body="0.932" />
        </div>
      </div>
      <TableData columns={columns} data={dataset} defaultSorted={defaultSortedDataset} />
    </Container>
  );
};

export default Pelatihan;
