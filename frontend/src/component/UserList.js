// UserList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/Chat App Logo.png"
import { MdLockOutline } from "react-icons/md";

const UserList = () => {
  // Hardcoded user data

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

  return (
    <div className="flex h-screen pt-16">
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
                      {user.lastMessage || "Say hi to your contact!"}
                    </p>
                  </div>
                  {/* <div className="text-sm text-gray-400">{user.lastSeen || "Now"}</div> */}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </aside>

      {/* Main Chat Section */}
      <div className="bg-gray-100 w-full h-full flex flex-col">
          <div className="flex justify-center h-full items-center flex-col ">
            <img
              src={logo}
              className="w-[100px]"
            />
            <p className="font-mono font-semibold mt-4 text-xl">Welcome to Shadow Chat</p>
            <p className="font-serif mt-1">Send and Receive Chat anonymously, anytime.</p>
            
          </div>
          <div className="flex justify-center pb-8 items-center gap-4">
            <MdLockOutline />
            <p>End to end Encrypted</p>
            </div>
      </div>
      
    </div>
  );
};

export default UserList;
