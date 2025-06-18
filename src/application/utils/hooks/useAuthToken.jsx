import { useAuth0 } from "@auth0/auth0-react";

export function useAuthToken() {
  const { getAccessTokenSilently } = useAuth0();
  return async function getAccessToken() {
    try {
      return await getAccessTokenSilently({
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      });
    } catch {
      return null;
    }
  };
}
