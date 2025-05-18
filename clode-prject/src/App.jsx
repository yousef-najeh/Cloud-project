/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { lexClient, botId, botAliasId, localeId } from './aws-config'
import { RecognizeTextCommand } from "@aws-sdk/client-lex-runtime-v2"
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [sessionId, setSessionId] = useState(Date.now().toString())

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    // Add user message to chat
    const userMessage = { type: 'user', content: inputMessage }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    try {
      const command = new RecognizeTextCommand({
        botId,
        botAliasId,
        localeId,
        sessionId,
        text: inputMessage
      })

      const response = await lexClient.send(command)
      console.log('Lex Response:', response) // Debug log

      // Add bot response to chat
      if (response.messages && response.messages.length > 0) {
        const botMessage = { type: 'bot', content: response.messages[0].content }
        setMessages(prev => [...prev, botMessage])
      } else if (response.interpretations && response.interpretations.length > 0) {
        // Fallback to interpretations if messages are not available
        const botMessage = { type: 'bot', content: response.interpretations[0].intent?.slots?.message?.value || 'No response from bot' }
        setMessages(prev => [...prev, botMessage])
      } else {
        setMessages(prev => [...prev, { type: 'error', content: 'No response received from bot.' }])
      }
    } catch (error) {
      console.error('Error sending message to Lex:', error)
      setMessages(prev => [...prev, { type: 'error', content: 'Sorry, there was an error processing your message.' }])
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default App
