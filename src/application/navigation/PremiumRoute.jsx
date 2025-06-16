import { Navigate } from "react-router-dom";
import { useUserRoles } from "../utils/hooks";

const PremiumRoute = ({ children }) => {
  const roles = useUserRoles();
  const isPremium = roles.includes("Premium");

  if (!isPremium) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default PremiumRoute;
