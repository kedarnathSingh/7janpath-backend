import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Custom, Enquiry} from '../models';
import {EnquiryRepository, GstRepository, SettingRepository} from '../repositories';
import {EmailService} from '../services/email.service';
import {EnquiryService} from '../services/enquiry.service';

export class EnquiryController {
  constructor(
    @repository(EnquiryRepository)
    public enquiryRepository: EnquiryRepository,
    @inject('services.EmailService')
    protected emailService: EmailService,
    @repository(SettingRepository)
    public settingRepository: SettingRepository,
    @repository(GstRepository)
    public gstRepository: GstRepository,
    @inject('services.EnquiryService')
    protected enquiryService: EnquiryService
  ) { }

  @post('/enquiry/order-summery')
  @response(200, {
    description: 'Return Order Summery',
    content: {'application/json': {schema: getModelSchemaRef(Custom)}},
  })
  async orderSummery(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Custom, {
            title: 'NewOrderSummery',
            exclude: ['id', 'total_amount', 'service_charge', 'gst'],
          }),
        },
      },
    })
    custom: Omit<Custom, 'id'>,
  ): Promise<Custom> {
    const amount: any = custom.inr_amount;
    const getServiceCharge: any = await this.settingRepository.findOne({where: {page_slug: 'service_charges'}});
    custom.service_charge = parseFloat(getServiceCharge.content);
    const getGstData: any = await this.gstRepository.find({where: {status: true}});
    const gst: any = await this.enquiryService.calculateGst(custom.inr_amount, getGstData);
    let gstAmount = Number(gst);
    custom.gst = parseFloat(gstAmount.toFixed(2));
    custom.total_amount = amount + custom.gst + custom.service_charge;
    return custom;
  }

  @post('/enquiry')
  @response(200, {
    description: 'Enquiry model instance',
    content: {'application/json': {schema: getModelSchemaRef(Enquiry)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enquiry, {
            title: 'NewEnquiry',
            exclude: ['id', 'order_number'],
          }),
        },
      },
    })
    enquiry: Omit<Enquiry, 'id'>,
  ): Promise<Enquiry> {
    enquiry.order_number = '7TM_' + Math.floor(1000000000 + Math.random() * 9000000000);
    // const getServiceCharge: any = await this.settingRepository.findOne({where: {page_slug: 'service_charges'}});
    // enquiry.service_charge = parseFloat(getServiceCharge.content);
    // const getGstData: any = await this.gstRepository.find({where: {status: true}});
    // enquiry.gst = await this.enquiryService.calculateGst(enquiry.total_amount, getGstData);
    // enquiry.total_amount = enquiry.total_amount + (parseFloat(enquiry.gst) + parseFloat(enquiry.service_charge));

    const date = new Date(enquiry.created_at);
    const formattedDate = date.toLocaleDateString('en-GB');
    const mailBody = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Received Information</title>
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
      .order-summary {
          margin-top: 20px;
          padding: 10px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 4px;
      }
      .order-summary table {
          width: 100%;
          border-collapse: collapse;
      }
      .order-summary th, .order-summary td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
      }
      .total {
          text-align: right;
          font-weight: bold;
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
          <h1>Order Received Information</h1>
      </div>
      <div class="email-content">
          <p>Hello ${enquiry.name},</p>
          <p>Thank you for placing an order with us! Below is a summary of your currency order:</p>

          <p><strong>Order Number:</strong> ${enquiry.order_number}</p>
          <p><strong>Name:</strong> ${enquiry.name}</p>
          <p><strong>Email:</strong> ${enquiry.email}</p>
          <p><strong>Contact Number:</strong> ${enquiry.mobile}</p>
          <p><strong>Address:</strong> ${enquiry.address}</p>
          <p><strong>Order Date:</strong> ${formattedDate}</p>

          <div class="order-summary">
              <h3>Order Details:</h3>
              <table>
                  <tr>
                      <th>Currency</th>
                      <th>Product</th>
                      <th>Forex Amount</th>
                      <th>Rate</th>
                      <th>Amount of Currency Exchanged<br/>(INR)</th>
                      <th>Service Charges + GST</th>
                      <th>GST<br/>(Slabwise)</th>
                      <th>Inr Amount</th>
                  </tr>
                  <tr>
                      <td>${enquiry.currency_you_want}</td>
                      <td>${enquiry.currency_type}</td>
                      <td>${enquiry.forex_amount}</td>
                      <td>${enquiry.forex_rate}</td>
                      <td>${enquiry.forex_amount * enquiry.forex_rate}</td>
                      <td>${enquiry.service_charge}</td>
                      <td>${enquiry.gst}</td>
                      <td>${enquiry.total_amount}</td>

                  </tr>
                  <!-- Additional currency rows can be added here -->
                  <tr>
                      <td colspan="7" class="total">Total Amount</td>
                      <td class="total">Rs.${enquiry.total_amount}</td>
                  </tr>
              </table>
          </div>

          <p>If you have any questions or need further assistance, feel free to contact our support team.</p>

          <p>Best regards,<br>
          7TravelMoney</p>
          <a href="https://7travelmoney.com/contact-us" class="button">Contact Support</a>
      </div>
      <div class="email-footer">
          <p>&copy; 2024 7TravelMoney. All rights reserved.</p>
      </div>
  </div>
</body>
</html>
`;

    const subject = `Order Enquiry - ${enquiry.order_number}`;
    await this.emailService.sendEmail(enquiry.email, subject, mailBody);
    return this.enquiryRepository.create(enquiry);

    // const nodemailer = require('nodemailer');
    // let transporter = nodemailer.createTransport({
    //   type: 'smtp',
    //   host: 'smtp.gmail.com',
    //   secure: true, // Use SSL
    //   port: 465,
    //   tls: {
    //     rejectUnauthorized: false,
    //   },
    //   auth: {
    //     user: 'ashishiition.99@gmail.com', // Your Gmail address
    //     pass: 'bcgx iecm pdgs uccf', // Your Gmail password or App Password
    //   },
    // });
    // const transporter = nodemailer.createTransport({
    //   "type": "smtp",
    //   "host": "smtp.gmail.com",
    //   "secure": true,
    //   "port": 465,
    //   "tls": {
    //     "rejectUnauthorized": false
    //   }, // true for port 465, false for other ports
    //   auth: {
    //     user: 'ashishiimtion.99@gmail.com', // Your Gmail address
    //     pass: 'bcgx iecm pdgs uccf', // Your Gmail password or App Password
    //   },
    // });
    // return await transporter.sendMail({
    //   from: 'ashishiimtion.99@gmail.com',
    //   to: 'akkatiyar786@gmail.com',
    //   subject: 'Enquiry Test',
    //   html: 'You hace create a enquiry',
    // })
    // return this.enquiryRepository.create(enquiry);
  }

  @get('/enquiry/count')
  @response(200, {
    description: 'Enquiry model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Enquiry) where?: Where<Enquiry>,
  ): Promise<Count> {
    return this.enquiryRepository.count(where);
  }

  @get('/enquiry')
  @response(200, {
    description: 'Array of Enquiry model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Enquiry, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Enquiry) filter?: Filter<Enquiry>,
  ): Promise<Enquiry[]> {
    return this.enquiryRepository.find(filter);
  }

  @patch('/enquiry')
  @response(200, {
    description: 'Enquiry PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enquiry, {partial: true}),
        },
      },
    })
    enquiry: Enquiry,
    @param.where(Enquiry) where?: Where<Enquiry>,
  ): Promise<Count> {
    return this.enquiryRepository.updateAll(enquiry, where);
  }

  @get('/enquiry/{id}')
  @response(200, {
    description: 'Enquiry model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Enquiry, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Enquiry, {exclude: 'where'}) filter?: FilterExcludingWhere<Enquiry>
  ): Promise<Enquiry> {
    return this.enquiryRepository.findById(id, filter);
  }

  @patch('/enquiry/{id}')
  @response(204, {
    description: 'Enquiry PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enquiry, {partial: true}),
        },
      },
    })
    enquiry: Enquiry,
  ): Promise<void> {
    await this.enquiryRepository.updateById(id, enquiry);
  }

  @put('/enquiry/{id}')
  @response(204, {
    description: 'Enquiry PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() enquiry: Enquiry,
  ): Promise<void> {
    await this.enquiryRepository.replaceById(id, enquiry);
  }

  @del('/enquiry/{id}')
  @response(204, {
    description: 'Enquiry DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.enquiryRepository.deleteById(id);
  }

  @patch('/enquiry/{order_number}/{id}')
  @response(204, {
    description: 'Enquiry PATCH success',
  })
  async updateByOrderNumber(
    @param.path.string('order_number') order_number: string,
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enquiry, {partial: true}),
        },
      },
    })
    enquiry: Enquiry,
  ): Promise<void> {
    const data: any = await this.enquiryRepository.findOne({where: {order_number: order_number}});
    if (data) {
      const date = new Date(data.created_at);
      const formattedDate = date.toLocaleDateString('en-GB');
      const mailBody = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Received Information</title>
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
        .order-summary {
            margin-top: 20px;
            padding: 10px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .order-summary table {
            width: 100%;
            border-collapse: collapse;
        }
        .order-summary th, .order-summary td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        .total {
            text-align: right;
            font-weight: bold;
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
            <h1>Order Received Information</h1>
        </div>
        <div class="email-content">
            <p>Hello ${data.name},</p>
            <p>Thank you for placing an order with us! Below is a summary of your currency order:</p>

            <p><strong>Order Number:</strong> ${data.order_number}</p>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Contact Number:</strong> ${data.mobile}</p>
            <p><strong>Address:</strong> ${data.address}</p>
            <p><strong>Order Date:</strong> ${formattedDate}</p>

            <div class="order-summary">
                <h3>Order Details:</h3>
                <table>
                    <tr>
                        <th>Currency</th>
                        <th>Product</th>
                        <th>Forex Amount</th>
                        <th>Rate</th>
                        <th>Amount of Currency Exchanged<br/>(INR)</th>
                        <th>Service Charges + GST</th>
                        <th>GST<br/>(Slabwise)</th>
                        <th>Inr Amount</th>
                    </tr>
                    <tr>
                        <td>${data.currency_you_want}</td>
                        <td>${data.currency_type}</td>
                        <td>${data.forex_amount}</td>
                        <td>${data.forex_rate}</td>
                        <td>${data.forex_amount * data.forex_rate}</td>
                        <td>${data.service_charge}</td>
                        <td>${data.gst}</td>
                        <td>${data.total_amount}</td>

                    </tr>
                    <!-- Additional currency rows can be added here -->
                    <tr>
                        <td colspan="7" class="total">Total Amount</td>
                        <td class="total">Rs.${data.total_amount}</td>
                    </tr>
                </table>
            </div>

            <p>If you have any questions or need further assistance, feel free to contact our support team.</p>

            <p>Best regards,<br>
            7TravelMoney</p>
            <a href="https://7travelmoney.com/contact-us" class="button">Contact Support</a>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 7TravelMoney. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

      const subject = `Order Enquiry - ${data.order_number}`;
      await this.emailService.sendEmail(data.email, subject, mailBody);
      await this.enquiryRepository.updateById(id, enquiry);
    }
  }
}
