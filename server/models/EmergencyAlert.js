import mongoose from 'mongoose';

const EmergencyAlertSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  location: {
    lat: Number,
    lng: Number,
  },
  type: { type: String, default: 'panic_button' },
  status: { type: String, default: 'active' },
  timestamp: { type: Date, default: Date.now },
  notified: { type: Boolean, default: false },
  callSid: { type: String },
});

export default mongoose.model('EmergencyAlert', EmergencyAlertSchema);
