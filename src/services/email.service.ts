import {BindingScope, injectable} from '@loopback/core';
import nodemailer from 'nodemailer';

@injectable({scope: BindingScope.TRANSIENT})
export class EmailService {
  private transporter;

  constructor() {
    // Set up transporter using Gmail SMTP
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ashishiition.99@gmail.com', // Your Gmail address
        pass: 'bcgx iecm pdgs uccf', // Your Gmail password or App Password
      },
      // secure: false, // Use SSL
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: 'ashishiimtion.99@gmail.com',
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Could not send email');
    }
  }
}
