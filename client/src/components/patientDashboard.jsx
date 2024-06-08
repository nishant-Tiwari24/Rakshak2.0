import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { FaMars, FaBirthdayCake } from 'react-icons/fa';

const PatientDashboard = () => {
    const [patientData, setPatientData] = useState({
        femalePatients: 0,
        malePatients: 0,
        otherPatients: 0,
        nonPatients: 0,
        ageCategories: {
            above18: 0,
            from18to40: 0,
            above40: 0,
        },
    });

    const [statusData, setStatusData] = useState({
        sent: 0,
        received: 0,
        pending: 0,
    });

    useEffect(() => {
        const fetchStatusData = async () => {
            try {
                const response = await axios.get('http://localhost:5500/sos/statusCounts');
                setStatusData(response.data);
            } catch (error) {
                console.error('Error fetching status data:', error);
            }
        };
        fetchStatusData();

        const interval = setInterval(fetchStatusData, 8000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await axios.get('http://localhost:5500/patientsdashboard');
                setPatientData(response.data);
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };
        fetchPatientData();
    }, []);

    const { femalePatients, malePatients, otherPatients, nonPatients, ageCategories } = patientData;

    useEffect(() => {
        const barChartCtx = document.getElementById('barChartGender');
        let barChartGender = null;

        if (barChartCtx) {
            if (barChartGender) {
                barChartGender.destroy();
            }
            barChartGender = new Chart(barChartCtx, {
                type: 'bar',
                data: {
                    labels: ['Male', 'Female', 'Other', 'Non-Binary'],
                    datasets: [
                        {
                            label: 'Number of Patients',
                            data: [malePatients, femalePatients, otherPatients, nonPatients],
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.8)', // Blue
                                'rgba(255, 99, 132, 0.8)', // Red
                                'rgba(75, 192, 192, 0.8)', // Green
                                'rgba(153, 102, 255, 0.8)' // Purple
                            ],
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1,
                            },
                        },
                    },
                },
            });
        }

        const pieChartAgeCtx = document.getElementById('pieChartAge');
        let pieChartAge = null;

        if (pieChartAgeCtx) {
            if (pieChartAge) {
                pieChartAge.destroy();
            }
            pieChartAge = new Chart(pieChartAgeCtx, {
                type: 'pie',
                data: {
                    labels: ['Above 18', '18 to 40', 'Above 40'],
                    datasets: [
                        {
                            label: 'Number of Patients',
                            data: [ageCategories.above18, ageCategories.from18to40, ageCategories.above40],
                            backgroundColor: [
                                'rgba(255, 206, 86, 0.8)', // Yellow
                                'rgba(75, 192, 192, 0.8)', // Green
                                'rgba(153, 102, 255, 0.8)', // Purple
                            ],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                },
            });
        }

        const statusLineChartCtx = document.getElementById('statusLineChart');
        let statusLineChart = null;

        if (statusLineChartCtx) {
            if (statusLineChart) {
                statusLineChart.destroy();
            }
            statusLineChart = new Chart(statusLineChartCtx, {
                type: 'line',
                data: {
                    labels: ['Sent', 'Received', 'Pending'],
                    datasets: [
                        {
                            label: 'Status of Requests',
                            data: [statusData.sent, statusData.received, statusData.pending],
                            borderColor: 'rgba(255, 99, 132, 1)', // Red
                        backgroundColor: 'rgba(255, 99, 132, 0.2)', 
                            fill: true,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1,
                            },
                        },
                    },
                },
            });
        }

        return () => {
            if (barChartGender) {
                barChartGender.destroy();
            }
            if (pieChartAge) {
                pieChartAge.destroy();
            }
            if (statusLineChart) {
                statusLineChart.destroy();
            }
        };
    }, [femalePatients, malePatients, otherPatients, nonPatients, ageCategories, statusData]);

    return (
        <div className="flex justify-between items-start gap-4 w-full">
            <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-[30vw] h-96">
                <h3 className="text-xl font-bold mb-4 text-white flex items-center">
                    <FaMars className="mr-2" /> Gender Distribution
                </h3>
                <canvas id="barChartGender" style={{ maxWidth: '100%', maxHeight: '250px' }} />
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg shadow-lg h-96">
                <h3 className="text-xl font-bold mb-4 text-white flex items-center w-[30vw]">
                    <FaBirthdayCake className="mr-2" /> Age Distribution
                </h3>
                <canvas id="pieChartAge" style={{ maxWidth: '100%', maxHeight: '250px' }} />
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-[30vw] h-96">
                <h3 className="text-xl font-bold mb-4 text-white flex items-center">
                    Status of Emergency Requests
                </h3>
                <canvas id="statusLineChart" style={{ maxWidth: '100%', maxHeight: '250px' }} />
            </div>
        </div>
    );
};

export default PatientDashboard;
