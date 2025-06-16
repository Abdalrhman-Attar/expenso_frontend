import { Row, Col } from "react-bootstrap";
import { SidebarProvider } from "../../../application/state/SidebarContext";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import Topbar from "../../components/common/Topbar/Topbar";
import MenuDrawer from "../../components/common/MenuDrawer/MenuDrawer";
import "./AppLayout.css";

const AppLayout = ({ children, pageTitle }) => (
  <SidebarProvider>
    <MenuDrawer />
    <Row className="app-layout g-0">
      <Col xs="auto" className="sidebar-col">
        <Sidebar />
      </Col>
      <Col className="main-col">
        <Topbar title={pageTitle} />
        <div className="content-container">{children}</div>
      </Col>
    </Row>
  </SidebarProvider>
);

export default AppLayout;
