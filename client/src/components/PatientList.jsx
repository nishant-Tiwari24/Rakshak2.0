import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { QRCode } from 'react-qrcode-logo';
import { toPng } from 'html-to-image'; 
import { saveAs } from 'file-saver';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const qrCodeRefs = useRef({});

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:5500/patients');
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error.response || error.message);
            }
        };
        fetchPatients();
    }, []);

    const generateQRCodeData = (patient) => {
        return `http://localhost:5173/patient/${patient._id}`;
    };

    const downloadQRCode = async (id) => {
        try {
            const node = qrCodeRefs.current[id];
            const dataUrl = await toPng(node);
            saveAs(dataUrl, `${id}-qrcode.png`);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    let count = 1;

    return (
        <div className="text-white flex flex-col justify-center items-center w-full mt-4">
            <h2 className="text-2xl font-bold mb-4">Patient Records</h2>
            <div className="overflow-x-auto">
                <table className="w-full bg-gray-900 rounded-lg overflow-hidden">
                    <thead className="bg-zinc-800">
                        <tr className="text-left text-white">
                            <th className="px-6 py-3 text-lg font-bold uppercase border-b border-gray-700">Sno</th>
                            <th className="px-6 py-3 text-lg font-bold uppercase border-b border-gray-700">Name</th>
                            <th className="px-6 py-3 text-lg font-bold uppercase border-b border-gray-700">Age</th>
                            <th className="px-6 py-3 text-lg font-bold uppercase border-b border-gray-700">Gender</th>
                            <th className="px-6 py-3 text-lg font-bold uppercase border-b border-gray-700">Blood Type</th>
                            <th className="px-6 py-3 text-lg font-bold uppercase border-b border-gray-700">Allergies</th>
                            <th className="px-6 py-3 text-lg font-bold uppercase border-b border-gray-700">Diagnosis</th>
                            <th className="px-6 py-3 text-lg font-bold uppercase border-b border-gray-700">Treatment</th>
                            <th className="px-6 py-3 text-lg font-bold uppercase border-b border-gray-700">QR Code</th>
                            <th className="px-6 py-3 text-lg font-bold uppercase border-b border-gray-700">Download</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-light divide-zinc-800">
                        {patients.map(patient => (
                            <tr key={patient._id} className="text-white text-lg bg-zinc-700 hover:bg-zinc-800">
                                <td className="px-6 py-4">{count++}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link to={`/patient/${patient._id}`}>
                                        {patient.patientName}
                                    </Link>
                                </td>
                                <td className="px-6 py-4">{patient.age}</td>
                                <td className="px-6 py-4">{patient.gender}</td>
                                <td className="px-6 py-4">{patient.bloodType}</td>
                                <td className="px-6 py-4">{patient.allergies}</td>
                                <td className="px-6 py-4">{patient.diagnosis}</td>
                                <td className="px-6 py-4">{patient.treatment}</td>
                                <td className="px-6 py-4">
                                    <div ref={el => qrCodeRefs.current[patient._id] = el}>
                                        <QRCode 
                                            value={generateQRCodeData(patient)}
                                            size={50}
                                            includeMargin={true} 
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <button 
                                        onClick={() => downloadQRCode(patient._id)} 
                                        className="bg-amber-700 hover:bg-amber-800 text-white font-light py-2 px-4 rounded"
                                    >
                                        Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientList;
