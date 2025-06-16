import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import "./FeaturesSection.css";
import FeatureIcon from "./FeatureIcon/FeatureIcon";

function FeaturesSection() {
  return (
    <section id="features" className="features-section">
      <Container>
        <div className="section-header text-center mb-5">
          <Badge bg="light" text="dark" className="section-badge">
            Features
          </Badge>
          <h2 className="section-title">
            Why Choose <span className="gradient-text">Expenso</span>?
          </h2>
          <p className="section-subtitle">Powerful features designed to make financial management effortless and insightful</p>
        </div>

        <Row className="g-4">
          {[
            {
              icon: "bi bi-graph-up-arrow",
              title: "Smart Analytics",
              description: "AI-powered insights that help you understand spending patterns and make smarter financial decisions.",
              color: "primary",
            },
            {
              icon: "bi bi-wallet2",
              title: "Effortless Tracking",
              description: "Automatically categorize transactions with smart recognition. Never miss a receipt again.",
              color: "success",
            },
            {
              icon: "bi bi-bell-fill",
              title: "Smart Notifications",
              description: "Get personalized alerts for bills, unusual spending, and opportunities to save money.",
              color: "warning",
            },
            {
              icon: "bi bi-shield-lock-fill",
              title: "Bank-Level Security",
              description: "Your data is protected with 256-bit encryption and multi-factor authentication.",
              color: "danger",
            },
            {
              icon: "bi bi-phone-fill",
              title: "Cross-Platform Sync",
              description: "Access your finances anywhere with real-time sync across all your devices.",
              color: "info",
            },
            {
              icon: "bi bi-stars",
              title: "AI Financial Coach",
              description: "Get personalized budget recommendations and savings strategies from our AI assistant.",
              color: "purple",
            },
          ].map((feature, index) => (
            <Col lg={4} md={6} key={index}>
              <Card className="feature-card h-100">
                <Card.Body className="text-center p-4">
                  <FeatureIcon className={feature.icon} gradient />
                  <Card.Title className="feature-title mt-3">{feature.title}</Card.Title>
                  <Card.Text className="feature-description">{feature.description}</Card.Text>
                  <div className="feature-arrow">
                    <i className="bi bi-arrow-right"></i>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default FeaturesSection;
