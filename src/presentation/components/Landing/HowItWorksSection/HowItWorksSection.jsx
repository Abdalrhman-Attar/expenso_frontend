import "./HowItWorksSection.css";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";

function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="how-it-works" className="how-it-works-section">
      <Container>
        <div className="section-header text-center mb-5">
          <Badge bg="primary" className="section-badge">
            How It Works
          </Badge>
          <h2 className="section-title">Get Started in 3 Simple Steps</h2>
          <p className="section-subtitle">From signup to financial mastery in minutes, not hours</p>
        </div>

        <Row className="justify-content-center">
          {[
            {
              number: "01",
              title: "Create Account",
              description: "Sign up with your email or Google account. Setup takes less than 2 minutes.",
              icon: "bi bi-person-plus",
            },
            {
              number: "02",
              title: "Connect & Track",
              description: "Track income and expenses with smart categorization.",
              icon: "bi bi-link-45deg",
            },
            {
              number: "03",
              title: "Analyze & Optimize",
              description: "Use AI insights and beautiful charts to understand and improve your financial health.",
              icon: "bi bi-graph-up",
            },
          ].map((step, index) => (
            <Col lg={4} md={6} key={index} className="mb-4">
              <div className={`step-card ${activeStep === index ? "active" : ""}`}>
                <div className="step-number">{step.number}</div>
                <div className="step-icon">
                  <i className={step.icon}></i>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                <div className="step-connector"></div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default HowItWorksSection;
