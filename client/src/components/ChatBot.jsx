import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { FaHeartbeat, FaNotesMedical, FaClock, FaThermometerHalf } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';
import Section from './Section';
import Button from './Button';


const DiseaseInputForm = () => {
  const [formData, setFormData] = useState({
    symptoms: '',
    medicalHistory: '',
    duration: '',
    severity: '',
  });
  const [answer, setAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateAnswer = async () => {
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyB5HJkYLT-A94YKlybi46UtRyPBl_Lry3o',
        {
          contents: [{
            parts: [{
              text: `According to your knowledge if a person has these ${formData.symptoms}, with the medical history ${formData.medicalHistory}, and from the duration of ${formData.duration}, and with ${formData.severity} severity, could you please provide more details or ask for advice on how to manage or treat your condition?`
            }]
          }]
        }
      );
      if (response.data && response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content && response.data.candidates[0].content.parts) {
        setAnswer(response.data.candidates[0].content.parts[0].text);
      } else {
        setAnswer('Error: Unable to generate answer. Please try again.');
      }
    } catch (error) {
      console.error('Error generating answer:', error);
      setAnswer('Error: Unable to generate answer. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { symptoms, medicalHistory, duration, severity } = formData;
    if (!symptoms || !medicalHistory || !duration || !severity) {
      setErrorMessage('Please fill out all fields.');
      return;
    }
    setSuccessMessage('Generating answer...');
    generateAnswer();
    setFormData({
      symptoms: '',
      medicalHistory: '',
      duration: '',
      severity: '',
    });
  };

  return (
    <Section>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="left w-full md:w-3/5 left-0 max-w-3xl mx-auto bg-black shadow-md rounded border border-zinc-800 px-8 pt-6 pb-8 mb-4 md:ml-16">
          <h2 className="text-2xl font-light mb-6 ">
            <FaHeartbeat className="inline-block mr-2 text-purple-500" /> Disease Input Form
          </h2>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-white mb-2"><FaNotesMedical className="inline-block mr-2" /> Symptoms:</label>
              <input
                type="text"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                className="block appearance-none border border-zinc-800 w-full rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-white"
                placeholder="Enter Symptoms"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-white mb-2"><FaNotesMedical className="inline-block mr-2" /> Medical History:</label>
              <input
                type="text"
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                className="block appearance-none border border-zinc-800 w-full rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-white"
                placeholder="Enter Medical History"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-white mb-2"><FaClock className="inline-block mr-2" /> Duration:</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="block appearance-none border border-zinc-800 w-full rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-white"
                placeholder="Enter Duration"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-white mb-2"><FaThermometerHalf className="inline-block mr-2" /> Severity:</label>
              <input
                type="text"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="block appearance-none border border-zinc-800 w-full rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-white"
                placeholder="Enter Severity"
                required
              />
            </div>
            <Button>
              Submit
            </Button>
          </form>
        </div>
        <div className="right md:w-1/2 text-lg mt-4 md:mt-0 md:ml-4 rounded border h-[465px] border-zinc-800 px-8 pt-6 pb-8 mr-16 overflow-y-auto">
          <h1 className="text-2xl font-light mb-4 text-white">
            <MdCheckCircle className="inline-block mr-2 text-green-600" /> Diagnosis and Management Advice:
          </h1>
          <p className='text-zinc-400 font-light text-lg'>{answer}</p>
        </div>
      </div>
    </Section>
  );
};

export default DiseaseInputForm;
