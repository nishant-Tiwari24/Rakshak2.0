import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Section from './Section';
import {
    FaUser, FaBirthdayCake, FaTransgender, FaTint, FaAllergies, FaDiagnoses, FaProcedures,
    FaTemperatureHigh, FaHeartbeat, FaLungs, FaWeight
} from 'react-icons/fa';
import { GiThermometerScale } from 'react-icons/gi';

const PatientDetails = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`http://localhost:5500/patients/${id}`);
                setPatient(response.data);
            } catch (error) {
                console.error('Error fetching patient:', error);
            }
        };
        fetchPatient();
    }, [id]);

    if (!patient) {
        return (
            <div className='grid gap-8'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-zinc-800 shadow-lg animate-pulse h-36 rounded-lg"></div>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-6">
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className="bg-zinc-800 shadow-lg animate-pulse h-96 rounded-lg"></div>
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-zinc-800 shadow-lg animate-pulse h-96 rounded-lg"></div>
                </div>
            </div>
        );
    }

    return (
        <Section className="text-gray-900 flex flex-col justify-center items-center py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full max-w-4xl">
                <div className="bg-blue-200 p-4 rounded-lg shadow-lg flex items-center">
                    <FaTemperatureHigh className="text-3xl text-blue-600 mr-4" />
                    <div>
                        <p className="text-xl font-bold text-blue-800">Room Temperature</p>
                        <p className="text-lg text-blue-700">{patient.roomTemperature} °C</p>
                    </div>
                </div>
                <div className="bg-red-200 p-4 rounded-lg shadow-lg flex items-center">
                    <GiThermometerScale className="text-3xl text-red-600 mr-4" />
                    <div>
                        <p className="text-xl font-bold text-red-800">Body Temperature</p>
                        <p className="text-lg text-red-700">{patient.bodyTemperature} °C</p>
                    </div>
                </div>
                <div className="bg-green-200 p-4 rounded-lg shadow-lg flex items-center">
                    <FaLungs className="text-3xl text-green-600 mr-4" />
                    <div>
                        <p className="text-xl font-bold text-green-800">Body Oxygen Level</p>
                        <p className="text-lg text-green-700">{patient.oxygenLevel} %</p>
                    </div>
                </div>
                <div className="bg-purple-200 p-4 rounded-lg shadow-lg flex items-center">
                    <FaWeight className="text-3xl text-purple-600 mr-4" />
                    <div>
                        <p className="text-xl font-bold text-purple-800">BMI</p>
                        <p className="text-lg text-purple-700">{patient.bmi}</p>
                    </div>
                </div>
                <div className="bg-yellow-200 p-4 rounded-lg shadow-lg flex items-center">
                    <FaHeartbeat className="text-3xl text-yellow-600 mr-4" />
                    <div>
                        <p className="text-xl font-bold text-yellow-800">Heart Rate</p>
                        <p className="text-lg text-yellow-700">{patient.heartRate} BPM</p>
                    </div>
                </div>
                <div className="bg-red-200 p-4 rounded-lg shadow-lg flex items-center">
                    <GiThermometerScale className="text-3xl text-red-600 mr-4" />
                    <div>
                        <p className="text-xl font-bold text-red-800">Body Temperature</p>
                        <p className="text-lg text-red-700">{patient.bodyTemperature} °C</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full border-4 border-purple-500">
                <div className="text-center mb-6">
                    <h2 className="text-4xl font-bold text-purple-700">Medical Record Certificate</h2>
                    <p className="text-lg text-purple-500">Hospital Name</p>
                    <p className="text-sm text-purple-400">Hospital Address</p>
                </div>
                <div className="border-t border-b border-gray-300 py-6 mb-6">
                    <h3 className="text-2xl font-bold mb-4 text-purple-600">Patient Records</h3>
                    <div className="flex flex-wrap justify-between">
                        <p className="mb-2 w-full sm:w-1/2 lg:w-1/3"><FaUser className="inline mr-2" /><strong>Name:</strong> {patient.patientName}</p>
                        <p className="mb-2 w-full sm:w-1/2 lg:w-1/3"><FaBirthdayCake className="inline mr-2" /><strong>Age:</strong> {patient.age}</p>
                        <p className="mb-2 w-full sm:w-1/2 lg:w-1/3"><FaTransgender className="inline mr-2" /><strong>Gender:</strong> {patient.gender}</p>
                        <p className="mb-2 w-full sm:w-1/2 lg:w-1/3"><FaTint className="inline mr-2" /><strong>Blood Type:</strong> {patient.bloodType}</p>
                        <p className="mb-2 w-full sm:w-1/2 lg:w-1/3"><FaAllergies className="inline mr-2" /><strong>Allergies:</strong> {patient.allergies}</p>
                        <p className="mb-2 w-full sm:w-1/2 lg:w-1/3"><FaDiagnoses className="inline mr-2" /><strong>Diagnosis:</strong> {patient.diagnosis}</p>
                        <p className="mb-2 w-full sm:w-1/2 lg:w-1/3"><FaProcedures className="inline mr-2" /><strong>Treatment:</strong> {patient.treatment}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <img src='/hos-stamp.webp' alt="Hospital Stamp" className="w-40 pr-4 h-auto" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-xl font-bold mb-4 text-purple-600">Doctor's Notes</h4>
                        <p className="text-base text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel leo orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel leo orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel leo orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel leo orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel leo orci.
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default PatientDetails;
