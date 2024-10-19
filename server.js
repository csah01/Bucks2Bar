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
    const { email, image } = req.body;

    // Validate and sanitize the image input
    /*if (!image || !validator.isBase64(image.split(',')[1])) {
        return res.status(400).send('Invalid image data');
    }*/

    console.log('SEND email works');
    /* const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'recipient-email@gmail.com',
        subject: 'Your Chart Image',
        html: '<h1>Your Chart</h1><img src="' + image + '" />'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    }); */
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});