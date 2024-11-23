import React, { useEffect } from 'react';
import ChatList from './ChatList';
import { useNavigate } from 'react-router-dom';

const ChatContainer = ({ chat, socket, fetchChatList }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("token")) {
      navigate('/landing');
    }
  },[])

  return (
    <div className='chat-container py-10'>
      <ChatList chat={chat} socket={socket} fetchChatList={fetchChatList} />
    </div>
  );
};

export default ChatContainer;
