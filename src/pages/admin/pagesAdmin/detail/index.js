import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import TableData from "../../../../component/table";
import Title from "../../../../component/title";
import { getKata, stateId } from "../../../../state";
import color from "../../../../utility/color";

const useQuery = () => new URLSearchParams(useLocation().search);
const Detail = () => {
  const query = useQuery();
  const judul = query.get("beritaid") ?? 0;
  const setId = useSetRecoilState(stateId);
  const kata = useRecoilValue(getKata);
  const [judulBerita, setJudulBerita] = useState("");
  const [dataKata, setDataKata] = useState([]);

  const getData = useCallback(async () => {
    await setId(judul);
    if (kata) {
      setJudulBerita(kata.judul_berita);
      setDataKata(kata.kata);
    }
  }, [judul, setId, setJudulBerita, setDataKata, kata]);

  useEffect(() => {
    getData();
  }, [getData]);

  const columns = [
    {
      dataField: "kata",
      text: "Kata",
      sort: true,
      headerStyle: {
        backgroundColor: color["blue-navy"],
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "TF",
      text: "TF",
      sort: true,
      headerStyle: {
        backgroundColor: color["blue-navy"],
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "IDF_clickbait",
      text: "IDF Clickbait",
      sort: true,
      headerStyle: {
        backgroundColor: color["blue-navy"],
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "IDF_not_clickbait",
      text: "IDF Bukan Clickbait",
      sort: true,
      headerStyle: {
        backgroundColor: color["blue-navy"],
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "IDF",
      text: "IDF",
      sort: true,
      headerStyle: {
        backgroundColor: color["blue-navy"],
        color: color.gray,
        border: "none",
      },
    },
  ];

  return (
    <Container>
      <Title title="Detail Term Frequency" />
      <Title title={`Judul Berita : ${judulBerita}`} />

      <TableData data={dataKata} columns={columns} />
    </Container>
  );
};

export default Detail;
