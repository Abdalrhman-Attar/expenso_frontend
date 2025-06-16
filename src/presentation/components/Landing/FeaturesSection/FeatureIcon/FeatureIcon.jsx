import "./FeatureIcon.css";

function FeatureIcon({ className = "bi bi-check-circle-fill", gradient = false }) {
  return (
    <div className={`feature-icon-wrapper ${gradient ? "gradient-icon" : ""}`}>
      <i className={className} style={{ fontSize: "2.5rem" }}></i>
    </div>
  );
}

export default FeatureIcon;
