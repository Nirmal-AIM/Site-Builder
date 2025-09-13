import { motion } from 'framer-motion';
import { BookOpen, Target, Trophy, Users, Zap, Brain } from 'lucide-react';
import './WelcomePage.css';

const WelcomePage = ({ onLogin, onSignup }) => {
  const features = [
    { icon: BookOpen, text: "Interactive Learning Paths" },
    { icon: Target, text: "Skill-Based Progression" },
    { icon: Trophy, text: "Achievement System" },
    { icon: Users, text: "Community Challenges" },
    { icon: Zap, text: "Real-time Feedback" },
    { icon: Brain, text: "AI Mentorship" }
  ];

  return (
    <div className="welcome-container">
      <div className="welcome-background">
        <div className="floating-shapes">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`shape shape-${i + 1}`}></div>
          ))}
        </div>
      </div>

      <div className="welcome-content">
        <motion.div 
          className="hero-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="logo-section">
            <motion.div 
              className="main-logo"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <div className="skill-tree-logo">
                <div className="tree-node main-node"></div>
                <div className="tree-node branch-node-1"></div>
                <div className="tree-node branch-node-2"></div>
                <div className="tree-node branch-node-3"></div>
                <div className="tree-connection conn-1"></div>
                <div className="tree-connection conn-2"></div>
                <div className="tree-connection conn-3"></div>
              </div>
            </motion.div>
          </div>

          <motion.h1 
            className="welcome-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Learn by Building
          </motion.h1>

          <motion.p 
            className="welcome-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            A gamified platform with skill trees, levels, rewards, and AI mentorship.
          </motion.p>

          <motion.div 
            className="features-grid"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <feature.icon className="feature-icon" />
                <span className="feature-text">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="cta-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <motion.button 
              className="cta-button primary"
              onClick={onSignup}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
            </motion.button>
            
            <motion.button 
              className="cta-button secondary"
              onClick={onLogin}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Already Learning? Login
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;