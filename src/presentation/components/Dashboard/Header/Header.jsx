import { useAuth0 } from "@auth0/auth0-react";
import "./Header.css";

function Header() {
  const { user } = useAuth0();
  const firstName = user?.given_name || user?.name?.split(" ")[0] || "User";
  const now = new Date();
  const hours = now.getHours();
  let greeting = "Hello";
  if (hours < 12) greeting = "Good morning";
  else if (hours < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  return (
    <div className="dashboard-header">
      <h2 className="dashboard-greeting">{`${greeting}, ${firstName}!`}</h2>
      <p className="dashboard-subtitle">Here’s what’s happening with your finances today.</p>
    </div>
  );
}

export default Header;
