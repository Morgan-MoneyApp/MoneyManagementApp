import React from 'react';
import '../styles/JChatBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faComments } from '@fortawesome/free-solid-svg-icons';

function Chatbox() {
  // alert("Chatbox should be loaded")
  return (
    <div>
      <input type="checkbox" id="click" />
      <label htmlFor="click">
        <FontAwesomeIcon icon={faTimes} />
        <FontAwesomeIcon icon={faComments} />
      </label>
      <div className="wrapper">
        <div className="head-text">Chat with us - Online</div>
        <div className="chat-box">
          <div className="desc-text">Please provide us with these details so we may assist you better.</div>

          <form action="#">
            <div className="field">
              <input type="text" placeholder="Your Name" />
            </div>
            <div className="field">
              <input type="text" placeholder="Email Address" />
            </div>
            <div className="field">
              <button type="submit">Start Chat</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
