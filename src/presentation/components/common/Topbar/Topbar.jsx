import { Navbar, Container, Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import { useSidebar } from "../../../../application/utils/hooks";
import "./Topbar.css";

const Topbar = ({ title }) => {
  const { openMobile } = useSidebar();

  return (
    <Navbar className="topbar" variant="light">
      <Container fluid className="align-items-center">
        <Button className="menu-btn d-lg-none" variant="link" onClick={openMobile}>
          <FaBars />
        </Button>
        <Navbar.Brand className="navbar-brand">{title}</Navbar.Brand>
        <div className="ml-auto d-flex align-items-center">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </Container>
    </Navbar>
  );
};

export default Topbar;
