import React, {useEffect,useRef} from 'react'

const Messages = ({messages}) => {

  // Ref to access the end of messages container
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender_id._id === JSON.parse(localStorage.getItem('loggedInUser'))._id ? 'my-message' : 'friend-message'}`}
          >
            {message.content}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Reference to keep track of last message */}
      </div>
  )
}

export default Messages
