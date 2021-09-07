import React from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router";
import TableData from "../../../../component/table";
import Title from "../../../../component/title";
import DummyDetailFunc from "../../../../process/dummyDetailFunc";
import color from "../../../../utility/color";

const useQuery = () => new URLSearchParams(useLocation().search);
const Detail = () => {
  const query = useQuery();
  const judul = query.get("judul") ?? "";

  const columns = [
    {
      dataField: "kata",
      text: "Kata",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "idf",
      text: "TF Clickbait",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "idf",
      text: "TF Bukan Clickbait",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "idf",
      text: "IDF Clickbait",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "idf",
      text: "IIDF Bukan Clickbait",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "idf",
      text: "IDF",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    
  ];

  return (
    <Container>
      <Title title="Detail Term Frequency" />
      <Title title={`Judul Berita : ${judul}`} />

      <TableData data={DummyDetailFunc(judul)} columns={columns} />
    </Container>
  );
};

export default Detail;
