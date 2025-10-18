import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Proxy for location suggestions to bypass CORS
  app.get('/api/location-suggest', async (req, res) => {
    const q = req.query.q;
    if (!q || typeof q !== 'string' || q.length < 2) {
      return res.json([]);
    }
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=10&countrycodes=in&q=${encodeURIComponent(q)}`;
      const fetchRes = await fetch(url);
      const data = await fetchRes.json();
      // Filter results to ensure they are from India
      const indiaResults = data.filter((result: any) => 
        result.address?.country === 'India' || 
        result.address?.country_code === 'in'
      );
      res.json(indiaResults.slice(0, 6));
    } catch (err) {
      res.status(500).json([]);
    }
  });
  // put application routes here
  // prefix all routes with /api

  // Booking email route
  app.post('/api/send-booking-email', async (req, res) => {
    try {
      const {
        pickup,
        dropoff,
        date,
        time,
        vehicleType,
        distance,
        name,
        mobile,
        email,
        estimatedFare
      } = req.body;
      // Send email
      const { sendBookingEmail } = await import('./sendEmail');
      await sendBookingEmail({ pickup, dropoff, date, time, vehicleType, distance, name, mobile, email, estimatedFare });
      res.json({ success: true });
    } catch (err:string|any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
