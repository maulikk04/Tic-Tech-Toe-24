import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateClassModal from './dashboard.createClassModal.jsx';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-black text-white p-4 px-10">
      <div className="container mx-auto flex items-center justify-between">
        
        <div className="flex items-center space-x-2">
          <img 
            src="../Utils/Images/search.png" 
            alt="Classroom Logo" 
            className="w-8 sm:w-9"
          />
          <span className="text-xl sm:text-2xl font-bold">TechEase</span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="bg-green-500 text-black rounded-full w-8 h-8 flex items-center justify-center"
            onClick={() => setIsModalOpen(true)}
          >
            +
          </button>

          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/account')}
          >
            <img
              src="../Utils/Images/profile-account.png"
              alt="Account Logo"
              className="w-8 sm:w-10"
            />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CreateClassModal 
          onClose={setIsModalOpen} 
        />
      )}
    </nav>
  );
};

export default Navbar;
