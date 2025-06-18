// src/presentation/components/Profile/ProfileDetails/ProfileDetails.jsx
import { Card, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { useStore, useTheme, useUserRoles } from "../../../../application/utils/hooks";
import "./ProfileDetails.css";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../../../../application/constants/api";

const ProfileDetails = () => {
  const { user: authUser, isLoading, getAccessTokenSilently } = useAuth0();
  const { theme } = useTheme();
  const {
    state: { user: localUser },
    updateUser,
  } = useStore();
  const roles = useUserRoles();
  const isPremium = roles.includes("Premium");

  if (isLoading) return <div className="pd-loading">Loading…</div>;

  const subscription = isPremium ? "Premium" : "Standard";
  const handleUpgrade = async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      });

      const res = await axios.post(`${API_BASE_URL}/users/upgrade`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      updateUser(res.data); // update local store
      alert("🎉 Upgraded to Premium!");
    } catch (e) {
      console.error(e);
      alert("Failed to upgrade.");
    }

    // REfresh the page to reflect changes
    window.location.reload();
  };

  return (
    <Card className={`profile-card card ${theme}-mode`}>
      <div className="profile-avatar">
        <img src={authUser.picture} alt={authUser.name} />
      </div>
      <Card.Body className="profile-body">
        <h3 className="profile-name">{authUser.name}</h3>
        <p className="profile-email">{authUser.email}</p>
        <p className="profile-sub">
          Subscription: <strong>{subscription}</strong>
        </p>
        {subscription === "Standard" && (
          <Button variant="primary" onClick={handleUpgrade}>
            Upgrade to Premium
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProfileDetails;
