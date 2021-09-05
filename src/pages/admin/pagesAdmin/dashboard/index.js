import React from "react";
import { Container } from "react-bootstrap";
import CardDashboard from "../../../../component/cardDashbord";
import Title from "../../../../component/title";

const Dashboard = () => {
  return (
    <Container>
      <Title title="Dashboard" />
      <div className="row">
        <div className="col-md-4 p-2">
          <CardDashboard title="Total Dataset" body="1000" />
        </div>

        <div className="col-md-4 p-2">
          <CardDashboard title="Total Data Latih" body="800" />
        </div>

        <div className="col-md-4 p-2">
          <CardDashboard title="Total Data Uji" body="200" />
        </div>

        <div className="col-md-4 p-2">
          <CardDashboard title="Accuracy" body="99%" />
        </div>

        <div className="col-md-4 p-2">
          <CardDashboard title="Recall" body="99%" />
        </div>

        <div className="col-md-4 p-2">
          <CardDashboard title="Precision" body="99%" />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
