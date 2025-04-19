import {BindingScope, injectable} from '@loopback/core';
import nodemailer from 'nodemailer';

@injectable({scope: BindingScope.TRANSIENT})
export class EmailService {
  private transporter;

  constructor() {
    // Set up transporter using Gmail SMTP
    // this.transporter = nodemailer.createTransport({
    //   //type: 'smtp',
    //   host: 'smtp.gmail.com',
    //   port: 465,
    //   tls: {
    //     rejectUnauthorized: false,
    //   },
    //   auth: {
    //     user: 'ashishiimtion.99@gmail.com', // Your Gmail address
    //     pass: 'bcgx iecm pdgs uccf', // Your Gmail password or App Password
    //   },
    //   secure: true, // Use SSL
    // });

    //const nodemailer = require("nodemailer");
    // this.transporter = nodemailer.createTransport({
    //   // "type": "smtp",
    //   "host": "smtp.secureserver.net",
    //   "secure": true,
    //   "port": 587,
    //   "tls": {
    //     "rejectUnauthorized": false
    //   }, // true for port 465, false for other ports
    //   auth: {
    //     user: "business@7travelmoney.com",
    //     pass: "Noida@2704",
    //   },
    // });
    this.transporter = nodemailer.createTransport({
      host: 'smtpout.secureserver.net',
      port: 465, // Use 587 for TLS, 465 for SSL
      secure: true, // Use SSL
      auth: {
        user: 'business@7travelmoney.com', // Your GoDaddy email
        pass: 'IndiaNoida112&', // Your email password
      },
    });
    // {
    //   "name": "ashish",
    //   "email": "ashishiimtion.99@gmail.com",
    //   "mobile": 9876543210,
    //   "inquiry_type": "test",
    //   "location": "noida",
    //   "message": "test message",
    //   "status": true,
    //   "created_at": "2025-01-28T16:08:22.005Z",
    //   "updated_at": "2025-01-28T16:08:22.005Z"
    // }
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: 'business@7travelmoney.com',
      to,
      bcc: 'business@7travelmoney.com',
      subject,
      html: text,
    };
    // const mailOptionsSelf = {
    //   from: 'ashishiimtion.99@gmail.com',
    //   to: 'business@7travelmoney.com',
    //   subject,
    //   html: text,
    // };
    try {
      await this.transporter.sendMail(mailOptions);
      // await this.transporter.sendMail(mailOptionsSelf);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Could not send email');
    }
  }
}
