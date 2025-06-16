import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAsia, faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import "./LanguageToggle.css";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "../../../../application/utils/hooks";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [storedLang, setStoredLang] = useLocalStorage("i18nextLng", i18n.language || "en");

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.setAttribute("lang", lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    setStoredLang(lng);
  };

  const toggleLanguage = () => {
    const current = i18n.language || storedLang;
    const next = current === "en" ? "ar" : "en";
    changeLang(next);
  };

  const current = i18n.language || storedLang;

  return (
    <button className="language-toggle-btn" onClick={toggleLanguage} aria-label="Toggle Language">
      <div className={`icon-wrapper ${current}`}>
        <FontAwesomeIcon icon={current === "en" ? faGlobeAmericas : faGlobeAsia} />
      </div>
    </button>
  );
};

export default LanguageToggle;
