import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'non-binary', 'other'],
    required: true,
  },
  bloodType: {
    type: String,
    required: true,
  },
  allergies: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
