import { useState, useEffect } from 'react';
import './LoadingAnimation.css';

const LoadingAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="logo-container">
          <div className="animated-logo">
            <div className="skill-tree-icon">
              <div className="node"></div>
              <div className="node"></div>
              <div className="node"></div>
              <div className="connection"></div>
              <div className="connection vertical"></div>
            </div>
          </div>
        </div>
        
        <h2 className="loading-title">Learn by Building</h2>
        <p className="loading-subtitle">Preparing your learning journey...</p>
        
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="progress-text">{progress}%</div>
      </div>
    </div>
  );
};

export default LoadingAnimation;