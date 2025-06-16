import { Modal, Button } from "react-bootstrap";
import "./Dialog.css";

const Dialog = ({ show, title, children, onClose, onSubmit, submitLabel = "Save", canSubmit = true }) => (
  <Modal show={show} onHide={onClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>{children}</Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onSubmit} disabled={!canSubmit}>
        {submitLabel}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default Dialog;
