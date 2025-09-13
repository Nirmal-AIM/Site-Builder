import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FrontendSection from "@/components/FrontendSection";
import BackendSection from "@/components/BackendSection";
import DatabaseSection from "@/components/DatabaseSection";
import GamifiedLearningSection from "@/components/GamifiedLearningSection";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import SignupModal from "@/components/SignupModal";

type Section = "home" | "frontend" | "backend" | "database" | "learn";

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>("home");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const renderSection = () => {
    switch (currentSection) {
      case "frontend":
        return <FrontendSection />;
      case "backend":
        return <BackendSection />;
      case "database":
        return <DatabaseSection />;
      case "learn":
        return <GamifiedLearningSection />;
      default:
        return <HeroSection onSectionChange={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header 
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        onShowLogin={() => setShowLoginModal(true)}
        onShowSignup={() => setShowSignupModal(true)}
      />
      
      <main className="min-h-screen">
        {renderSection()}
      </main>

      <Footer />

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
      />

      <SignupModal 
        isOpen={showSignupModal} 
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
      />
    </div>
  );
}
