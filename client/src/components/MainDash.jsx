import React, { useState, useEffect } from 'react';
import PatientDashboard from './patientDashboard';
import PatientList from './PatientList';
import { FaUserMd, FaCalendarAlt, FaDollarSign, FaSyringe } from 'react-icons/fa';
import SOSRequestList from './SOSRequestList';

const MainDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [totalPatients, setTotalPatients] = useState(0);
    const [totalAppointments, setTotalAppointments] = useState(0);

    const lastMonthPatients = 0; 
    const thisMonthPatients = totalPatients; 
    const thisMonthPatientsAppointment = totalAppointments; 

    const calculatePercentageIncrease = (lastMonth, thisMonth) => {
        if (lastMonth === 0) {
            return thisMonth > 0 ? '∞' : '0%';
        }
        return ((thisMonthPatients - lastMonth) / lastMonth * 100).toFixed(2) + '%';
    };

    const calculatePercentageIncreaseAppointments = (lastMonth, thisMonth) => {
        if (lastMonth === 0) {
            return thisMonth > 0 ? '∞' : '0%';
        }
        return ((thisMonthPatientsAppointment - lastMonth) / lastMonth * 100).toFixed(2) + '%';
    };

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
        <div>
            {loading ? (
                <LoadingBox />
            ) : (
                <div className="grid gap-8 px-10 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold flex items-center">
                                <FaUserMd className="mr-2" /> Total Patients
                            </h3>
                            <p className="text-3xl">{totalPatients}</p>
                            <p className="text-green-200">{2600}% than Last Month</p>
                        </div>
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold flex items-center">
                                <FaCalendarAlt className="mr-2" /> Total Appointments
                            </h3>
                            <p className="text-3xl">{totalAppointments}</p>
                            <p className="text-red-200">{1200}% Last Month</p>
                        </div>
                        <div className="bg-gradient-to-r from-pink-400 to-pink-600 p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold flex items-center">
                                <FaSyringe className="mr-2" /> Total Surgeries
                            </h3>
                            <p className="text-3xl">8</p>
                            <p className="text-green-200">800% Last Month</p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold flex items-center">
                                <FaDollarSign className="mr-2" /> Total Revenue
                            </h3>
                            <p className="text-3xl">$547</p>
                            <p className="text-green-200">100% Last Month</p>
                        </div>
                    </div>
                    <PatientDashboard setTotalPatients={setTotalPatients} setTotalAppointments={setTotalAppointments} />
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
