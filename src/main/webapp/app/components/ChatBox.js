import React, { useState, useEffect } from 'react';
import '../styles/chatbox.css'; // Import the CSS for styling

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExited, setIsExited] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (isExited) {
      setTimeout(() => setIsOpen(false), 300); // Delay the closing of chatbox to allow for animation
    } else {
      setIsOpen(true);
    }
  }, [isExited]);

  const toggleChat = () => {
    setIsExited(!isExited);
  };

  const handleQuestionClick = question => {
    const userMessage = { id: messages.length, text: question, sender: 'user' };
    setMessages([...messages, userMessage]);

    // Simulate a response
    setTimeout(() => {
      setMessages(msgs => [...msgs, { id: msgs.length, text: `Response to: ${question}`, sender: 'bot' }]);
    }, 500);
  };

  return (
    <div className={`chat-container ${isOpen ? '' : 'hidden'}`}>
      {isOpen && !isExited && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h2>FAQ's</h2>
            <button className="exit-button" onClick={toggleChat}>
              X
            </button>
          </div>
          <div className="chatbox-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbox-options">
            <button className="faq-button" onClick={() => handleQuestionClick('Where can I find the routing number?')}>
              Routing Number
            </button>
            <button className="faq-button" onClick={() => handleQuestionClick('Support')}>
              Contact Support
            </button>
            <button className="faq-button" onClick={() => handleQuestionClick('Is there a minimum balance required?')}>
              Minimum Balance
            </button>
            <button className="faq-button" onClick={() => handleQuestionClick('What are the bank fees?')}>
              Fees
            </button>
          </div>
        </div>
      )}
      {!isExited && (
        <button className="chat-icon" onClick={() => setIsExited(false)}>
          {/* Chat */}
        </button>
      )}
    </div>
  );
};

export default Chatbox;

//            //ANSWERS:
//Our routing number is #123456789.
//You can reach us directly at 800-302-1234 or via email MorganBank@zipcode.com
//Theres no minimum balance required.
