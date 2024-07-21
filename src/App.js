import React, {useState, useEffect} from 'react'; 
import { Provider } from 'react-redux';
import store from './OpenAI-API-Files/store.js';
import LandingPage from './LandingPage.js';
import ChatPage from './ChatPage.js';
import './App.css';

function App() {

  const [showChat, setShowChat] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {

    // Check if there's an existing chat session
    const savedSessionId = localStorage.getItem('chatSessionId');
    if (savedSessionId) {
      setSessionId(savedSessionId);
      setShowChat(true);
    }
  }, []);

  const handleStartChat = () => {
    // Generate a new session ID and save it
    const newSessionId = Date.now().toString();
    setSessionId(newSessionId);
    localStorage.setItem('chatSessionId', newSessionId);
    setShowChat(true);
  };

  const handleEndChat = () => {
    // Clear the session ID and remove it from storage
    setSessionId(null);
    localStorage.removeItem('chatSessionId');
    setShowChat(false);
  };

  return (
    <Provider store={store}>
      <div className="App">

        {showChat ? (
          <ChatPage onEndChat={handleEndChat} sessionId={sessionId} />
        ) : (
          <LandingPage onStartChat={handleStartChat} />
        )}

      </div>
    </Provider>
  );
}

export default App;
