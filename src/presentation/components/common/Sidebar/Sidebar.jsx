import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useTheme, useSidebar, useUserRoles } from "../../../../application/utils/hooks";
import { FaTachometerAlt, FaExchangeAlt, FaChartBar, FaList, FaBell, FaUser, FaComments, FaSignOutAlt } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const { isExpanded, expandSidebar, collapseSidebar } = useSidebar();
  const { logout } = useAuth0();
  const roles = useUserRoles();
  const isPremium = roles.includes("Premium");

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Transactions", path: "/transactions", icon: <FaExchangeAlt /> },
    { name: "Statistics", path: "/statistics", icon: <FaChartBar /> },
    { name: "Categories", path: "/categories", icon: <FaList /> },
    { name: "Notifications", path: "/notifications", icon: <FaBell /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    isPremium ? { name: "Chat", path: "/chat", icon: <FaComments /> } : null,
  ].filter(Boolean);

  return (
    <Nav className={`sidebar ${theme}-mode ${isExpanded ? "expanded" : "collapsed"}`} onMouseEnter={expandSidebar} onMouseLeave={collapseSidebar}>
      <div className="sidebar-header">
        <h4 className="sidebar-title">{isExpanded ? "Expenso" : "E"}</h4>
      </div>

      <div className="nav-items-sidebar">
        {navItems.map((item) => (
          <Nav.Link key={item.path} as={Link} to={item.path} active={location.pathname === item.path} className={location.pathname === item.path ? "nav-link-sidebar active" : "nav-link-sidebar"}>
            <span className="icon">{item.icon}</span>
            {isExpanded && <span className="link-text">{item.name}</span>}
          </Nav.Link>
        ))}
      </div>

      <button className="nav-link-sidebar logout-button-sidebar" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        <span className="icon">
          <FaSignOutAlt />
        </span>
        {isExpanded && <span className="link-text-sidebar">Logout</span>}
      </button>
    </Nav>
  );
};

export default Sidebar;
