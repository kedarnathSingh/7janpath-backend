import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
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
import {Setting} from '../models';
import {SettingRepository} from '../repositories';

export class SettingController {
  constructor(
    @repository(SettingRepository)
    public settingRepository: SettingRepository,
  ) { }

  @post('/settings')
  @response(200, {
    description: 'Setting model instance',
    content: {'application/json': {schema: getModelSchemaRef(Setting)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Setting, {
            title: 'NewSetting',
            exclude: ['id'],
          }),
        },
      },
    })
    setting: Omit<Setting, 'id'>,
  ): Promise<Setting> {
    return this.settingRepository.create(setting);
  }

  @get('/settings/count')
  @response(200, {
    description: 'Setting model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Setting) where?: Where<Setting>,
  ): Promise<Count> {
    return this.settingRepository.count(where);
  }

  @get('/settings')
  @response(200, {
    description: 'Array of Setting model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Setting, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Setting) filter?: Filter<Setting>,
  ): Promise<Setting[]> {
    return this.settingRepository.find(filter);
  }

  @patch('/settings')
  @response(200, {
    description: 'Setting PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Setting, {partial: true}),
        },
      },
    })
    setting: Setting,
    @param.where(Setting) where?: Where<Setting>,
  ): Promise<Count> {
    return this.settingRepository.updateAll(setting, where);
  }

  @get('/settings/{slug}')
  @response(200, {
    description: 'Setting model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Setting, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('slug') slug: string,
    // @param.filter(Setting, {exclude: 'where'}) filter?: FilterExcludingWhere<Setting>
  ): Promise<any> {
    // return this.settingRepository.findById(id, filter);
    return this.settingRepository.findOne({where: {slug: slug}});
  }

  @patch('/settings/{id}')
  @response(204, {
    description: 'Setting PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Setting, {partial: true}),
        },
      },
    })
    setting: Setting,
  ): Promise<void> {
    await this.settingRepository.updateById(id, setting);
  }

  @put('/settings/{id}')
  @response(204, {
    description: 'Setting PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() setting: Setting,
  ): Promise<void> {
    await this.settingRepository.replaceById(id, setting);
  }

  @del('/settings/{id}')
  @response(204, {
    description: 'Setting DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.settingRepository.deleteById(id);
  }

  @get('/settings/exchange-rates')
  @response(200, {
    description: 'Array of Setting model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
        },
      },
    },
  })
  async findExchangeRates(
  ): Promise<any> {

    // const nodemailer = require("nodemailer");

    // const transporter = nodemailer.createTransport({
    //   // "type": "smtp",
    //   "host": "smtp.gmail.com",
    //   "secure": false,
    //   "port": 587,
    //   "tls": {
    //     "rejectUnauthorized": false
    //   }, // true for port 465, false for other ports
    //   auth: {
    //     user: "ashishiimtion.99@gmail.com",
    //     pass: "Ashu@1901",
    //   },
    // });
    // const info = await transporter.sendMail({
    //   from: "ashishiimtion.99@gmail.com", // sender address
    //   to: "akkatiyar786@gmail.com", // list of receivers
    //   subject: "Hello ✔", // Subject line
    //   text: "Hello world?", // plain text body
    //   html: "<b>Hello world?</b>", // html body
    // });

    // console.log("Message sent: %s", info.messageId);

    var request = require('request');
    // request('https://openexchangerates.org/api/latest.json?app_id=daa32f7dd7544fb192afab3429d98624&base=USD', function (error: any, response: any, body: any) {
    return request('https://apicrm.7travelmoney.com/currencies/list', function (error: any, response: any, body: any) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        return body;
      }
    });
  }
}
