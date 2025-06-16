import { useState, useEffect } from "react";
import { Navbar as ReactNavbar, Nav, Container } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Navbar.css";
import ThemeToggle from "../../common/ThemeToggle/ThemeToggle";
import LanguageToggle from "../../common/LanguageToggle/LanguageToggle";
import { useAuth0 } from "@auth0/auth0-react";

import Button from "../../common/Button/Button";
const navItems = [
  { key: "features", id: "features" },
  { key: "howItWorks", id: "how-it-works" },
  { key: "pricing", id: "pricing" },
  { key: "contact", id: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(window.scrollY);
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY && y > 100);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <ReactNavbar expand="lg" fixed="top" className={`app-navbar ${scrolled ? "scrolled" : ""} ${hidden ? "hidden" : "visible"}`}>
      <Container fluid className="px-0">
        <div className="desktop-only">
          <LanguageToggle />
        </div>

        <div className="navbar-inner">
          <ReactNavbar.Brand onClick={() => scrollTo("hero")} className="navbar-brand-custom">
            {t("nav.brand", "Expenso 💸")}
          </ReactNavbar.Brand>

          <div className="mobile-only toggle-row">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          <ReactNavbar.Toggle aria-controls="landing-navbar-nav" className="custom-toggler" />

          <ReactNavbar.Collapse id="landing-navbar-nav">
            <Nav className="nav-center">
              {navItems.map(({ key, id }) => (
                <Nav.Link key={id} onClick={() => scrollTo(id)} className="nav-link-custom">
                  {t(`nav.${key}`)}
                </Nav.Link>
              ))}
            </Nav>

            <Nav className="nav-buttons">
              {!isLoading && isAuthenticated ? (
                <>
                  <Button as={RouterLink} to="/dashboard" variant="primary">
                    {t("nav.dashboard", "Dashboard")}
                  </Button>{" "}
                  <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} variant="secondary">
                    {t("nav.signout", "Sign Out")}
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => loginWithRedirect()} variant="secondary">
                    {t("nav.login")}
                  </Button>
                  <Button
                    onClick={() =>
                      loginWithRedirect({
                        authorizationParams: { screen_hint: "signup" },
                      })
                    }
                    variant="primary"
                  >
                    {t("nav.signup")}
                  </Button>
                </>
              )}
            </Nav>
          </ReactNavbar.Collapse>
        </div>

        <div className="desktop-only">
          <ThemeToggle />
        </div>
      </Container>
    </ReactNavbar>
  );
};

export default Navbar;
