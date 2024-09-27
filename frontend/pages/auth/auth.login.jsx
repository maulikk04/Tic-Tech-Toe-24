import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    if (!email || !password) {
      setError('All fields are required');
      return; 
    }

    setLoading(true);  

    try {
      const response = await axios.post(`${import.meta.env.VITE_HOST_NAME}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Login successful', response.data);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-black bg-cover flex items-center justify-center">
      <div className="bg-blackboard border-[20px] border-x-[#744b2b] border-y-[#61381a] p-6 sm:p-8 w-full max-w-lg sm:max-w-xl text-white font-chalk relative">
        <span className="absolute right-2 top-0 text-emerald-500 text-md sm:text-lg border-b-2 border-l-2 pl-2 pb-1">sign up</span>
        <h1 className="text-center text-xl sm:text-3xl mb-8 mt-4 sm:mt-0 sm:mb-12">Welcome to TeachEase!</h1>
        <form className="text-center space-y-6 sm:space-y-8">

          <div className="flex flex-col sm:flex-row">
            <label className="text-sm sm:text-lg md:text-xl mr-0 sm:mr-3 w-1/4 sm:w-1/4 text-left mb-2 sm:mb-0">E-mail:</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full sm:w-3/4 text-base sm:text-xl bg-transparent border-b-2 border-white placeholder-gray-400 text-center text-white outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center">
            <label className="text-sm sm:text-lg md:text-xl mr-0 sm:mr-3 w-full sm:w-1/4 text-left mb-2 sm:mb-0">Password:</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full sm:w-3/4 text-base sm:text-xl bg-transparent border-b-2 border-white placeholder-gray-400 text-center text-white outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="mt-4 sm:mt-8">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading} 
              className={`bg-green-400 text-black font-bold py-2 px-8 sm:px-12 rounded-lg hover:bg-green-500 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>

          <div className="flex justify-center items-center mt-6">
            <span className="w-1/4 border-t border-white"></span>
            <p className="mx-2 sm:mx-4 text-sm sm:text-xl">or</p>
            <span className="w-1/4 border-t border-white"></span>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => {navigate('/auth/google')}}
              className="bg-white text-black font-bold py-2 px-6 sm:px-8 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 transition duration-300"
            >
              <img
                src="../Utils/Images/search.png"
                alt="Google Logo"
                className="w-4 sm:w-6 h-4 sm:h-6"
              />
              <span className="text-sm sm:text-base">Login with Google</span>
            </button>
          </div>

          <div className="text-xs sm:text-sm flex justify-center mt-4">
            <a
              onClick={() => {navigate('/auth/forget-password')}} 
              className="font-medium text-blue-500 hover:text-blue-400 cursor-pointer"
            >
              Forgot Password?
            </a>
          </div>

          <img
            src="../Utils/Images/duster.png"
            alt="Duster Image"
            className="w-28 sm:w-40 absolute right-0 bottom-[0px] sm:bottom-[-20px] rotate-[44deg]"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
