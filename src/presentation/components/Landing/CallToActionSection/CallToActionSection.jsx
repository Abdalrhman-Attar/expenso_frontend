import Button from "../../common/Button/Button";
import "./CallToActionSection.css";
import { Container, Row, Col } from "react-bootstrap";

function CallToActionSection() {
  return (
    <section id="contact" className="cta-section">
      <div className="cta-background">
        <div className="cta-gradient"></div>
      </div>
      <Container className="text-center cta-content">
        <Row className="justify-content-center">
          <Col lg={8}>
            <h2 className="cta-title">Ready to Transform Your Financial Future?</h2>
            <p className="cta-subtitle">Join thousands of users who've already taken control of their finances with Expenso</p>
            <div className="cta-buttons">
              <Button variant="primary" size="lg">
                <i className="bi bi-rocket-takeoff me-2"></i>
                Start Your Free Trial
              </Button>
              <Button variant="secondary" size="lg">
                <i className="bi bi-chat-dots me-2"></i>
                Talk to Sales
              </Button>
            </div>
            <div className="cta-trust mt-4">
              <div className="trust-item">
                <i className="bi bi-shield-check"></i>
                <span>Secure & Private</span>
              </div>
              <div className="trust-item">
                <i className="bi bi-clock"></i>
                <span>Setup in 2 Minutes</span>
              </div>
              <div className="trust-item">
                <i className="bi bi-credit-card"></i>
                <span>No Credit Card Required</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default CallToActionSection;
