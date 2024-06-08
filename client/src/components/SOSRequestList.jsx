import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SOSRequestList = () => {
    const [sosRequests, setSOSRequests] = useState([]);

    useEffect(() => {
        const fetchSOSRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5500/sos');
                setSOSRequests(response.data);
            } catch (error) {
                console.error('Error fetching SOS requests:', error);
            }
        };
        fetchSOSRequests();
    }, []);

    const handleAction = async (id, action) => {
        console.log(`Updating SOS request ${id} with action ${action}`);
        try {
            const updatedRequest = await axios.put(`http://localhost:5500/sos/${id}`, { status: action });
            console.log('Updated SOS request:', updatedRequest.data);
            setSOSRequests(prevRequests =>
                prevRequests.map(request =>
                    request._id === id ? { ...request, status: updatedRequest.data.status } : request
                )
            );
        } catch (error) {
            console.error(`Error updating SOS request ${id} with action ${action}:`, error);
        }
    };

    let count = 1;

    const openGoogleMaps = (latitude, longitude) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        window.open(url, '_blank');
    };

    return (
        <div className="text-white flex flex-col justify-center items-center w-full mt-4">
            <h2 className="text-2xl font-bold mb-4">Emergency SOS Requests</h2>
            <div className="overflow-x-auto">
                <table className="w-full bg-gray-900 rounded-lg overflow-hidden">
                    <thead className="bg-zinc-800">
                        <tr className="text-left text-white">
                            <th className="px-6 py-3 text-lg font-bold uppercase border-b border-gray-700">Sno</th>
                            <th className="px-6 py-3 text-lg font-bold uppercase border-b border-gray-700">Contact Number</th>
                            <th className="px-6 py-3 text-lg font-bold uppercase border-b border-gray-700">Reason</th>
                            <th className="px-6 py-3 text-lg font-bold uppercase border-b border-gray-700">Health Problem</th>
                            <th className="px-6 py-3 text-lg font-bold uppercase border-b border-gray-700">Estimated Time</th>
                            <th className="px-6 py-3 text-lg font-bold uppercase border-b border-gray-700">Location</th>
                            <th className="px-6 py-3 text-red-500 text-lg font-bold uppercase border-b border-gray-700">Ambulance</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-light divide-zinc-800">
                        {sosRequests.map(request => (
                            <tr key={request._id} className="text-white text-lg bg-zinc-700 hover:bg-zinc-800">
                                <td className="px-6 py-4">{count++}</td>
                                <td className="px-6 py-4">{request.contactNumber}</td>
                                <td className="px-6 py-4">{request.reason}</td>
                                <td className="px-6 py-4">{request.healthProblem}</td>
                                <td className="px-6 py-4">{request.estimatedTime}</td>
                                <td className="px-6 py-4 cursor-pointer"
                                    onClick={() => openGoogleMaps(request.location.coordinates[1], request.location.coordinates[0])}
                                >
                                    {request.location && (
                                        <div>
                                            Latitude: {request.location.coordinates[1]}<br />
                                            Longitude: {request.location.coordinates[0]}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center space-x-2">
                                        <button
                                            className={`py-1 px-3 rounded ${
                                                request.status === 'received' ? 'bg-green-500 hover:bg-green-600 text-white font-light' : 'bg-green-300 text-gray-700'
                                            }`}
                                            disabled={request.status === 'received'}
                                            onClick={() => handleAction(request._id, 'received')}
                                        >
                                            Received
                                        </button>
                                        <button
                                            className={`py-1 px-3 rounded ${
                                                request.status === 'sent' ? 'bg-yellow-500 hover:bg-yellow-600 text-white font-light' : 'bg-yellow-300 text-gray-700'
                                            }`}
                                            disabled={request.status === 'sent'}
                                            onClick={() => handleAction(request._id, 'sent')}
                                        >
                                            Sent
                                        </button>
                                        <button
                                            className={`py-1 px-3 rounded ${
                                                request.status === 'pending' ? 'bg-red-500 hover:bg-red-600 text-white font-light' : 'bg-red-300 text-gray-700'
                                            }`}
                                            disabled={request.status === 'pending'}
                                            onClick={() => handleAction(request._id, 'pending')}
                                        >
                                            Pending
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SOSRequestList;
