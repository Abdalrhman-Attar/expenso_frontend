import { Container, Row, Col } from "react-bootstrap";
import "./HeroSection.css";
import AnimatedCounter from "../../common/AnimatedCounter/AnimatedCounter";
import Button from "../../common/Button/Button";

function HeroSection() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      <Container className="hero-content">
        <Row className="align-items-center min-vh-100">
          <Col lg={6} className="hero-text">
            <h1 className="hero-title">
              Take Control of Your
              <span className="gradient-text"> Finances</span>
              <br />
              with Expenso
            </h1>
            <p className="hero-subtitle">The smart way to track expenses, manage income, and achieve financial clarity. Join thousands who've transformed their financial habits.</p>
            <div className="hero-stats mb-4">
              <div className="stat-item">
                <strong>
                  <AnimatedCounter end={5000} suffix="+" />
                </strong>
                <span>Happy Users</span>
              </div>
              <div className="stat-item">
                <strong>
                  <AnimatedCounter end={98} suffix="%" />
                </strong>
                <span>Satisfaction Rate</span>
              </div>
              <div className="stat-item">
                <strong>
                  $<AnimatedCounter end={2} suffix="M+" />
                </strong>
                <span>Money Tracked</span>
              </div>
            </div>
            <div className="hero-buttons">
              <Button variant="primary" size="lg">
                <i className="bi bi-rocket-takeoff me-2"></i>
                Start Free Trial
              </Button>
              <Button variant="secondary" size="lg">
                <i className="bi bi-play-circle me-2"></i>
                Watch Demo
              </Button>
            </div>
          </Col>
          <Col lg={6} className="hero-image-col">
            <div className="hero-image-container">
              <div className="floating-card card-1">
                <div className="card-content">
                  <div className="card-icon">💰</div>
                  <div className="card-text">
                    <strong>+$2,450</strong>
                    <span>Monthly Income</span>
                  </div>
                </div>
              </div>
              <div className="floating-card card-2">
                <div className="card-content">
                  <div className="card-icon">📊</div>
                  <div className="card-text">
                    <strong>-$1,890</strong>
                    <span>Total Expenses</span>
                  </div>
                </div>
              </div>
              <div className="floating-card card-3">
                <div className="card-content">
                  <div className="card-icon">🎯</div>
                  <div className="card-text">
                    <strong>$560</strong>
                    <span>Saved This Month</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HeroSection;
