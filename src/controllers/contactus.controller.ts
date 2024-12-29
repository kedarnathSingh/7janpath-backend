import {inject} from '@loopback/core';
import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {Contactus} from '../models';
import {ContactusRepository} from '../repositories';
import {EmailService} from '../services/email.service';

export class ContactusController {
  constructor(
    @repository(ContactusRepository)
    public contactusRepository: ContactusRepository,
    @inject('services.EmailService')
    protected emailService: EmailService,
  ) { }

  @post('/contactus')
  @response(200, {
    description: 'Contactus model instance',
    content: {'application/json': {schema: getModelSchemaRef(Contactus)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactus, {
            title: 'NewContactus',
            exclude: ['id'],
          }),
        },
      },
    })
    contactus: Omit<Contactus, 'id'>,
  ): Promise<Contactus> {
    const mailBody = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us Query Received</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
        }
        .email-header {
            text-align: center;
            padding-bottom: 20px;
        }
        .email-header h1 {
            font-size: 24px;
            margin: 0;
            color: #007BFF;
        }
        .email-content {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .query-summary {
            margin-top: 20px;
            padding: 10px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .email-footer {
            text-align: center;
            font-size: 14px;
            color: #999;
        }
        .button {
            display: inline-block;
            background-color: #007BFF;
            color: black;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 10px;
        }
            .email-header img {
    width: 150px; /* Or adjust as per your requirements */
    max-width: 100%;
    height: auto;
}
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
        <img src="https://7janpathforex.com/wp-content/uploads/2021/12/7janpath_Logo-removebg-preview.png" alt="7TravelMoney">
            <h1>Contact Us Query Received</h1>
        </div>
        <div class="email-content">
            <p>Dear ${contactus.name},</p>
            <p>Thank you for reaching out to us. We have received your query and one of our support team members will get back to you shortly. Below is a summary of your query:</p>

            <div class="query-summary">
                <h3>Query Details:</h3>
                <p><strong>Name:</strong> ${contactus.name}</p>
                <p><strong>Email:</strong> ${contactus.email}</p>
                <p><strong>Phone:</strong> ${contactus.mobile}</p>
                <p><strong>Inquiry Type:</strong> ${contactus.inquiry_type}</p>
                <p><strong>Your Message:</strong> ${contactus.message}</p>
            </div>

            <p>If you need immediate assistance or if your query is urgent, please feel free to contact us by phone or email.</p>

            <p>Thank you for contacting 7TravelMoney. We appreciate your patience and will respond to your inquiry as soon as possible.</p>

            <p>Best regards,<br>
            7TravelMoney Support Team</p>

             <a href="https://7travelmoney.com/contact-us" class="button">Contact Support</a>
        </div>
        <div class="email-footer">
             <p>&copy; 2024 7TravelMoney. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

    const subject = `Contact Us Query Received`;
    await this.emailService.sendEmail(contactus.email, subject, mailBody);
    return this.contactusRepository.create(contactus);
  }

  @get('/contactus')
  @response(200, {
    description: 'Array of Contactus model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Contactus, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Contactus) filter?: Filter<Contactus>,
  ): Promise<Contactus[]> {
    return this.contactusRepository.find(filter);
  }

  @get('/contactus/{id}')
  @response(200, {
    description: 'Contactus model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Contactus, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Contactus, {exclude: 'where'}) filter?: FilterExcludingWhere<Contactus>
  ): Promise<Contactus> {
    return this.contactusRepository.findById(id, filter);
  }

  @patch('/contactus/{id}')
  @response(204, {
    description: 'Contactus PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactus, {partial: true}),
        },
      },
    })
    contactus: Contactus,
  ): Promise<void> {
    await this.contactusRepository.updateById(id, contactus);
  }

  // @del('/contactus/{id}')
  // @response(204, {
  //   description: 'Contactus DELETE success',
  // })
  // async deleteById(@param.path.number('id') id: number): Promise<void> {
  //   await this.contactusRepository.deleteById(id);
  // }
}
