import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useNavigate , useLocation} from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const errorMsg = searchParams.get('error');
    if (errorMsg) {
      setError(errorMsg);
    }
  }, [location.search]);

  useEffect(() => {
    navigate('/auth/login');
  }, []);

  const handleOauth = async (e) => {
    e.preventDefault();
  
    try {
      const redirectUrl = `${import.meta.env.VITE_HOST_NAME}/auth/google`;
      if (!import.meta.env.VITE_HOST_NAME) {
        throw new Error("OAuth host name is not defined. Please check your environment variables.");
      }

      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Error during OAuth redirection:", error.message);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false); 
    }
  };
  

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
    <div className="min-h-screen bg-[url('../utils/Images/bg_image.jpeg')] bg-cover flex items-center justify-center">
      <div className="backdrop-blur-3xl border-[20px] border-x-[#744b2b] border-y-[#61381a] p-6 sm:p-8 w-full max-w-md sm:max-w-md text-white font-chalk relative">
        <span onClick={() => {navigate('/auth/signup')}} className="absolute right-2 top-0 text-emerald-500 text-md sm:text-lg border-b-2 border-l-2 pl-2 pb-1 cursor-pointer">sign up</span>
        <h1 className="text-center text-xl sm:text-3xl mb-8 mt-4 sm:mt-0 sm:mb-12">Welcome Back!</h1>
        <form className="text-center space-y-6 sm:space-y-8">

          <div className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full text-base sm:text-xl bg-transparent border-b-2 border-white placeholder-gray-400 text-center text-white outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center">
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full text-base sm:text-xl bg-transparent border-b-2 border-white placeholder-gray-400 text-center text-white outline-none"
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
              onClick={handleOauth}
              disabled={loading} 
              className="bg-white text-black font-bold py-2 px-6 sm:px-8 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 transition duration-300"
            >
              <img
                src="../Utils/Images/search.png"
                alt="Google Logo"
                className="w-4 sm:w-6 h-4 sm:h-6"
              />
              <span className="text-sm sm:text-base">{loading ? 'Loading...' : 'Login with Google'}</span>
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
            className="w-20 sm:w-32 absolute right-0 bottom-[0px] sm:bottom-[-20px] rotate-[44deg]"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
