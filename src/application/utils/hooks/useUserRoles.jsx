import { useAuth0 } from "@auth0/auth0-react";

export function useUserRoles() {
  const { user } = useAuth0();

  return user?.[import.meta.env.VITE_ROLES_CLAIM] || [];
}
