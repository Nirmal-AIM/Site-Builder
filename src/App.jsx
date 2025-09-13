import { useState } from 'react'
import LoadingAnimation from './components/LoadingAnimation'
import WelcomePage from './components/WelcomePage'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState('welcome')

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const handleLogin = () => {
    console.log('Login clicked')
    // TODO: Implement login functionality
  }

  const handleSignup = () => {
    console.log('Signup clicked')
    // TODO: Implement signup functionality
  }

  if (isLoading) {
    return <LoadingAnimation onComplete={handleLoadingComplete} />
  }

  return (
    <div className="app">
      {currentPage === 'welcome' && (
        <WelcomePage onLogin={handleLogin} onSignup={handleSignup} />
      )}
    </div>
  )
}

export default App
