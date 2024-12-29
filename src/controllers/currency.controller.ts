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
import {CurrencyRepository, CurrencySettingRepository, SettingRepository} from '../repositories';


export class CurrencyController {
  constructor(
    @repository(CurrencyRepository)
    public currencyRepository: CurrencyRepository,
    @repository(SettingRepository)
    public settingRepository: SettingRepository,
    @repository(CurrencySettingRepository)
    public currencySettingRepository: CurrencySettingRepository
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
    const request = require('request');

    let data: any;
    request('https://openexchangerates.org/api/latest.json?app_id=daa32f7dd7544fb192afab3429d98624&base=USD', async (error: any, response: any, body: any) => {
      if (error || response.statusCode !== 200) {
        console.error('Failed to fetch data:', error);
        return;
      }
      data = JSON.parse(body);
      if (!data.rates) {
        console.error('No rates found in response.');
        return;
      }
      await this.currencyRepository.deleteAll();
      // const commissions = await this.settingRepository.find({
      //   where: {page_slug: {between: ['buy_commision', 'sell_commision']}}
      // });
      const commissions = await this.currencySettingRepository.find();
      const arr: string[] = ['INR', 'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'NZD', 'AED', 'SGD', 'THB', 'CHF', 'JPY', 'HKD', 'MYR', 'SAR', 'CNY', 'IDR', 'TRY', 'VND'];
      const filteredRates = Object.keys(data.rates)
        .filter(currency => arr.includes(currency))
        .reduce((acc: Record<string, number>, currency) => {
          acc[currency] = data.rates[currency];
          return acc;
        }, {});
      const inrValue = filteredRates.INR;
      delete filteredRates.INR;
      const date = new Date();
      // const commissionTypes = commissions.map((comm: any) => ({
      //   type: comm.comm_type,
      //   value: parseFloat(comm.content)
      // }));

      let id = 1;

      for (const key in filteredRates) {
        const rate = parseFloat((inrValue / filteredRates[key]).toFixed(2));
        // const buy_rate = this.currencyRepository.calculateRate(rate, commissionTypes[0]);
        // const sell_rate = this.currencyRepository.calculateRate(rate, commissionTypes[1]);
        //  const commissionTypes = commissions.find((comm: any) =>{
        //   if(comm.currency === key){
        //     [{
        //       type: comm.buy_comm_rate_type,
        //       value: comm.buy_rate
        //     }, {
        //       type: comm.sell_comm_rate_type,
        //       value: comm.sell_rate
        //     }]
        //    }});
        const settingData: any = commissions.find((currency: any) => currency.currency == key);
        const buy_rate = this.currencyRepository.calculateRate(rate, settingData?.buy_rate, settingData?.buy_comm_rate_type);
        const sell_rate = this.currencyRepository.calculateRate(rate, settingData?.sell_rate, settingData?.sell_comm_rate_type);

        const payload: Currency = {
          id: id++,
          name: key,
          symbol: key,
          rate,
          status: true,
          priority: 0,
          created_at: date.toString(),
          updated_at: date.toString(),
          buy_rate,
          sell_rate,
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
        };

        await this.currencyRepository.create(payload);
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
