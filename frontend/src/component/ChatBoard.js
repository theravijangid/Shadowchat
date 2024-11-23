import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Messages from "./Messages";
import notificationSound from '../sounds/sound1.mp3';

const ChatBoard = ({socket}) => {

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsersList();
  }, []);

  const fetchUsersList = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/userlist`);
    const data = await response.json();
    setUsers(data);
  };

  const handleUserClick = async (user) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/chat/createChat`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender_id: user._id,
        receiver_id: JSON.parse(localStorage.getItem('loggedInUser'))._id,
      }),
    });
    const data = await response.json();
    navigate(`/chat/${data._id}`);
  };



  const { chatId } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherParticipant, setOtherParticipant] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    // chat desc
    if (socket && chatId) {

      // If there's already a room, leave it before joining the new one
      if (currentRoom) {
        socket.emit('leaveRoom', currentRoom);
      }

      // Join the room
      socket.emit('joinRoom', chatId);

      // Fetch previous messages
      socket.on('previousMessages', (msgs) => {
        setMessages(msgs);
      });

      // Request chat user details when joining the room
      socket.emit('fetchChatUser', chatId);

      // Listen for the chat user response
      socket.on('chatUserResponse', (data) => {
        setSelectedUser(data);
      });

      // Listen for new messages
      socket.on('receiveMessage', (msg) => {
        setMessages((prev) => [...prev, msg]);

        // Check if the message is from another user
        const loggedInUserId = JSON.parse(localStorage.getItem("loggedInUser"))._id;
        if (msg.sender_id._id !== loggedInUserId) {
          new Audio(notificationSound).play();
        }
      });
    }
    

    return () => {
      if (socket) {
        socket.emit('leaveRoom', chatId);
        socket.off('previousMessages');
        socket.off('chatUserResponse');
        socket.off('receiveMessage');
      }
    };
  }, [socket, chatId]);

  useEffect(() => {
    if (selectedUser) {
      const userId = JSON.parse(localStorage.getItem('loggedInUser'))._id;

      const selectedParticipant = selectedUser.participants.find(
        (participant) => participant._id !== userId
      );
      setOtherParticipant(selectedParticipant);
    }
  }, [selectedUser]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
    const loggedInUserId = JSON.parse(localStorage.getItem("loggedInUser"))._id;
    if (socket && newMessage) {
      socket.emit('sendMessage', { chatId, newMessage, loggedInUserId });
      setNewMessage("");
    }
  };

  // console.log("users ", users)
  // const lastMessage = messages.at(-1);
  // let createAt = new Date(lastMessage.created_at).toTimeString().slice(0, 5)
  return (
    <div  className="flex h-screen pt-16">
    
      {/* Sidebar */}
      <aside className="w-1/4  border-r p-4 overflow-y-auto">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-800">Chats</h1>
          <div className="mt-2 flex items-center">
            <input
              type="text"
              placeholder="Search or start a new chat"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Chat List */}
        <ul className="space-y-2">
          {users.map((user) => {
            if (
              JSON.parse(localStorage.getItem("loggedInUser"))._id !== user._id
            ) {
              return (
                <li
                  key={user._id}
                  onClick={() => handleUserClick(user)}
                  className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-blue-100"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    {/* User Profile Picture */}
                    <img
                      src={user.profileImage || `https://api.dicebear.com/5.x/initials/svg?seed=${user.name}`}
                      alt="Profile"
                      className="rounded-full w-12 h-12"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="font-medium text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-500 truncate">
                      {user.lastMessage || "Say hi "}
                    </p>
                  </div>
                  {/* <div className="text-sm text-gray-400">{createAt || "Now"}</div> */}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </aside>
    
    <div className="chatboard-container px-4 pb-3">
      <h2 className=" -mt-6 ">
        Chat with{" "}
        {otherParticipant !== null ? otherParticipant.name : "Loading..."}
      </h2>
      <Messages messages={messages} />
      <div className="message-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
    </div>
  );
};

export default ChatBoard;
