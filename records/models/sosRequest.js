import mongoose from 'mongoose';

const { Schema } = mongoose;

const SOSRequestSchema = new Schema({
  contactNumber: {
    type: String,
    required: true,
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] },
  },
  reason: {
    type: String,
    required: true,
  },
  healthProblem: {
    type: String,
    required: true,
  },
  estimatedTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['received', 'sent', 'pending'],
    default: '',
  },
}, { timestamps: true });

const SOSRequest = mongoose.model('SOSRequest', SOSRequestSchema);

export default SOSRequest;
