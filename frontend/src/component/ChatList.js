import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatList = ({ chat, socket, fetchChatList }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (socket) {
      const userId = loggedInUser._id;

      socket.emit("registerUser", userId);

      socket.on("updateChatList", () => {
        fetchChatList(); // Fetch chat list whenever a new message is received
      });

      return () => {
        socket.emit('leaveUserRoom', userId);
      };
    }
  }, []);

  const handleChatClick = (chatItem) => {
    navigate(`/chat/${chatItem._id}`); // Navigate to the chat route based on chat ID
  };

  return (
    <div className="chatlist-container">
      <h2>Chats</h2>
      <ul>
        {chat.map((chatItem) => {
          const otherParticipant = chatItem.participants.find(
            (participant) =>
              participant._id !==
              JSON.parse(localStorage.getItem("loggedInUser"))._id
          );
          return (
            <li key={chatItem._id} onClick={() => handleChatClick(chatItem)}>
              {otherParticipant ? otherParticipant.name : "Unknown User"}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatList;
