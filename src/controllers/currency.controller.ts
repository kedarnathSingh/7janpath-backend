import {
  FilterExcludingWhere,
  Options,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {Currency} from '../models';
import {CurrencyRepository} from '../repositories';


export class CurrencyController {
  constructor(
    @repository(CurrencyRepository)
    public currencyRepository: CurrencyRepository,
  ) { }

  @post('/currencies/exchange-rates')
  @response(200, {
    description: 'Currency model instance',
    content: {'application/json': {schema: getModelSchemaRef(Currency)}},
  })
  async findExchangeRates(
    @requestBody({
      required: false,
      content: {
        'application/json': {
          schema: getModelSchemaRef(Currency, {
            title: 'NewCurrency',
            exclude: ['id'],
          }),
        },
      },
    })
    currency: Omit<Currency, 'id'>,
  ): Promise<any> {
    var request = require('request');
    let data: any;
    request('https://openexchangerates.org/api/latest.json?app_id=daa32f7dd7544fb192afab3429d98624&base=USD', async (error: any, response: any, body: any) => {
      if (!error && response.statusCode == 200) {
        if (body) {
          data = JSON.parse(body);
          await this.currencyRepository.deleteAll();
          const arr: any = ['AUD', 'GBP', 'INR', 'IQD', 'MYR', 'SGD', 'THB', 'USD'];
          const filteredRates = Object.keys(data.rates || {})
            .filter(currency => arr.includes(currency))
            .reduce((acc: any, currency) => {
              acc[currency] = data.rates[currency];
              return acc;
            }, {});
          let date = new Date();
          let id: number = 1;
          for (var key in filteredRates) {
            let payload: Currency = {
              id: id++,
              name: key,
              symbol: key,
              rate: filteredRates[key],
              status: true,
              priority: 0,
              created_at: date.toString(),
              updated_at: date.toString(),
              getId: function () {
                throw new Error('Function not implemented.');
              },
              getIdObject: function (): Object {
                throw new Error('Function not implemented.');
              },
              toJSON: function (): Object {
                throw new Error('Function not implemented.');
              },
              toObject: function (options?: Options): Object {
                throw new Error('Function not implemented.');
              }
            }
            this.currencyRepository.create(payload);
          }
          return;
        }
      }
    });
  }

  @post('/currencies')
  @response(200, {
    description: 'Currency model instance',
    content: {'application/json': {schema: getModelSchemaRef(Currency)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Currency, {
            title: 'NewCurrency',
            exclude: ['id'],
          }),
        },
      },
    })
    currency: Omit<Currency, 'id'>,
  ): Promise<Currency> {
    return this.currencyRepository.create(currency);
  }

  @get('/currencies')
  @response(200, {
    description: 'Array of Currency model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Currency, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    // @param.filter(Currency) filter?: Filter<Currency>,
  ): Promise<Currency[]> {
    return this.currencyRepository.find({where: {status: true}}, {order: ['priority DESC']});
  }

  @get('/currencies/{id}')
  @response(200, {
    description: 'Currency model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Currency, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Currency, {exclude: 'where'}) filter?: FilterExcludingWhere<Currency>
  ): Promise<Currency> {
    return this.currencyRepository.findById(id, filter);
  }

  @patch('/currencies/{id}')
  @response(204, {
    description: 'Currency PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Currency, {partial: true}),
        },
      },
    })
    currency: Currency,
  ): Promise<void> {
    await this.currencyRepository.updateById(id, currency);
  }

  @put('/currencies/{id}')
  @response(204, {
    description: 'Currency PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() currency: Currency,
  ): Promise<void> {
    await this.currencyRepository.replaceById(id, currency);
  }

  @get('/currencies/list')
  @response(200, {
    description: 'Array of Currency model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Currency, {includeRelations: true}),
        },
      },
    },
  })
  async findList(
    // @param.filter(Currency) filter?: Filter<Currency>,
  ): Promise<Currency[]> {
    return this.currencyRepository.find({where: {status: true}}, {order: ['priority DESC']});
  }

}
