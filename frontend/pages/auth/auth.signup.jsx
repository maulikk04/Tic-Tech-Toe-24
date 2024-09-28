import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    institute: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  
    setSuccess(false);  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true); 

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
        setSuccess(true);
        console.log("Signup successful:", data);
      } else {
        setError(data.message || "Something went wrong!");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black font-chalk text-white">
      <div className="w-full max-w-xl p-8 shadow-lg border-l-[25px] border-r-[25px] border-t-[25px] border-b-[25px] border-t-[#61381a] border-b-[#61381a] border-l-[#744b2b] border-r-[#744b2b] bg-[#2b2b2b]"> {/* Custom borders */}
        <h2 className="text-4xl text-center font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>} 
        {success && <p className="text-green-500 mb-4">Signup successful!</p>} 
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <label className="w-1/3 mb-2 text-xl font-medium text-white">Username</label>
            <div className="w-2/3 relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-transparent border-none focus:outline-none text-center text-xl"
                placeholder="Enter username"
                required
              />
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white opacity-100"></div> 
            </div>
          </div>

          <div className="mb-4 flex items-center">
            <label className="w-1/3 mb-2 text-xl font-medium text-white">Email</label>
            <div className="w-2/3 relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-none focus:outline-none text-center text-xl"
                placeholder="Enter email"
                required
              />
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white opacity-100"></div> {/* Thinner line */}
            </div>
          </div>

          <div className="mb-4 flex items-center">
            <label className="w-1/3 mb-2 text-xl font-medium text-white">Password</label>
            <div className="w-2/3 relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent border-none focus:outline-none text-center text-xl"
                placeholder="Enter Password"
                required
              />
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white opacity-100"></div> {/* Thinner line */}
            </div>
          </div>

          <div className="mb-4 flex items-center">
            <label className="w-1/3 mb-2 text-xl font-medium text-white">Confirm Password</label>
            <div className="w-2/3 relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-transparent border-none focus:outline-none text-center text-xl"
                placeholder="Confirm Password"
                required
              />
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white opacity-100"></div> {/* Thinner line */}
            </div>
          </div>

          <div className="mb-10 flex items-center">
            <label className="w-1/3 mb-2 text-xl font-medium text-white">Institute</label>
            <div className="w-2/3 relative">
              <input
                type="text"
                name="institute"
                value={formData.institute}
                onChange={handleChange}
                className="w-full bg-transparent border-none focus:outline-none text-center text-xl"
                placeholder="Enter institute name"
                required
              />
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white opacity-100"></div> {/* Thinner line */}
            </div>
          </div>

          {/* Center the button */}
          <div className="flex justify-center w-full">
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
