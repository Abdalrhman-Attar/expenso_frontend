import Button from "../../common/Button/Button";
import "./PricingSection.css";
import { Container, Row, Col, Badge, Card } from "react-bootstrap";

function PricingSection() {
  return (
    <section id="pricing" className="pricing-section">
      <Container>
        <div className="section-header text-center mb-5">
          <Badge bg="success" className="section-badge">
            Pricing
          </Badge>
          <h2 className="section-title">Choose Your Plan</h2>
          <p className="section-subtitle">Start free, upgrade when you need more power</p>
        </div>

        <Row className="justify-content-center g-4">
          <Col lg={5} md={6}>
            <Card className="pricing-card pricing-card-standard h-100">
              <Card.Header className="pricing-header text-center">
                <h4 className="pricing-plan-name">Standard</h4>
                <div className="pricing-price">
                  <span className="currency">$</span>
                  <span className="amount">0</span>
                  <span className="period">/month</span>
                </div>
                <p className="pricing-description">Perfect for personal use</p>
              </Card.Header>
              <Card.Body className="pricing-body">
                <ul className="pricing-features">
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Track unlimited transactions
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Custom categories
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Basic analytics & reports
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Mobile & web access
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Data export
                  </li>
                </ul>
                <Button variant="secondary" className="pricing-btn w-100">
                  Get Started Free
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5} md={6}>
            <Card className="pricing-card pricing-card-premium h-100">
              <div className="pricing-badge">
                <Badge bg="warning" text="dark">
                  Most Popular
                </Badge>
              </div>
              <Card.Header className="pricing-header text-center">
                <h4 className="pricing-plan-name">Premium</h4>
                <div className="pricing-price">
                  <span className="currency">$</span>
                  <span className="amount">9</span>
                  <span className="period">.99/month</span>
                </div>
                <p className="pricing-description">For serious money managers</p>
              </Card.Header>
              <Card.Body className="pricing-body">
                <ul className="pricing-features">
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Everything in Standard
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> AI Financial Coach
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Advanced analytics & forecasting
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Smart notifications & alerts
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Priority customer support
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Bank-level security
                  </li>
                </ul>
                <Button variant="primary" className="pricing-btn btn-primary-gradient w-100">
                  Start Free Trial
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <p className="pricing-note">
            <i className="bi bi-shield-check me-2"></i>
            30-day money-back guarantee • Cancel anytime • No hidden fees
          </p>
        </div>
      </Container>
    </section>
  );
}

export default PricingSection;
