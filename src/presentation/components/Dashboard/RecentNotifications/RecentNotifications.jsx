// src/presentation/components/Dashboard/RecentNotifications/RecentNotifications.jsx
import { FaTrash, FaExclamationTriangle, FaRegBell, FaInfoCircle } from "react-icons/fa";
import { useStore, useTheme } from "../../../../application/utils/hooks";
import "./RecentNotifications.css";

const RecentNotifications = () => {
  const {
    theme,
    state: { notifications },
    removeNotification,
  } = useStore();

  // show the 5 most recent
  const recent = [...notifications].sort((a, b) => b.scheduled_for - a.scheduled_for).slice(0, 5);

  const handleDelete = async (id) => {
    await removeNotification(id);
  };

  const getIconByType = (type) => {
    switch (type) {
      case "warning":
        return <FaExclamationTriangle className="notification-type-icon warning" />;
      case "reminder":
        return <FaRegBell className="notification-type-icon reminder" />;
      case "info":
      default:
        return <FaInfoCircle className="notification-type-icon info" />;
    }
  };

  return (
    <div className={`recent-notifications card ${theme}-mode`}>
      <div className="rn-header">
        <h4>Recent Notifications</h4>
      </div>
      <ul className="notification-list">
        {recent.map((note) => (
          <li key={note.id} className="notification-item">
            <div className="info">
              <span className="nt-icon">{getIconByType(note.type)}</span>
              <span className="message">{note.message}</span>
            </div>
            <span className="date">{note.scheduled_for.toLocaleTimeString()}</span>
            <div className="actions">
              <FaTrash className="action-icon delete" onClick={() => handleDelete(note.id)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentNotifications;
