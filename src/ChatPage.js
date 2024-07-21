import { useDispatch, useSelector } from 'react-redux';
import { addUserMessage, sendMessage } from './OpenAI-API-Files/chatSlice.js';
import React, { useEffect, useState } from 'react';
import './ChatPage.css';
import { Container, Typography, Box} from '@mui/material';
import BarChart from './Components/BarChart.js';

const ChatPage = ({ onEndChat, sessionId }) => {
  const [inputValue, setInputValue] = useState('');
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  const [chatHistory, setChatHistory] = useState([
    { day: 'Monday', date: '01', month: 'July', year: '2024', messages: 10 },
    { day: 'Tuesday', date: '09', month: 'July', year: '2024', messages: 25 },
    // Initial data
  ]);

  useEffect(() => {
    // Fetch the chat messages for the current session from localStorage
    const savedMessages = JSON.parse(localStorage.getItem(`messages_${sessionId}`)) || [];
    sendMessage(savedMessages);
  }, [sessionId]);

  const handleSendMessage = () => {
    // Add the new message to the current session and save it
    const newMessages = [...messages, { text: inputValue, user: true }];
    sendMessage(newMessages);
    localStorage.setItem(`messages_${sessionId}`, JSON.stringify(newMessages));
    if (inputValue.trim() !== '') {
      dispatch(addUserMessage(inputValue));
      dispatch(sendMessage(inputValue));
      setInputValue('');
    }

    //Saves today's chat history 
    const newChatHistory = [...chatHistory];
    const today = new Date();
    const lastEntry = newChatHistory[newChatHistory.length - 1];

    if (
      lastEntry &&
      lastEntry.date === today.getDate().toString() &&
      lastEntry.month === today.toLocaleString('default', { month: 'long' }) &&
      lastEntry.year === today.getFullYear().toString()
    ) {
      lastEntry.messages += 1;
    } else {
      newChatHistory.push({
        day: today.toLocaleString('default', { weekday: 'long' }),
        date: today.getDate().toString(),
        month: today.toLocaleString('default', { month: 'long' }),
        year: today.getFullYear().toString(),
        messages: 1,
      });
    }

    setChatHistory(newChatHistory);
  };

  //Adds today's number of messages to bar chart 
  const formatDataForChart = () => {
    return chatHistory.map(chat => ({
      chat: `${chat.day} ${chat.date} ${chat.month} ${chat.year}`,
      messages: chat.messages,
    }));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Number of Messages in Different Chats
      </Typography>
      <Box sx={{ width: '100%', height: 400 }}>
        <BarChart data={formatDataForChart()} />
      </Box>

      <div className="chat-page">
        <h1>Start Chatting!</h1>
        <div className='chat-box'>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.user ? 'user-message' : ''}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

        </div>

        <input
          id="message-input"
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button id='send-button' onClick={handleSendMessage}>Send</button>
        <button id='end-button' onClick={onEndChat}>End Chat</button>
      </div>
    </Container>
  );
};

export default ChatPage;

