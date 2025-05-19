import React, { useState, useEffect } from 'react';
import { sendMessageToLex } from '../aws-config';
import axios from 'axios';
import { createTasksTable } from '../graphql/mutations';
import config from '../../aws-exports-graphql';
import './Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get user from localStorage or session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message to the chat
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);

    try {
      // Send message to Lex bot using the helper function
      const lexResponse = await sendMessageToLex(
        userMessage,
        user.username || 'default-session'
      );

      console.log('Lex Response:', lexResponse);

      if (!lexResponse.messages || !lexResponse.messages[0]) {
        throw new Error('Invalid response from Lex bot');
      }

      // Process all messages from the bot
      lexResponse.messages.forEach(message => {
        if (message.contentType === 'PlainText') {
          // Check if the message contains EC2 instance information
          if (message.content.includes('Found') && message.content.includes('EC2 instances')) {
            // Split the message into parts
            const parts = message.content.split('\n');
            // First part is the summary
            setMessages(prev => [...prev, { sender: 'bot', text: parts[0] }]);
            // Second part contains instance details
            if (parts[1]) {
              setMessages(prev => [...prev, { 
                sender: 'bot', 
                text: parts[1],
                isInfo: true 
              }]);
            }
          } else {
            // Regular message
            setMessages(prev => [...prev, { sender: 'bot', text: message.content }]);
          }
        }
      });

      console.log('Messages for storage:', lexResponse.messages); // Debug log: check messages before storage

      // If there's additional data in the response, display it
      if (lexResponse.sessionState?.intent?.slots) {
        const slots = lexResponse.sessionState.intent.slots;
        const additionalInfo = Object.entries(slots)
          .filter(([, value]) => value !== null)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n');

        if (additionalInfo) {
          setMessages((prev) => [...prev, { 
            sender: 'bot', 
            text: `Additional Information:\n${additionalInfo}`,
            isInfo: true 
          }]);
        }
      }

      // If there's any other relevant data in the response, display it
      if (lexResponse.sessionState?.intent?.confirmationState === 'Confirmed') {
        setMessages((prev) => [...prev, { 
          sender: 'bot', 
          text: 'Action confirmed and will be executed.',
          isInfo: true 
        }]);
      }

      // Store the chat in TasksTable using axios
      const taskInput = {
        id: Date.now().toString(),
        intentName: lexResponse.sessionState.intent?.name || 'Unknown',
        timestamp: Math.floor(Date.now() / 1000),
        status: 'completed',
        details: JSON.stringify({
          userMessage,
          // Store just the content of bot messages as an array of strings
          botMessageContents: lexResponse.messages?.map(msg => msg.content) || [],
          intentName: lexResponse.sessionState.intent?.name,
          sessionState: lexResponse.sessionState,
          // Add EC2 instance info if present (this seems to be working)
          ec2Info: lexResponse.messages
            .filter(msg => msg.content.includes('Found') && msg.content.includes('EC2 instances'))
            .map(msg => msg.content)
            .join('\n')
        }),
        userId: user.username || 'default-user',
        message: userMessage,
      };

      try {
        await axios.post(config.API.GraphQL.endpoint, {
          query: createTasksTable,
          variables: { input: taskInput }
        }, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': config.API.GraphQL.apiKey
          }
        });
        console.log('Chat stored successfully');
      } catch (graphqlError) {
        console.error('Error storing chat in GraphQL:', graphqlError);
        // Don't throw here, as we still want to show the bot's response
      }
    } catch (error) {
      console.error('Error in sendMessage:', error);
      setMessages((prev) => [...prev, { 
        sender: 'error', 
        text: `Error: ${error.message || 'Error communicating with the bot.'}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat with AI Assistant</h2>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat; 