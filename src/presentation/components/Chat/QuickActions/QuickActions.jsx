import { Button } from "react-bootstrap";
import "./QuickActions.css";

const QuickActions = ({ actions, onClick, disabled }) => (
  <div className="quick-actions">
    <small className="qa-label">Quick actions:</small>
    <div className="qa-list">
      {actions.map((a, i) => (
        <Button key={i} variant="outline-primary" size="sm" disabled={disabled} onClick={() => onClick(a)}>
          {a}
        </Button>
      ))}
    </div>
  </div>
);

export default QuickActions;
