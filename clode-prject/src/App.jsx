import React, { useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import './App.css'; // Import the new CSS file

function App({ signOut, user }) {
  useEffect(() => {
    // Store user information in localStorage
    if (user) {
      localStorage.setItem('user', JSON.stringify({
        username: user.username,
        email: user.attributes?.email
      }));
    }
  }, [user]);

  const displayName = user?.attributes?.email || user?.username || 'User';

  return (
    <Router>
      <div className="app-header"> {/* Apply the header class */}
        <h1 className="welcome-message">Welcome {displayName} 👋</h1> {/* Apply welcome message class */}
        <button 
          onClick={signOut} 
          className="sign-out-button"
        >
          Sign Out
        </button>
      </div>
      {/* Chat component is now below the header */}
      <div className="chat-area">
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/" element={<Navigate to="/chat" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default withAuthenticator(App);
