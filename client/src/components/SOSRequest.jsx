import React, { useState } from 'react';
import axios from 'axios';
import Section from './Section';
import Button from './Button';

const SOSRequest = () => {
  const [formData, setFormData] = useState({
    contactNumber: '',
    reason: '',
    healthProblem: '',
    estimatedTime: '',
    language: 'english',
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
    const languageMapping = {
      english: 'in English',
      hindi: 'in Hindi',
      telugu: 'in Telugu',
    };

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyB5HJkYLT-A94YKlybi46UtRyPBl_Lry3o',
        {
          contents: [{
            parts: [{
              text: `I have ${formData.estimatedTime} minutes left for the ambulance to come. Could you please guide me in detail on what steps I should follow to reduce pain or get some relief? I have this problem: ${formData.healthProblem} and ${formData.reason}. It's severe, and don't mention calling an ambulance or 911, as we have already done that and it will come after ${formData.estimatedTime}. Give response ${languageMapping[formData.language]}.`
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

  const handleSubmit = async () => {
    const { contactNumber, reason, healthProblem, estimatedTime, language } = formData;
    if (!contactNumber || !reason || !healthProblem || !estimatedTime || !language) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    const staticLocation = {
      latitude: 17.385044,
      longitude: 78.486671,
    };

    const data = {
      ...formData,
      location: {
        type: 'Point',
        coordinates: [staticLocation.longitude, staticLocation.latitude],
      },
    };

    try {
      await axios.post('http://localhost:5500/sos', data);
      setSuccessMessage('SOS request sent successfully!');
      setFormData({
        contactNumber: '',
        reason: '',
        healthProblem: '',
        estimatedTime: '',
        language: 'english',
      });
      generateAnswer();  // Generate the answer after the SOS request is sent
    } catch (error) {
      console.error('Error sending SOS request', error);
      setErrorMessage('Error sending SOS request. Please try again.');
    }
  };

  return (
    <Section>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="left w-full md:w-3/5 left-0 max-w-3xl mx-auto bg-black shadow-md rounded border border-zinc-800 px-8 pt-6 pb-8 mb-4 md:ml-16">
          <h2 className="text-2xl font-bold mb-6 text-red-500">Emergency SOS Request / आपातकालीन एसओएस अनुरोध / 
అత్యవసర sos అభ్యర్థన</h2>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          <div className="mb-3">
            <label className="block text-white mb-2">Contact Number / संपर्क संख्या / 
సంప్రదింపు సంఖ్య:</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="block appearance-none border border-zinc-800 w-full rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-white"
              placeholder="Enter Contact Number"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-white mb-2">Reason for SOS / एसओएस का कारण / 
SOS కోసం కారణం:</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="block appearance-none border border-zinc-800 w-full rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-white"
              placeholder="Enter Reason for SOS"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-white mb-2">Health Problem / स्वास्थ्य समस्या / ఆరోగ్య సమస్య:</label>
            <input
              type="text"
              name="healthProblem"
              value={formData.healthProblem}
              onChange={handleChange}
              className="block appearance-none border border-zinc-800 w-full rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-white"
              placeholder="Enter Health Problem"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-white mb-2">Estimated Time Needed / अपेक्षित अनुमानित समय / అంచనా వేసిన సమయం:</label>
            <input
              type="text"
              name="estimatedTime"
              value={formData.estimatedTime}
              onChange={handleChange}
              className="block appearance-none border border-zinc-800 w-full rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-white"
              placeholder="Estimated Time Needed (e.g., 30 minutes)"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-white mb-2">Choose Language:</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="block appearance-none w-full bg-black border border-zinc-800 text-white py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="telugu">Telugu</option>
            </select>
          </div>
          <Button onClick={handleSubmit}>
            Send SOS Request
          </Button>
        </div>
        <div className="right md:w-1/2 text-lg mt-4 md:mt-0 md:ml-4 rounded border border-zinc-800 px-8 pt-6 pb-8 mr-16 ">
          <h1 className="text-2xl font-bold mb-4 text-green-600">Ambulance is on the way. Follow these steps:</h1> 
          <p className='text-white font-extralight'>{answer}</p>
        </div>
      </div>
    </Section>
  );
};

export default SOSRequest;
