import "./DashboardLayout.css";

import Header from "../../components/Dashboard/Header/Header";
import SummaryCards from "../../components/Dashboard/SummaryCards/SummaryCards";
import RecentTransactions from "../../components/Dashboard/RecentTransactions/RecentTransactions";
import RecentNotifications from "../../components/Dashboard/RecentNotifications/RecentNotifications";
import Graphs from "../../components/Dashboard/Graphs/Graphs";

function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <Header />
      <SummaryCards />
      <div className="dashboard-grid">
        <RecentTransactions />
        <RecentNotifications />
      </div>
      <Graphs />
    </div>
  );
}

export default DashboardLayout;
