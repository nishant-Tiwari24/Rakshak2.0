import React, { useState } from 'react';
import Section from './Section';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { MdMedicalServices } from 'react-icons/md';
import Button from './Button';
import DiseaseInputForm from './ChatBot';

const VideoCallInput = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const submitHandler = () => {
    navigate(`/room/${input}`);
  };

  return (
    <Section>
      <h1 className="text-3xl font-bold mb-8 -mt-8 text-center text-zinc-600">
        Workspace for Doctors
      </h1>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="left w-full md:w-3/5 left-0 max-w-3xl h-52 mx-auto bg-black shadow-md rounded border border-zinc-800 px-8 pt-6 pb-8 mb-4 md:ml-16">
          <h1 className="text-2xl font-light mb-6 text-white">
            <FaUser className="inline-block mr-2 text-red-500 font-normal" /> End to end encrypted meetings
          </h1>
          <div className="mb-6">
            <div className="flex items-center rounded-full overflow-hidden w-full bg-gray-800 px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-opacity-75">
              <FaEnvelope className="text-gray-400 mr-3" />
              <input
                type="text"
                className="flex-grow px-3 py-2 bg-transparent text-white focus:outline-none placeholder-gray-400"
                placeholder="Enter name or email address"
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="flex items-center px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-r-full"
                onClick={submitHandler}
                disabled={!input}
              >
                <FaArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="right md:w-1/2 text-lg mt-4 md:mt-0 h-52 md:ml-4 rounded border border-zinc-800 px-8 pt-6 pb-8 mr-16">
          <h1 className="text-2xl font-light mb-4 text-white">
            <MdMedicalServices className="inline-block mr-2 text-green-600" /> Advance disease detection using ML and Deep Learning
          </h1>
          <Button href={'http://localhost:8501'}>
            Continue to the page
          </Button>
        </div>
      </div>
      <div className='-mt-16'>
        <DiseaseInputForm/>
      </div>
    </Section>
  );
};

export default VideoCallInput;