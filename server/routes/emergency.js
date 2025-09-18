
import express from 'express';
import twilio from 'twilio';
import dotenv from 'dotenv';
import EmergencyAlert from '../models/EmergencyAlert.js';

// Load environment variables
dotenv.config();

const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const emergencyNumber = process.env.EMERGENCY_CALL_NUMBER || '+911'; // fallback to 911

const client = twilio(accountSid, authToken);

// POST /api/emergency/call
router.post('/call', async (req, res) => {
  try {
    const { location, user } = req.body;
    // Place the call
    const call = await client.calls.create({
      url: 'http://demo.twilio.com/docs/voice.xml', // Replace with your TwiML Bin or webhook
      to: emergencyNumber,
      from: twilioNumber,
    });


    // Save alert to DB for police dashboard notification
    const alert = new EmergencyAlert({
      user,
      location,
      type: 'panic_button',
      status: 'active',
      callSid: call.sid,
      notified: true,
    });
    await alert.save();

    res.status(200).json({ success: true, callSid: call.sid });
  } catch (error) {
    console.error('Twilio call error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
