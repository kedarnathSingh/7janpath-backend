import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
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
import {CurrencyType} from '../models';
import {CurrencyTypeRepository} from '../repositories';

export class CurrencyTypeController {
  constructor(
    @repository(CurrencyTypeRepository)
    public currencyTypeRepository: CurrencyTypeRepository,
  ) { }

  @post('/currency-types')
  @response(200, {
    description: 'CurrencyType model instance',
    content: {'application/json': {schema: getModelSchemaRef(CurrencyType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CurrencyType, {
            title: 'NewCurrencyType',
            exclude: ['id'],
          }),
        },
      },
    })
    currencyType: Omit<CurrencyType, 'id'>,
  ): Promise<CurrencyType> {
    return this.currencyTypeRepository.create(currencyType);
  }

  // @get('/currency-types/count')
  // @response(200, {
  //   description: 'CurrencyType model count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async count(
  //   @param.where(CurrencyType) where?: Where<CurrencyType>,
  // ): Promise<Count> {
  //   return this.currencyTypeRepository.count(where);
  // }

  @get('/currency-types')
  @response(200, {
    description: 'Array of CurrencyType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CurrencyType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CurrencyType) filter?: Filter<CurrencyType>,
  ): Promise<CurrencyType[]> {
    return this.currencyTypeRepository.find(filter);
  }

  @patch('/currency-types')
  @response(200, {
    description: 'CurrencyType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CurrencyType, {partial: true}),
        },
      },
    })
    currencyType: CurrencyType,
    @param.where(CurrencyType) where?: Where<CurrencyType>,
  ): Promise<Count> {
    return this.currencyTypeRepository.updateAll(currencyType, where);
  }

  @get('/currency-types/{id}')
  @response(200, {
    description: 'CurrencyType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CurrencyType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CurrencyType, {exclude: 'where'}) filter?: FilterExcludingWhere<CurrencyType>
  ): Promise<CurrencyType> {
    return this.currencyTypeRepository.findById(id, filter);
  }

  @patch('/currency-types/{id}')
  @response(204, {
    description: 'CurrencyType PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CurrencyType, {partial: true}),
        },
      },
    })
    currencyType: CurrencyType,
  ): Promise<void> {
    await this.currencyTypeRepository.updateById(id, currencyType);
  }

  @put('/currency-types/{id}')
  @response(204, {
    description: 'CurrencyType PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() currencyType: CurrencyType,
  ): Promise<void> {
    await this.currencyTypeRepository.replaceById(id, currencyType);
  }

  // @del('/currency-types/{id}')
  // @response(204, {
  //   description: 'CurrencyType DELETE success',
  // })
  // async deleteById(@param.path.number('id') id: number): Promise<void> {
  //   await this.currencyTypeRepository.deleteById(id);
  // }
}
