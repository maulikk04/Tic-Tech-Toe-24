import React, { useState } from 'react';

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  // Clear previous error message
    setSuccess(false);  // Reset success state
    setLoading(true); // Start loading when form is submitted

    try {
      // Make API call to send verification email
      const response = await fetch("http://localhost:4000/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Email verification successful
        setSuccess(true);
        console.log("Verification email sent:", data);
      } else {
        // Handle error
        setError(data.message || "Something went wrong!");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false); // Stop loading after request is finished
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('../utils/Images/bg_image.jpeg')] bg-cover font-chalk text-white">
      <div className="w-full max-w-md p-8 shadow-lg border-l-[25px] border-r-[25px] border-t-[25px] border-b-[25px] border-t-[#61381a] border-b-[#61381a] border-l-[#744b2b] border-r-[#744b2b] backdrop-blur-3xl">
        <h2 className="text-center text-xl sm:text-3xl mb-8 mt-4 sm:mt-0 sm:mb-12">Forget Password</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>} {/* Display error */}
        {success && <p className="text-green-500 mb-4 text-center">Verification email sent successfully!</p>} {/* Display success message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <div className="relative">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="w-full bg-transparent border-none focus:outline-none text-center text-xl text-white"
                placeholder="Enter email"
                required
              />
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white opacity-100"></div> {/* Thinner line */}
            </div>
          </div>

          {/* Center the button */}
          <div className="flex justify-center w-full mt-12">
            <button
              type="submit"
              className="bg-green-500 hover:opacity-80 text-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
