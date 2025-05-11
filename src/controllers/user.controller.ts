import {inject} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {EmailService} from '../services/email.service';
import {UserService} from '../services/user.service';

export type Credentials = {
  email: string;
  otp: string;
};

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject('services.EmailService')
    protected emailService: EmailService,
    @inject('services.UserService')
    protected userService: UserService,
  ) { }

  @post('/user')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.userRepository.create(user);
  }

  // @get('/cities')
  // @response(200, {
  //   description: 'Array of City model instances',
  //   content: {
  //     'application/json': {
  //       schema: {
  //         type: 'array',
  //         items: getModelSchemaRef(City, {includeRelations: true}),
  //       },
  //     },
  //   },
  // })
  // async find(
  //   @param.filter(City) filter?: Filter<City>,
  // ): Promise<City[]> {
  //   return this.cityRepository.find({where: {status: true}});
  // }

  @get('/user/{email}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findByEmail(
    @param.path.string('email') email: string
  ): Promise<any> {
    const findUser: any = await this.userRepository.findOne({where: {email: email}});
    if (findUser) {
      const otp: number = Math.floor(100000 + Math.random() * 900000);
      const mailBody = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Code for Verification</title>
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
            max-width: 900px;
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
            color: black;
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
            background-color: #f9f9f9;
            color: black;
            padding: 10px 20px;
            border: 1px solid #ddd;
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
        <img src="https://7travelmoney.com/images/logo.svg" style="width:200px;height:77px;" alt="7TravelMoney">
        </div>
        <div class="email-content">
            <p>Dear ${findUser.name},</p>
            <p>Your One-Time Password (OTP) for verification is:</p>

            <div class="query-summary">
                 <br/>
                <b>OTP: ${otp}
            </div>

            <p>This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>
            <p>If you need immediate assistance or if your query is urgent, please feel free to contact us by phone or email.</p>

            <p>Best regards,<br>
            7TravelMoney Support Team
            <br>Ph. 9810474842</p>

             <a href="https://7travelmoney.com/contact-us" style="display: inline-block;
            background-color: #f9f9f9;
            color: black;
            padding: 10px 20px;
            border: 1px solid #ddd;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 10px;">Contact Support</a>
        </div>
        <div class="email-footer">
             <p>&copy; 2024 7TravelMoney. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
      const subject = `Your OTP Code for Verification`;
      await this.emailService.sendEmail(email, subject, mailBody);
      return await this.userRepository.updateById(findUser.id, {
        password: otp.toString(),
      });
    } else {
      return;
    }
  }

  @post('/user/login')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async loginByEmailOtp(
    @requestBody() credentials: Credentials,
  ): Promise<any> {
    // return this.userRepository.findOne({where: {email: credentials.email, password: credentials.otp}});
    return await this.userService.verifyCredentials(credentials);
  }

}
