
// CORRECT
import * as nodemailer from 'nodemailer';


const OWNER_EMAIL = "sarathkumar321m@gmail.com"; // Replace with actual owner email



export async function sendEmail(to: string, subject: string, text: string) {
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
 
  // Send mail with defined transport object
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: to,
    subject: subject,
    text: text,
  });
}

export async function sendBookingEmail({ 
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
}: {
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  vehicleType: string;
  distance: string;
  name: string;
  mobile: string;
  email: string;
  estimatedFare: string;
}) {
  // Create email content for customer
  const customerSubject = "Your Taxi Booking Confirmation";
  const customerText = `
Dear ${name},

Thank you for booking with NaviDrop Taxi. Here are your booking details:

Pickup Location: ${pickup}
Drop-off Location: ${dropoff}
Date: ${date}
Time: ${time}
Vehicle Type: ${vehicleType}
Estimated Distance: ${distance}
Estimated Fare: ${estimatedFare}

We will contact you shortly to confirm your booking.

Best regards,
NaviDrop Taxi Team
`;

  // Create email content for owner
  const ownerSubject = "New Taxi Booking Request";
  const ownerText = `
New booking request received:

Customer Details:
Name: ${name}
Mobile: ${mobile}
Email: ${email}

Booking Details:
Pickup Location: ${pickup}
Drop-off Location: ${dropoff}
Date: ${date}
Time: ${time}
Vehicle Type: ${vehicleType}
Estimated Distance: ${distance}
Estimated Fare: ${estimatedFare}

Please process this booking and contact the customer to confirm.
`;

  // Send emails to both customer and owner
  await Promise.all([
    sendEmail(email, customerSubject, customerText),
    sendEmail(OWNER_EMAIL, ownerSubject, ownerText)
  ]);
}
