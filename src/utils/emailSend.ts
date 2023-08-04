import nodemailer from 'nodemailer';
import { Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config();

export async function sendEmail(req: Request, res: Response) {
    try {
        console.log(req.body)
        const { email, telephone, name, message } = req.body;

        let transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: "leogavin123@gmail.com", // Your SendinBlue email
                pass: process.env.SENDINBLUE_API_KEY, // SendinBlue SMTP key
            },
        });

        // send email to user
        let mailOptions1 = {
            from: '"Prestige Motorsvence" <contact@prestigemotorsvence.com>', // sender address
            to: email, // list of receivers
            subject: "Your message is received", // Subject line
            html: `<h1>Dear ${name},</h1><p>Your message is received. We will get back to you soon.</p>`, // html body
        };

        await transporter.sendMail(mailOptions1);

        // send email to admin
        let mailOptions2 = {
            from: '"Prestige Motorsvence" <contact@prestigemotorsvence.com>', // sender address
            to: "prestigevence@gmail.com", // list of receivers
            subject: `New message from ${name}`, // Subject line
            html: `<h1>New Message From ${name}</h1><p>Email: ${email}</p><p>Telephone: ${telephone}</p><p>Message: ${message}</p>`, // html body
        };

        await transporter.sendMail(mailOptions2);

        res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending email.' });
    }
}
