import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import App from "./App.jsx";

import { ThemeProvider } from "./application/state/ThemeContext";
import { StoreProvider } from "./application/state/StoreContext";
import { SidebarProvider } from "./application/state/SidebarContext";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
library.add(faSun, faMoon);

import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Auth0Provider domain={import.meta.env.VITE_AUTH0_DOMAIN} clientId={import.meta.env.VITE_AUTH0_CLIENT_ID} authorizationParams={{ redirect_uri: window.location.origin }}>
        <StoreProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </StoreProvider>
      </Auth0Provider>
    </ThemeProvider>
  </StrictMode>
);

window.addEventListener("load", () => {
  document.body.style.visibility = "visible";
});
