import mongoose from 'mongoose';

const { Schema } = mongoose;

const sosRequestSchema = new Schema({
  contactNumber: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  reason: { type: String, required: true },
  healthProblem: { type: String, required: true },
  estimatedTime: { type: String, required: true },
  status: { type: String, enum: ['received', 'sent', 'pending'], default: 'pending' },
});

const SOSRequest = mongoose.model('SOSRequest', sosRequestSchema);

export default SOSRequest;
