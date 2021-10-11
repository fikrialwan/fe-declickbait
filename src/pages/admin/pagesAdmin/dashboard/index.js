import React from "react";
import { Container } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import CardDashboard from "../../../../component/cardDashbord";
import Title from "../../../../component/title";
import { getCommons, getTotal, getTotalTest, getTotalTrain } from "../../../../state";

const Dashboard = () => {

  const dataset = useRecoilValue(getTotal);
  const datatest = useRecoilValue(getTotalTest);
  const datatrain = useRecoilValue(getTotalTrain);
  const { accuracy, recall, precisions } = useRecoilValue(getCommons);

  return (
    <Container>
      <Title title="Dashboard" />
      <div className="row">
        <div className="col-md-4 p-2">
          <CardDashboard title="Total Dataset" body={dataset} />
        </div>

        <div className="col-md-4 p-2">
          <CardDashboard title="Total Data Latih" body={datatrain} />
        </div>

        <div className="col-md-4 p-2">
          <CardDashboard title="Total Data Uji" body={datatest} />
        </div>

        <div className="col-md-4 p-2">
          <CardDashboard title="Accuracy" body={`${((accuracy ?? 0) * 100).toFixed(2)}%`} />
        </div>

        <div className="col-md-4 p-2">
          <CardDashboard title="Recall" body={`${((recall ?? 0) * 100).toFixed(2)}%`} />
        </div>

        <div className="col-md-4 p-2">
          <CardDashboard title="Precision" body={`${((precisions ?? 0) * 100).toFixed(2)}%`} />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
