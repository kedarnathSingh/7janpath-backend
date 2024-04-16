import {
  Count,
  CountSchema,
  FilterExcludingWhere,
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
import {now} from 'lodash';
import {BaseCurrency} from '../models';
import {BaseCurrencyRepository} from '../repositories';

export class BaseCurrencyController {
  constructor(
    @repository(BaseCurrencyRepository)
    public baseCurrencyRepository: BaseCurrencyRepository,
  ) { }

  @post('/base-currencies')
  @response(200, {
    description: 'BaseCurrency model instance',
    content: {'application/json': {schema: getModelSchemaRef(BaseCurrency)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BaseCurrency, {
            title: 'NewBaseCurrency',
            exclude: ['id'],
          }),
        },
      },
    })
    baseCurrency: Omit<BaseCurrency, 'id'>,
  ): Promise<BaseCurrency> {
    return this.baseCurrencyRepository.create(baseCurrency);
  }

  @get('/base-currencies/count')
  @response(200, {
    description: 'BaseCurrency model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BaseCurrency) where?: Where<BaseCurrency>,
  ): Promise<Count> {
    return this.baseCurrencyRepository.count(where);
  }

  @get('/base-currencies')
  @response(200, {
    description: 'Array of BaseCurrency model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BaseCurrency, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    // @param.filter(BaseCurrency) filter?: Filter<BaseCurrency>,
    @param.filter(BaseCurrency, {exclude: 'where'}) filter?: FilterExcludingWhere<BaseCurrency>
  ): Promise<BaseCurrency[]> {
    let delay = 60 * 60 * 1000; // 1 hour in msec
    setInterval(() => {
      let url = "https://openexchangerates.org/api/latest.json?app_id=daa32f7dd7544fb192afab3429d98624";
      const request = require('request');
      let options = {json: true};
      request(url, options, async (error: any, res: any, body: any) => {
        if (error) {
          return console.log(error)
        };
        if (!error && res.statusCode == 200) {
          // do something with JSON, using the 'body' variable
          const arrFromObjKeys = Object.keys(body.rates);
          const arrFromObjValues = Object.values(body.rates);
          for (let i = 0; i < arrFromObjKeys.length; i++) {
            let countrecord = await this.baseCurrencyRepository.findOne({where: {currency: arrFromObjKeys[i]}});
            if (countrecord) {
              let payload: any = {
                "rate": arrFromObjValues[i],
                "updated_at": now()
              }
              await this.baseCurrencyRepository.updateById(countrecord.id, payload);
            } else {
              let payload: any = {
                "currency": arrFromObjKeys[i],
                "rate": arrFromObjValues[i],
                "status": true,
                "created_at": now(),
                "updated_at": now()
              }
              this.baseCurrencyRepository.create(payload);
            }
          }
        };
      });
    }, delay);
    return this.baseCurrencyRepository.find(filter);
  }

  @patch('/base-currencies')
  @response(200, {
    description: 'BaseCurrency PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BaseCurrency, {partial: true}),
        },
      },
    })
    baseCurrency: BaseCurrency,
    @param.where(BaseCurrency) where?: Where<BaseCurrency>,
  ): Promise<Count> {
    return this.baseCurrencyRepository.updateAll(baseCurrency, where);
  }

  @get('/base-currencies/{id}')
  @response(200, {
    description: 'BaseCurrency model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BaseCurrency, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(BaseCurrency, {exclude: 'where'}) filter?: FilterExcludingWhere<BaseCurrency>
  ): Promise<BaseCurrency> {
    return this.baseCurrencyRepository.findById(id, filter);
  }

  @patch('/base-currencies/{id}')
  @response(204, {
    description: 'BaseCurrency PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BaseCurrency, {partial: true}),
        },
      },
    })
    baseCurrency: BaseCurrency,
  ): Promise<void> {
    await this.baseCurrencyRepository.updateById(id, baseCurrency);
  }

  @put('/base-currencies/{id}')
  @response(204, {
    description: 'BaseCurrency PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() baseCurrency: BaseCurrency,
  ): Promise<void> {
    await this.baseCurrencyRepository.replaceById(id, baseCurrency);
  }

  @del('/base-currencies/{id}')
  @response(204, {
    description: 'BaseCurrency DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.baseCurrencyRepository.deleteById(id);
  }
}
