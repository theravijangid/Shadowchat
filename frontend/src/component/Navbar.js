// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/Chat App Logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="flex items-center gap-2">
      <img className="logo" src={logo} />
      <p className="text-white text-2xl font-mono font-bold">Shadow Chat</p>
      </div>
      
      <div>
        <ul>
        <li>
          <Link to="/">Home</Link>
          </li>
          <li>
          <Link to="/contactus">Contact Us</Link>
          </li>
          <li>
          <Link to="/about  ">About Us</Link>
          </li>
          
        </ul>
      </div>
      <ul className="flex items-center">
        
        {localStorage.getItem("token") ?<ul className="flex items-center">
          <li>
          <Link to="/userlist">Users</Link>
        </li>
        {/* <li>
          <Link to="/">Chats</Link>
        </li>  */}
         <li onClick={handleLogout}>
        <Link to="/signup" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#2884e6] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Logout</span>
          </Link>
        </li>
        </ul>: <>
        {/* <li><Link to="/login">Login</Link></li> */}
        {/* <li><Link to="/signup">Signup</Link></li> */}
        <li className="flex gap-2">
          <Link to="/signup" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#2884e6] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Sign up</span>
          </Link>
          <Link to="/login" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7edf3] text-[#0e141b] text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Log in</span>
          </Link>
        </li>
        </>}
      </ul>
    </nav>
  );
};

export default Navbar;
