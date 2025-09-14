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
import PromptCard from "@/components/PromptCard";
import PromptsSection from "@/components/PromptsSection";

type Section = "home" | "frontend" | "backend" | "database" | "learn" | "prompts";

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>("home");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // --- Prompt code snippets and handlers ---
  const htmlCode = `<!DOCTYPE html>
<html>
<head>
  <title>HTML Tutorial</title>
</head>
<body>
  <h1>This is a heading</h1>
  <p>This is a paragraph.</p>
</body>
</html>`;

  const reactCode = `import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <p>Welcome to React</p>
    </div>
  );
}

export default App;`;

  const nodeCode = `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`;

  const pythonCode = `from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)`;

  const handleLearnClick = (title: string) => {
    console.log(`Learn ${title} clicked`);
  };

  const handleVideoClick = (title: string) => {
    console.log(`Video Tutorial for ${title} clicked`);
  };

  const handleReferenceClick = (title: string) => {
    console.log(`${title} Reference clicked`);
  };

  const handleCertifiedClick = (title: string) => {
    console.log(`Get Certified in ${title} clicked`);
  };

  const handleTryClick = (title: string) => {
    console.log(`Try ${title} Yourself clicked`);
  };
  // --- End handlers and code snippets ---

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
      case "prompts":
        return <PromptsSection />; // Show PromptsSection on /prompts
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

        {currentSection === "home" && (
          <PromptsSection /> // Show PromptsSection on home page too
        )}
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
