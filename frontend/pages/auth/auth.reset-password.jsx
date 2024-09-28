import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // to access token

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Sending the new password along with the reset token to the backend
    try {
      console.log(token)
      const response = await fetch(`http://localhost:4000/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        navigate('/auth/login');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('../utils/Images/bg_image.jpeg')] bg-cover font-chalk text-white">
      <div className="max-w-xl p-8 shadow-lg border-l-[25px] border-r-[25px] border-t-[25px] border-b-[25px] border-t-[#61381a] border-b-[#61381a] border-l-[#744b2b] border-r-[#744b2b] backdrop-blur-3xl">
        <h2 className="text-center text-xl sm:text-3xl mb-8 mt-4 sm:mt-0 sm:mb-8">Reset Password</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">Password reset successfully!</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border-b-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-300 text-center text-xl"
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="mb-8">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border-b-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-300 text-center text-xl"
              placeholder="Confirm new password"
              required
            />
          </div>

          {/* Center the button */}
          <div className="flex justify-center w-full mt-12">
            <button
              type="submit"
              className="bg-green-500 hover:opacity-80 text-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
