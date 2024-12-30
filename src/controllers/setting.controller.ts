import {inject} from '@loopback/core';
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
import {EmailService} from '../services/email.service';

export class SettingController {
  constructor(
    @repository(SettingRepository)
    public settingRepository: SettingRepository,
    @inject('services.EmailService')
    protected emailService: EmailService,
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
    return this.settingRepository.findOne({where: {page_slug: slug}});
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

  @get('/settings/send-mail')
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
  async sendMails(
  ): Promise<any> { 
    // console.log("Message sent: %s", info.messageId);
  }
}
