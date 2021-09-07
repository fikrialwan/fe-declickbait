import React from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import TypeButton from "../../../../component/typeButton";
import Title from "../../../../component/title";
import TableAll from "./type/all";
import TableTrain from "./type/train";
import TableTest from "./type/test";
import TambahModal from "../../../../component/tambahModal";

const useQuery = () => new URLSearchParams(useLocation().search);

const Dataset = () => {
  const query = useQuery();

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

  return (
    <Container>
      <Title title="Dataset" />
      <div style={{ display: "flex", marginBottom: 20 }}>
        {buttonData.map((e) => (
          <TypeButton title={e.title} param={query.get("type")} />
        ))}
      </div>
      <TambahModal/>
      {buttonData.map((e) =>
        e.title.toLowerCase() === (query.get("type") ?? "all") ? (
          e.component
        ) : (
          <div />
        )
      )}
    </Container>
  );
};

export default Dataset;
