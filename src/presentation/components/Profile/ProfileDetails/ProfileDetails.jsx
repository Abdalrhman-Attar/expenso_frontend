import { Card, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { useStore, useTheme, useUserRoles } from "../../../../application/utils/hooks";
import "./ProfileDetails.css";

const ProfileDetails = () => {
  const { user, isLoading } = useAuth0();
  const { theme } = useTheme();
  const [{ user: localUser }] = useStore();
  const roles = useUserRoles();
  const isPremium = roles.includes("Premium");

  if (isLoading) return <div className="pd-loading">Loading…</div>;

  const subscription = isPremium ? "Premium" : "Standard";

  return (
    <Card className={`profile-card card ${theme}-mode`}>
      <div className="profile-avatar">
        <img src={user.picture} alt={user.name} />
      </div>
      <Card.Body className="profile-body">
        <h3 className="profile-name">{user.name}</h3>
        <p className="profile-email">{user.email}</p>
        <p className="profile-sub">
          Subscription: <strong>{subscription}</strong>
        </p>
        {subscription === "Standard" && (
          <Button variant="primary" onClick={() => {}}>
            Upgrade to Premium
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProfileDetails;
