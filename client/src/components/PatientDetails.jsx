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
    const [formData, setFormData] = useState({
        roomTemperature: '',
        bodyTemperature: '',
        oxygenLevel: '',
        bmi: '',
        heartRate: ''
    });
    const [doctorNotes, setDoctorNotes] = useState('');
    const [submittedData, setSubmittedData] = useState(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`http://localhost:5500/patients/${id}`);
                setPatient(response.data);
                setFormData({
                    roomTemperature: response.data.roomTemperature,
                    bodyTemperature: response.data.bodyTemperature,
                    oxygenLevel: response.data.oxygenLevel,
                    bmi: response.data.bmi,
                    heartRate: response.data.heartRate
                });
                setDoctorNotes(response.data.doctorNotes || ''); // Assuming doctorNotes field is present in the response
            } catch (error) {
                console.error('Error fetching patient:', error);
            }
        };
        fetchPatient();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDoctorNotesChange = (e) => {
        setDoctorNotes(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5500/patients/${id}`, { ...formData, doctorNotes });
            setSubmittedData({ ...formData, doctorNotes });
            alert('Patient details updated successfully');
        } catch (error) {
            console.error('Error updating patient details:', error);
        }
    };

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
        <Section className="text-gray-900 flex flex-col  items-center py-10 px-4 md:px-0">
            <form onSubmit={handleSubmit} className="w-[1500px] max-w-4xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {[
                        { icon: FaTemperatureHigh, color: 'blue', label: 'Room Temperature', name: 'roomTemperature', value: formData.roomTemperature },
                        { icon: GiThermometerScale, color: 'red', label: 'Body Temperature', name: 'bodyTemperature', value: formData.bodyTemperature },
                        { icon: FaLungs, color: 'green', label: 'Body Oxygen Level', name: 'oxygenLevel', value: formData.oxygenLevel },
                        { icon: FaWeight, color: 'purple', label: 'BMI', name: 'bmi', value: formData.bmi },
                        { icon: FaHeartbeat, color: 'yellow', label: 'Heart Rate', name: 'heartRate', value: formData.heartRate }
                    ].map(({ icon: Icon, color, label, name, value }, index) => (
                        <div key={index} className={`bg-${color}-200 p-4 rounded-lg shadow-lg flex items-center`}>
                            <Icon className={`text-3xl text-${color}-600 mr-4`} />
                            <div>
                                <p className={`text-xl font-bold text-${color}-800`}>{label}</p>
                                <input
                                    type="text"
                                    name={name}
                                    value={value}
                                    onChange={handleInputChange}
                                    className={`text-lg text-${color}-700 bg-${color}-100 p-2 rounded`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mb-8">
                    <label className="block text-xl font-bold text-gray-800 mb-2">Doctor's Notes</label>
                    <textarea
                        className="w-full bg-gray-100 text-lg p-2 rounded"
                        value={doctorNotes}
                        onChange={handleDoctorNotesChange}
                        rows={6}
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-purple-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-purple-700 transition duration-200"
                    >
                        Update Patient Details
                    </button>
                </div>
            </form>

            {submittedData && (
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full border-4 border-purple-500 mt-8">
                    <div className="text-center mb-6">
                        <h2 className="text-4xl font-bold text-purple-700">Updated Patient Details</h2>
                    </div>
                    <div className="border-t border-b border-gray-300 py-6 mb-6">
                        <h3 className="text-2xl font-bold mb-4 text-purple-600">New Patient Records</h3>
                        <div className="flex flex-wrap justify-between">
                            {[
                                { label: 'Room Temperature', value: submittedData.roomTemperature },
                                { label: 'Body Temperature', value: submittedData.bodyTemperature },
                                { label: 'Body Oxygen Level', value: submittedData.oxygenLevel },
                                { label: 'BMI', value: submittedData.bmi },
                                { label: 'Heart Rate', value: submittedData.heartRate }
                            ].map(({ label, value }, index) => (
                                <p key={index} className="mb-2 w-full sm:w-1/2 lg:w-1/3">
                                    <strong>{label}:</strong> {value}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full border-4 border-purple-500 mt-8">
                <div className="text-center mb-6">
                    <h2 className="text-4xl font-bold text-purple-700">Medical Record Certificate</h2>
                    <p className="text-lg text-purple-500">Hospital Name</p>
                    <p className="text-sm text-purple-400">Hospital Address</p>
                </div>
                <div className="border-t border-b border-gray-300 py-6 mb-6">
                    <h3 className="text-2xl font-bold mb-4 text-purple-600">Patient Records</h3>
                    <div className="flex flex-wrap justify-between">
                        {[
                            { icon: FaUser, label: 'Name', value: patient.patientName },
                            { icon: FaBirthdayCake, label: 'Age', value: patient.age },
                            { icon: FaTransgender, label: 'Gender', value: patient.gender },
                            { icon: FaTint, label: 'Blood Type', value: patient.bloodType },
                            { icon: FaAllergies, label: 'Allergies', value: patient.allergies },
                            { icon: FaDiagnoses, label: 'Diagnosis', value: patient.diagnosis },
                            { icon: FaProcedures, label: 'Treatment', value: patient.treatment }
                        ].map(({ icon: Icon, label, value }, index) => (
                            <p key={index} className="mb-2 w-full sm:w-1/2 lg:w-1/3">
                                <Icon className="inline mr-2" />
                                <strong>{label}:</strong> {value}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <img src='/src/assets/hos-stamp.webp' alt="Hospital Stamp" className="w-52 pr-4 h-auto" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-xl font-bold mb-4 text-purple-600">Doctor's Notes</h4>
                        <p className="text-base text-gray-700">{doctorNotes}</p>
                    </div>
                </div>
            </div>
        </Section>
       );
    };
    
export default PatientDetails;
