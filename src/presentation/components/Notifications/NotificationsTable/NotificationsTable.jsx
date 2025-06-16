import { Table } from "react-bootstrap";
import {  FaTrash } from "react-icons/fa";
import { useStore, useTheme } from "../../../../application/utils/hooks";
import "./NotificationsTable.css";

const NotificationsTable = () => {
  const { theme } = useTheme();
  const [{ notifications }, dispatch] = useStore();

  const handleMarkRead = (id) => dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
  const handleDelete = (id) => dispatch({ type: "REMOVE_NOTIFICATION", payload: id });

  return (
    <div className={`notifications-table card ${theme}-mode`}>
      <Table striped hover responsive size="sm" className="nt-table">
        <thead>
          <tr>
            <th>Message</th>
            <th>Type</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((n) => (
            <tr key={n.id}>
              <td>{n.message}</td>
              <td className={`nt-type ${n.type}`}>{n.type.charAt(0).toUpperCase() + n.type.slice(1)}</td>
              <td>{new Date(n.date).toLocaleString()}</td>
              <td className="nt-actions">
                <FaTrash className="action-icon delete" onClick={() => handleDelete(n.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default NotificationsTable;
