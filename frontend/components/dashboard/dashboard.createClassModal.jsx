import axios from 'axios';
import React, { useState } from 'react';

const CreateClassModal = ({ onClose }) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [strength, setStrength] = useState('');
  const [details, setDetails] = useState('');
  const [stream, setStream] = useState('');
  const [year, setYear] = useState('');
  const [TAs, setTAs] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTAChange = (index, value) => {
    const newTAs = [...TAs];
    newTAs[index] = value;
    setTAs(newTAs);
  };

  const addTAField = () => setTAs([...TAs, '']);
  const removeTAField = (index) => setTAs(TAs.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!courseName || !courseCode || !strength || !details || !stream || !year || !TAs) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    const classData = { courseName, courseCode, strength, details, stream, year, TAs };

    try {
      // Function to get a specific cookie by name
      // const allCookies = document.cookie;
      // console.log('All Cookies:', allCookies);

      const response = await axios.post(`${import.meta.env.VITE_HOST_NAME}/classroom/create`, classData);

      if (response.ok) {
        console.log('class created successfully!', response.data);
        onClose(false);
      }
    } catch (error) {
      console.log(error)
      console.error('Error creating classroom:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-blackboard border-[20px] border-x-[#744b2b] border-y-[#61381a] p-8 w-full max-w-4xl text-white font-chalk relative">
        <h2 className="text-center text-2xl font-bold mb-8">Create New Class</h2>

        <div className="overflow-y-auto max-h-[55vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-lg">Course Name:</label>
                <input
                  type="text"
                  className="bg-transparent border-b-2 border-white p-2 text-white placeholder-gray-400 outline-none"
                  placeholder="Enter course name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-lg">Course Code:</label>
                <input
                  type="text"
                  className="bg-transparent border-b-2 border-white p-2 text-white placeholder-gray-400 outline-none"
                  placeholder="Enter course code"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-lg">Student Strength:</label>
                <input
                  type="number"
                  className="bg-transparent border-b-2 border-white p-2 text-white placeholder-gray-400 outline-none"
                  placeholder="Enter number of students"
                  value={strength}
                  onChange={(e) => setStrength(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-lg">Course Details:</label>
                <textarea
                  className="bg-transparent border-b-2 border-white p-2 text-white placeholder-gray-400 outline-none"
                  placeholder="Enter course details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-lg">Stream:</label>
                <select
                  className="bg-[#2b2b2b] border-b-2 border-white p-2 text-white outline-none"
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                >
                  <option value="">Select Stream</option>
                  <option value="Maths">Maths</option>
                  <option value="Physics">Physics</option>
                  <option value="IT">IT</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Biology">Biology</option>
                  <option value="Literature">Literature</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-lg">Year:</label>
                <input
                  type="Number"
                  className="bg-transparent border-b-2 border-white p-2 text-white placeholder-gray-400 outline-none"
                  placeholder="Enter year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-lg">Teaching Assistants (TAs):</label>
                {TAs.map((ta, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      className="bg-transparent border-b-2 border-white p-2 text-white placeholder-gray-400 flex-1 outline-none"
                      placeholder={`Enter TA ${index + 1} ID`}
                      value={ta}
                      onChange={(e) => handleTAChange(index, e.target.value)}
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => removeTAField(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 bg-emerald-400 text-black py-1 px-4 rounded-lg hover:bg-emerald-500 transition duration-300"
                  onClick={addTAField}
                >
                  + Add TA
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 mt-5 text-center">{error}</p>}

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-green-400 text-black font-bold py-2 px-8 rounded-lg hover:bg-green-500 transition duration-300"
          >
            Create
          </button>
          <button
            onClick={() => { onClose(false) }}
            className="bg-red-400 text-black font-bold py-2 px-8 rounded-lg hover:bg-red-500 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateClassModal;
