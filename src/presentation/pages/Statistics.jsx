import { useState } from "react";
import AppLayout from "../layout/AppLayout/AppLayout";
import { Container, Row, Col } from "react-bootstrap";

import TimeFilter from "../components/Statistics/TimeFilter/TimeFilter";
import IncomePieChart from "../components/Statistics/IncomePieChart/IncomePieChart";
import ExpensePieChart from "../components/Statistics/ExpensePieChart/ExpensePieChart";
import IncomeExpenseBarChart from "../components/Statistics/IncomeExpenseBarChart/IncomeExpenseBarChart";

const Statistics = () => {
  const [timePeriod, setTimePeriod] = useState("Monthly");

  return (
    <AppLayout pageTitle="Statistics">
      <Container>
        <Row className="mb-4">
          <Col md={4}>
            <TimeFilter timePeriod={timePeriod} setTimePeriod={setTimePeriod} />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <IncomePieChart timePeriod={timePeriod} />
          </Col>
          <Col md={6}>
            <ExpensePieChart timePeriod={timePeriod} />
          </Col>
        </Row>
        <Row>
          <Col>
            <IncomeExpenseBarChart timePeriod={timePeriod} />
          </Col>
        </Row>
      </Container>
    </AppLayout>
  );
};

export default Statistics;
