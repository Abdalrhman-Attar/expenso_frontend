import { Offcanvas, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaExchangeAlt, FaChartBar, FaList, FaBell, FaUser, FaComments, FaSignOutAlt } from "react-icons/fa";
import { useSidebar, useTheme, useUserRoles } from "../../../../application/utils/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import "./MenuDrawer.css";

const MenuDrawer = () => {
  const { mobileOpen, closeMobile } = useSidebar();
  const { theme } = useTheme();
  const location = useLocation();
  const { logout } = useAuth0();
  const roles = useUserRoles();
  const isPremium = roles.includes("Premium");

  const items = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Transactions", path: "/transactions", icon: <FaExchangeAlt /> },
    { name: "Statistics", path: "/statistics", icon: <FaChartBar /> },
    { name: "Categories", path: "/categories", icon: <FaList /> },
    { name: "Notifications", path: "/notifications", icon: <FaBell /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    isPremium ? { name: "Chat", path: "/chat", icon: <FaComments /> } : null,
  ].filter(Boolean);

  const handleLogout = () => {
    closeMobile();
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <Offcanvas show={mobileOpen} onHide={closeMobile} className={`menu-drawer ${theme}-mode`} backdrop="static">
      <Offcanvas.Header closeButton className="drawer-header">
        <Offcanvas.Title className="drawer-title">Expenso</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="drawer-body">
        <Nav className="drawer-nav">
          <div className="nav-items-drawer">
            {items.map((item) => (
              <Nav.Link key={item.path} as={Link} to={item.path} active={location.pathname === item.path} className={location.pathname === item.path ? "nav-link-drawer active" : "nav-link-drawer"} onClick={closeMobile}>
                <span className="icon">{item.icon}</span>
                <span className="link-text">{item.name}</span>
              </Nav.Link>
            ))}
          </div>

          <button className="nav-link logout-button" onClick={handleLogout}>
            <span className="icon">
              <FaSignOutAlt />
            </span>
            <span className="link-text">Logout</span>
          </button>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MenuDrawer;
