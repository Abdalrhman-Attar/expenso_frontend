import { FaTrash, FaExclamationTriangle, FaRegBell, FaInfoCircle } from "react-icons/fa";
import { useStore } from "../../../../application/utils/hooks";
import "./RecentNotifications.css";

const RecentNotifications = () => {
  const [state, dispatch] = useStore();
  const recent = [...state.notifications].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const handleDelete = (id) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
  };

 

  const getIconByType = (type) => {
    switch (type) {
      case "warning":
        return <FaExclamationTriangle className="notification-type-icon warning" />;
      case "reminder":
        return <FaRegBell className="notification-type-icon reminder" />;
      case "info":
        return <FaInfoCircle className="notification-type-icon info" />;
      default:
        return <FaInfoCircle className="notification-type-icon" />;
    }
  };

  return (
    <div className="recent-notifications card">
      <div className="rn-header">
        <h4>Recent Notifications</h4>
      </div>
      <ul className="notification-list">
        {recent.map((n) => (
          <li key={n.id} className="notification-item">
            <div className="info">
              <span className="nt-icon">{getIconByType(n.type)}</span>
              <span className="message">{n.message}</span>
            </div>
            <span className="date">{new Date(n.date).toLocaleTimeString()}</span>
            <div className="actions">
              <FaTrash className="action-icon delete" onClick={() => handleDelete(n.id)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentNotifications;
