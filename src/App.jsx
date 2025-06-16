import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import Routes from "./application/navigation/routes/Routes.jsx";
import { useLocalStorage } from "./application/utils/hooks";

function App() {
  const [savedLanguage] = useLocalStorage("i18nextLng", "en");

  useEffect(() => {
    document.documentElement.lang = savedLanguage;
    document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
  }, [savedLanguage]);

  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
