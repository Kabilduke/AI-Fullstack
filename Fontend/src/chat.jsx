import React, { useState, useEffect } from 'react';
import './index.css'; 

const Chat = ({ category, setShowForm }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [messages, setMessages] = useState([
    { type: 'incoming', text: 'Hi, Thank you for choosing our service, Please choose a category' },
  ]);
  const [userMessage, setUserMessage] = useState('');

  useEffect(() => {
    if (category) {
      setMessages([{ type: 'incoming', text: `Hi, thank you for choosing our service. You have selected ${category} service.` }]);
    }
  }, [category]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      console.log(category);
      console.log(userMessage);

      if (userMessage.toLowerCase() === "thank you" || userMessage.toLowerCase() === "service form") {
        setShowForm(true); // This will trigger the form to display in the App.jsx
        setMessages([...messages, { type: 'incoming', text: 'Thank you! Please fill out the form to proceed.' }]);
      }

      setMessages([...messages, { type: 'outgoing', text: userMessage }]);

      try {
        const response = await fetch('http://127.0.0.1:8000/openai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Category: category,
            user_Message: userMessage
          })
        });

        const data = await response.json();
        setMessages([...messages, { type: 'outgoing', text: userMessage }, { type: 'incoming', text: data.response }]);
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setUserMessage(''); 
    }
  };

  return (
    <div>
      {/* Chat toggle button */}
      <button className='chat-toggler' onClick={toggleChat}>
        <span className='material-symbols-outlined'>
          {isOpen ? 'close' : 'mode_comment'}
        </span>
      </button>

      {/* Chatbox window */}
      {isOpen && (
        <div className='chatbot'>
          <header>
            <h3>AI-Chatbot</h3>
            <span className='material-symbols-outlined' onClick={toggleChat}>close</span>
          </header>

          <ul className='chatbox'>
            {messages.map((message, index) => (
              <li key={index} className={`chat ${message.type}`}>
                {message.type === 'incoming' && (
                  <span className='material-symbols-outlined'>smart_toy</span>
                )}
                <p>{message.text}</p>
              </li>
            ))}
          </ul>

          <div className='chat-input'>
            <textarea 
              id='user_message'
              placeholder='Enter your message...'
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              required
            />
            <span
              id='send-button' 
              className='material-symbols-outlined'
              onClick={handleSendMessage}
            >
              send
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
