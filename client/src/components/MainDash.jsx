import React, { useState, useEffect } from 'react';
import PatientDashboard from './patientDashboard'
import PatientList from './PatientList';
import { FaUserMd, FaCalendarAlt, FaDollarSign, FaSyringe } from 'react-icons/fa';
import DiseaseInputForm from './ChatBot';
import SOSRequestList from './SOSRequestList';

const MainDashboard = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1500); 

        return () => clearTimeout(timeout);
    }, []);

    const LoadingBox = () => (
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

    return (
        <div className="p-8 bg-gradient-to-br min-h-screen text-white">
            {loading ? (
                <LoadingBox />
            ) : (
                <div className="flex-1 flex flex-col gap-6 overflow-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold flex items-center">
                                <FaUserMd className="mr-2" /> Total Patients
                            </h3>
                            <p className="text-3xl">2500+</p>
                            <p className="text-green-200">10.4% Last Month</p>
                        </div>
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold flex items-center">
                                <FaCalendarAlt className="mr-2" /> Total Appointment
                            </h3>
                            <p className="text-3xl">250+</p>
                            <p className="text-red-200">8.6% Last Month</p>
                        </div>
                        <div className="bg-gradient-to-r from-pink-400 to-pink-600 p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold flex items-center">
                                <FaSyringe className="mr-2" /> Total Surgery
                            </h3>
                            <p className="text-3xl">256+</p>
                            <p className="text-green-200">16.4% Last Month</p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold flex items-center">
                                <FaDollarSign className="mr-2" /> Total Revenue
                            </h3>
                            <p className="text-3xl">$12,928</p>
                            <p className="text-green-200">20.6% Last Month</p>
                        </div>
                    </div>
                    <PatientDashboard />
                    <div className="overflow-x-auto">
                        <SOSRequestList />
                    </div>
                    <div className="overflow-x-auto">
                        <PatientList />
                    </div>
                </div>
                
            )}
        </div>
    );
};

export default MainDashboard;
