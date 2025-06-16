import { Form, Button } from "react-bootstrap";
import "./ChatInput.css";

const ChatInput = ({ value, onChange, onSend, disabled }) => (
  <Form className="chat-input" onSubmit={onSend}>
    <Form.Control type="text" placeholder="Ask your financial advisor…" value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} />
    <Button type="submit" variant="primary" disabled={disabled || !value.trim()}>
      Send
    </Button>
  </Form>
);

export default ChatInput;
