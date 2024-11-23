import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log("form data ", formData)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.success === true) {
      localStorage.setItem('token', data.authToken);
      localStorage.setItem('loggedInUser', JSON.stringify(data.user));
      setToken(data.authToken);
      navigate('/userlist');
    }
  };

  return (
    <div className="max-w-md mx-auto relative flex flex-col p-4 rounded-md text-black bg-white shadow-md mt-28">
      <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
        Welcome back to <span className="text-[#7747ff]">App</span>
      </div>
      <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
        Log in to your account
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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

        {/* Forgot Password */}
        <div>
          <a className="text-sm text-[#7747ff] hover:underline" href="#">
            Forgot your password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#7747ff] w-full py-2 rounded text-white text-sm font-normal hover:bg-[#5d36d1] transition"
        >
          Submit
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="text-sm text-center mt-6">
        Don’t have an account yet?{' '}
        <Link to={'/signup'} className="text-sm text-[#7747ff] hover:underline" >
          Sign up for free!
        </Link>
      </div>
    </div>
  );
};

export default Login;
