import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {CountryList} from '../models';
import {CountryListRepository} from '../repositories';

export class CountryController {
  constructor(
    @repository(CountryListRepository)
    public countryListRepository : CountryListRepository,
  ) {}

  @post('/country-lists')
  @response(200, {
    description: 'CountryList model instance',
    content: {'application/json': {schema: getModelSchemaRef(CountryList)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CountryList, {
            title: 'NewCountryList',
            exclude: ['id'],
          }),
        },
      },
    })
    countryList: Omit<CountryList, 'id'>,
  ): Promise<CountryList> {
    return this.countryListRepository.create(countryList);
  }

  @get('/country-lists/count')
  @response(200, {
    description: 'CountryList model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CountryList) where?: Where<CountryList>,
  ): Promise<Count> {
    return this.countryListRepository.count(where);
  }

  @get('/country-lists')
  @response(200, {
    description: 'Array of CountryList model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CountryList, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CountryList) filter?: Filter<CountryList>,
  ): Promise<CountryList[]> {
    return this.countryListRepository.find(filter);
  }

  @patch('/country-lists')
  @response(200, {
    description: 'CountryList PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CountryList, {partial: true}),
        },
      },
    })
    countryList: CountryList,
    @param.where(CountryList) where?: Where<CountryList>,
  ): Promise<Count> {
    return this.countryListRepository.updateAll(countryList, where);
  }

  @get('/country-lists/{id}')
  @response(200, {
    description: 'CountryList model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CountryList, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CountryList, {exclude: 'where'}) filter?: FilterExcludingWhere<CountryList>
  ): Promise<CountryList> {
    return this.countryListRepository.findById(id, filter);
  }

  @patch('/country-lists/{id}')
  @response(204, {
    description: 'CountryList PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CountryList, {partial: true}),
        },
      },
    })
    countryList: CountryList,
  ): Promise<void> {
    await this.countryListRepository.updateById(id, countryList);
  }

  @put('/country-lists/{id}')
  @response(204, {
    description: 'CountryList PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() countryList: CountryList,
  ): Promise<void> {
    await this.countryListRepository.replaceById(id, countryList);
  }

  @del('/country-lists/{id}')
  @response(204, {
    description: 'CountryList DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.countryListRepository.deleteById(id);
  }
}
