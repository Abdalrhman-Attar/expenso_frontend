import { useState } from "react";
import { Button as BootstrapButton, Spinner } from "react-bootstrap";
import "./Button.css";

const Button = ({ variant = "primary", children, onClick, disabled, className = "", ...props }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    if (onClick) {
      setLoading(true);
      try {
        await onClick(e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <BootstrapButton className={`custom-button ${variant === "primary" ? "primary" : "secondary"} ${className}`} onClick={handleClick} disabled={disabled || loading} {...props}>
      {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : children}
    </BootstrapButton>
  );
};

export default Button;
