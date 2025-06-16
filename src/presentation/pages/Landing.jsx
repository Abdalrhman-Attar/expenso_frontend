import Navbar from "../components/Landing/Navbar/Navbar";
import CallToActionSection from "../components/Landing/CallToActionSection/CallToActionSection.jsx";
import PricingSection from "../components/Landing/PricingSection/PricingSection.jsx";
import HowItWorksSection from "../components/Landing/HowItWorksSection/HowItWorksSection.jsx";
import FeaturesSection from "../components/Landing/FeaturesSection/FeaturesSection.jsx";
import HeroSection from "../components/Landing/HeroSection/HeroSection.jsx";

const Landing = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <CallToActionSection />
    </>
  );
};

export default Landing;
