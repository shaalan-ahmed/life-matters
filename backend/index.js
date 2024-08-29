import express from 'express';
import cors from 'cors';
import { connection } from './data.js';
import { TrafficSignal } from './models/TrafficSignal.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["https://life-matters.vercel.app"],
  methods: ["GET", "POST"],
  credentials: true,
}));

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/user", (req, res) => {
  res.send("life matters");
});

app.get("/api/traffic-signal", async (req, res) => {
  try {
    const trafficSignal = await TrafficSignal.findOne();
    
    if (trafficSignal && trafficSignal.elements) {
      const results = trafficSignal.elements.map(element => ({
        id: element.id,
        lat: element.lat,
        lon: element.lon
      }));
      res.json(results);
    } else {
      res.status(404).json({ message: 'No traffic signal data found' });
    }
  } catch (error) {
    console.error('Error fetching traffic signals:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 8083;

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});