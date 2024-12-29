import {BindingScope, injectable} from '@loopback/core';
import nodemailer from 'nodemailer';

@injectable({scope: BindingScope.TRANSIENT})
export class EmailService {
  private transporter;

  constructor() {
    // Set up transporter using Gmail SMTP
    this.transporter = nodemailer.createTransport({
      //type: 'smtp',
      host: 'smtp.gmail.com',
      port: 465,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: 'ashishiimtion.99@gmail.com', // Your Gmail address
        pass: 'bcgx iecm pdgs uccf', // Your Gmail password or App Password
      },
      secure: true, // Use SSL
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: 'ashishiimtion.99@gmail.com',
      to,
      cc: 'business@7travelmoney.com',
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
