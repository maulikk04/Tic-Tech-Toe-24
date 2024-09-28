import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    institute: "",
  });

  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(""); // Add error state
  const [success, setSuccess] = useState(false); // Add success state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  // Clear previous error message
    setSuccess(false);  // Reset success state
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true); // Start loading when form is submitted

    // Send form data to the API
    try {
      const response = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          institute: formData.institute,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        setSuccess(true);
        console.log("Signup successful:", data);
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
    <div className="bg-[url('../utils/Images/bg_image.jpeg')] bg-cover min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-8 shadow-lg border-l-[25px] border-r-[25px] border-t-[25px] border-b-[25px] border-t-[#61381a] border-b-[#61381a] border-l-[#744b2b] border-r-[#744b2b] backdrop-blur-3xl relative font-chalk">
        <h2 className="text-center text-xl sm:text-3xl mb-8 mt-4 sm:mt-0 sm:mb-12 text-white">Sign Up</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>} {/* Display error */}
        {success && <p className="text-green-500 mb-4 text-center">Signup successful!</p>} {/* Display success message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-transparent border-none focus:outline-none text-center text-xl text-white"
                placeholder="Enter username"
                required
              />
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white opacity-100"></div> {/* Thinner line */}
            </div>
          </div>

          <div className="mb-8">
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-none focus:outline-none text-center text-xl text-white"
                placeholder="Enter email"
                required
              />
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white opacity-100"></div> {/* Thinner line */}
            </div>
          </div>

          <div className="mb-8">
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent border-none focus:outline-none text-center text-xl text-white"
                placeholder="Enter Password"
                required
              />
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white opacity-100"></div> {/* Thinner line */}
            </div>
          </div>

          <div className="mb-8">
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-transparent border-none focus:outline-none text-center text-xl text-white"
                placeholder="Confirm Password"
                required
              />
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white opacity-100"></div> {/* Thinner line */}
            </div>
          </div>

          <div className="mb-10">
            <div className="relative">
              <input
                type="text"
                name="institute"
                value={formData.institute}
                onChange={handleChange}
                className="w-full bg-transparent border-none focus:outline-none text-center text-xl text-white"
                placeholder="Enter institute name"
                required
              />
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white opacity-100"></div> {/* Thinner line */}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className=" bg-green-500 hover:opacity-80 text-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
