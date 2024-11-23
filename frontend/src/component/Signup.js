import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ setToken }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success === true) {
      localStorage.setItem("token", data.authToken);
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      setToken(data.authToken);
      navigate("/userlist");
    }
  };

  return (
    <div className="max-w-md mx-auto relative flex flex-col p-4 rounded-md text-black bg-white shadow-md mt-28">
      <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
        Create your <span className="text-[#7747ff]">App</span> account
      </div>
      <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
        Sign up to get started
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="relative">
          <label
            htmlFor="name"
            className="block text-gray-600 text-sm leading-[140%] font-normal mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] h-11 p-[11px] focus:ring-2 focus:ring-[#7747ff] ring-offset-2 outline-0"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Field */}
        <div className="relative">
          <label
            htmlFor="email"
            className="block text-gray-600 text-sm leading-[140%] font-normal mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] h-11 p-[11px] focus:ring-2 focus:ring-[#7747ff] ring-offset-2 outline-0"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-gray-600 text-sm leading-[140%] font-normal mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] h-11 p-[11px] focus:ring-2 focus:ring-[#7747ff] ring-offset-2 outline-0"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className="relative">
          <label
            htmlFor="cPassword"
            className="block text-gray-600 text-sm leading-[140%] font-normal mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="cPassword"
            name="cPassword"
            value={formData.cPassword}
            onChange={handleChange}
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] h-11 p-[11px] focus:ring-2 focus:ring-[#7747ff] ring-offset-2 outline-0"
            placeholder="Confirm your password"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#7747ff] w-full py-2 rounded text-white text-sm font-normal hover:bg-[#5d36d1] transition"
        >
          Submit
        </button>
      </form>

      {/* Login Link */}
      <div className="text-sm text-center mt-6">
        Already have an account?{" "}
        <Link to={'/login'} className="text-sm text-[#7747ff] hover:underline">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default Signup;
