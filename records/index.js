import express from 'express';
import dotenv from 'dotenv';
import connect from './database/dbconfig.js';
import Patient from './models/patient.js';
import SOSRequest from './models/sosRequest.js';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ['POST', 'GET', 'PUT', 'DELETE']
}));
connect();

app.get('/sos/statusCounts', async (req, res) => {
  try {
    const sentCount = await SOSRequest.countDocuments({ status: 'sent' });
    const receivedCount = await SOSRequest.countDocuments({ status: 'received' });
    const pendingCount = await SOSRequest.countDocuments({ status: 'pending' });

    const statusCounts = {
      sent: sentCount,
      received: receivedCount,
      pending: pendingCount,
    };

    res.status(200).json(statusCounts);
  } catch (error) {
    console.error('Error fetching SOS request status counts:', error);
    res.status(500).json({ error: 'Failed to fetch SOS request status counts.' });
  }
});

app.post('/sos', async (req, res) => {
  try {
    const { contactNumber, location, reason, healthProblem, estimatedTime } = req.body;
    const newSOSRequest = new SOSRequest({
      contactNumber,
      location,
      reason,
      healthProblem,
      estimatedTime,
      status: 'pending',
    });
    const savedSOSRequest = await newSOSRequest.save();
    res.status(201).json(savedSOSRequest);
  } catch (error) {
    console.error('Error creating SOS request:', error);
    res.status(400).json({ error: 'Failed to create SOS request.' });
  }
});

app.get('/sos', async (req, res) => {
  try {
    const sosRequests = await SOSRequest.find();
    res.status(200).json(sosRequests);
  } catch (error) {
    console.error('Error fetching SOS requests:', error);
    res.status(500).json({ error: 'Failed to fetch SOS requests.' });
  }
});

app.put('/sos/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log(`Received request to update SOS request with id: ${id} to status: ${status}`);

  try {
    const updatedSOSRequest = await SOSRequest.findByIdAndUpdate(
      mongoose.Types.ObjectId(id),
      { status },
      { new: true }
    );

    if (!updatedSOSRequest) {
      console.log(`SOS request with id: ${id} not found`);
      return res.status(404).json({ error: 'SOS request not found' });
    }

    console.log(`SOS request updated successfully: ${JSON.stringify(updatedSOSRequest)}`);
    res.status(200).json(updatedSOSRequest);
  } catch (error) {
    console.error('Error updating SOS request:', error);
    res.status(500).json({ error: 'Failed to update SOS request.' });
  }
});

app.delete('/sos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSOSRequest = await SOSRequest.findByIdAndDelete(mongoose.Types.ObjectId(id));
    if (!deletedSOSRequest) {
      return res.status(404).json({ error: 'SOS request not found' });
    }
    res.status(200).json({ message: 'SOS request deleted successfully' });
  } catch (error) {
    console.error('Error deleting SOS request:', error);
    res.status(500).json({ error: 'Failed to delete SOS request.' });
  }
});

app.post('/patient', async (req, res) => {
  try {
    const {
      patientName,
      age,
      gender,
      bloodType,
      allergies,
      diagnosis,
      treatment,
      roomTemperature,
      bodyTemperature,
      oxygenLevel,
      bmi,
      heartRate,
    } = req.body;
    const newPatient = new Patient({
      patientName,
      age,
      gender,
      bloodType,
      allergies,
      diagnosis,
      treatment,
      roomTemperature,
      bodyTemperature,
      oxygenLevel,
      bmi,
      heartRate,
    });
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(400).json({ error: 'Failed to create patient record.' });
  }
});

app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Failed to fetch patients.' });
  }
});

app.delete('/patients/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPatient = await Patient.findByIdAndDelete(mongoose.Types.ObjectId(id));
    if (!deletedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ error: 'Failed to delete patient.' });
  }
});

app.get('/patients/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findById(mongoose.Types.ObjectId(id));

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Failed to fetch patient' });
  }
});

app.get('/patientsdashboard', async (req, res) => {
  try {
    const femalePatientsCount = await Patient.countDocuments({ gender: 'female' });
    const malePatientsCount = await Patient.countDocuments({ gender: 'male' });
    const binaryPatientsCount = await Patient.countDocuments({ gender: 'non-binary' });
    const otherPatientsCount = await Patient.countDocuments({ gender: { $nin: ['male', 'female'] } });

    const above18Count = await Patient.countDocuments({ age: { $gt: 18 } });
    const from18to40Count = await Patient.countDocuments({ age: { $gte: 18, $lte: 40 } });
    const above40Count = await Patient.countDocuments({ age: { $gt: 40 } });

    res.status(200).json({
      femalePatients: femalePatientsCount,
      malePatients: malePatientsCount,
      otherPatients: otherPatientsCount,
      nonPatients: binaryPatientsCount,
      ageCategories: {
        above18: above18Count,
        from18to40: from18to40Count,
        above40: above40Count,
      },
    });
  } catch (error) {
    console.error('Error fetching patient dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch patient dashboard data.' });
  }
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
