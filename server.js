// server.js
import express from 'express';
import { createTransport } from 'nodemailer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import validator from 'validator';
import cors from 'cors';

dotenv.config();

const app = express();

// Increase the body size limit
app.use(bodyParser.json({ limit: '10mb' }));

const corsOptions = {
    origin: 'http://localhost:63343',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions)); // Enable CORS

app.post('/send-email', (req, res) => {
    const { emailId, image } = req.body;

    console.log('Email sent to ', emailId);
    // Validate and sanitize the email and image inputs
    /*if (!emailId || !validator.isEmail(emailId)) {
        return res.status(400).send('Invalid email address!');
    }
    if (!image || !validator.isBase64(image.split(',')[1])) {
        return res.status(400).send('Invalid image data');
    }*/

    const transporter = createTransport({
        host: process.env.EMAIL_HOST, // Replace with your SMTP server host
        port: process.env.EMAIL_PORT, // Replace with your SMTP server port (usually 587 for TLS or 465 for SSL)
        secure: false, // Set to true if using port 465
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS  // Your email password
        }
    });

    const mailOptions = {
        from: 'test@resend.dev', // Use a test/dev email from Resend
        to: emailId,
        subject: 'Your Chart Image',
        text: 'Please find your chart image attached.',
        attachments: [
            {
                filename: 'chart.png',
                content: image.split(',')[1], // Base64 content
                encoding: 'base64'
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});