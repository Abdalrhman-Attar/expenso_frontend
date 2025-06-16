import { Form } from "react-bootstrap";
import "./TimeFilter.css";

const TimeFilter = ({ timePeriod, setTimePeriod }) => (
  <Form.Select className="time-filter" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)}>
    <option value="Daily">Daily</option>
    <option value="Monthly">Monthly</option>
    <option value="Yearly">Yearly</option>
  </Form.Select>
);

export default TimeFilter;
