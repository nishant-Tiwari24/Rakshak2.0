import React, { useState } from 'react';
import Section from './Section'; 
import Button from './Button';
import axios from 'axios';
import FaceDetection from './FaceDetection';

const PatientRecord = () => {
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [allergies, setAllergies] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPatient = {
        patientName,
        age,
        gender,
        bloodType,
        allergies,
        diagnosis,
        treatment,
      };
      const response = await axios.post('http://localhost:5500/patient', newPatient, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Patient record created:', response.data);
      setPatientName('');
      setAge('');
      setGender('');
      setBloodType('');
      setAllergies('');
      setDiagnosis('');
      setTreatment('');
    } catch (error) {
      console.error('Error creating patient record:', error);
    }
  };

  return (
    <Section className="text-white flex justify-AROUND items-center -mt-10 ml-14">
      <form onSubmit={handleSubmit} className="w-[1000px] rounded-md border bg-zinc-900 border-zinc-700 p-10 ">
        <h2 className="text-2xl font-bold mb-4">Patient Record</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Patient Name:</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="block w-full px-3 py-2 rounded-md border border-zinc-700 bg-transparent text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="block w-full px-3 py-2 rounded-md border border-zinc-700 bg-transparent text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="block w-full px-3 py-2 rounded-md border border-zinc-700 bg-transparent text-white bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-purple-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Blood Type:</label>
          <input
            type="text"
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            className="block w-full px-3 py-2 rounded-md border border-zinc-700 bg-transparent text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Allergies (comma separated):</label>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="block w-full px-3 py-2 rounded-md border border-zinc-700 bg-transparent text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Diagnosis:</label>
          <input
            type="text"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="block w-full px-3 py-2 rounded-md border border-zinc-700 bg-transparent text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Treatment:</label>
          <input
            type="text"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            className="block w-full px-3 py-2 rounded-md border border-zinc-700 bg-transparent text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            required
          />
        </div>
        <div className="flex justify-start w-56">
          <Button type="submit" className='w-56'>
            Submit
          </Button>
        </div>
      </form>
      <FaceDetection/>
    </Section>
  );
};

export default PatientRecord;
