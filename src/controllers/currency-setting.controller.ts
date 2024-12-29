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
import {CurrencySetting, Gst} from '../models';
import {CurrencySettingRepository, GstRepository} from '../repositories';

export class CurrencySettingController {
  constructor(
    @repository(CurrencySettingRepository)
    public currencySettingRepository: CurrencySettingRepository,
    @repository(GstRepository)
    public gstRepository: GstRepository,
  ) { }

  @post('/currency-settings')
  @response(200, {
    description: 'CurrencySetting model instance',
    content: {'application/json': {schema: getModelSchemaRef(CurrencySetting)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CurrencySetting, {
            title: 'NewCurrencySetting',
            exclude: ['id'],
          }),
        },
      },
    })
    currencySetting: Omit<CurrencySetting, 'id'>,
  ): Promise<CurrencySetting> {
    return this.currencySettingRepository.create(currencySetting);
  }

  @get('/currency-settings/count')
  @response(200, {
    description: 'CurrencySetting model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CurrencySetting) where?: Where<CurrencySetting>,
  ): Promise<Count> {
    return this.currencySettingRepository.count(where);
  }

  @get('/currency-settings')
  @response(200, {
    description: 'Array of CurrencySetting model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CurrencySetting, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CurrencySetting) filter?: Filter<CurrencySetting>,
  ): Promise<CurrencySetting[]> {
    return this.currencySettingRepository.find(filter);
  }

  @patch('/currency-settings')
  @response(200, {
    description: 'CurrencySetting PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CurrencySetting, {partial: true}),
        },
      },
    })
    currencySetting: CurrencySetting,
    @param.where(CurrencySetting) where?: Where<CurrencySetting>,
  ): Promise<Count> {
    return this.currencySettingRepository.updateAll(currencySetting, where);
  }

  @get('/currency-settings/{id}')
  @response(200, {
    description: 'CurrencySetting model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CurrencySetting, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CurrencySetting, {exclude: 'where'}) filter?: FilterExcludingWhere<CurrencySetting>
  ): Promise<CurrencySetting> {
    return this.currencySettingRepository.findById(id, filter);
  }

  @patch('/currency-settings/{id}')
  @response(204, {
    description: 'CurrencySetting PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CurrencySetting, {partial: true}),
        },
      },
    })
    currencySetting: CurrencySetting,
  ): Promise<void> {
    await this.currencySettingRepository.updateById(id, currencySetting);
  }

  @put('/currency-settings/{id}')
  @response(204, {
    description: 'CurrencySetting PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() currencySetting: CurrencySetting,
  ): Promise<void> {
    await this.currencySettingRepository.replaceById(id, currencySetting);
  }

  @del('/currency-settings/{id}')
  @response(204, {
    description: 'CurrencySetting DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.currencySettingRepository.deleteById(id);
  }

  @post('/gst')
  @response(200, {
    description: 'GstSetting model instance',
    content: {'application/json': {schema: getModelSchemaRef(Gst)}},
  })
  async createGst(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gst, {
            title: 'NewGstSetting',
            exclude: ['id'],
          }),
        },
      },
    })
    gst: Omit<Gst, 'id'>,
  ): Promise<Gst> {
    return this.gstRepository.create(gst);
  }

  @get('/gst')
  @response(200, {
    description: 'Array of GstSetting model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Gst, {includeRelations: true}),
        },
      },
    },
  })
  async findGst(
    // @param.filter(Gst) filter?: Filter<Gst>,
  ): Promise<Gst[]> {
    return this.gstRepository.find({where: {status: true}});
  }
}
