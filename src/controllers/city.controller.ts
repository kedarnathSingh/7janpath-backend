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
import {CityList} from '../models';
import {CityListRepository} from '../repositories';

export class CityController {
  constructor(
    @repository(CityListRepository)
    public cityListRepository : CityListRepository,
  ) {}

  @post('/city-lists')
  @response(200, {
    description: 'CityList model instance',
    content: {'application/json': {schema: getModelSchemaRef(CityList)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CityList, {
            title: 'NewCityList',
            exclude: ['id'],
          }),
        },
      },
    })
    cityList: Omit<CityList, 'id'>,
  ): Promise<CityList> {
    return this.cityListRepository.create(cityList);
  }

  @get('/city-lists/count')
  @response(200, {
    description: 'CityList model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CityList) where?: Where<CityList>,
  ): Promise<Count> {
    return this.cityListRepository.count(where);
  }

  @get('/city-lists')
  @response(200, {
    description: 'Array of CityList model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CityList, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CityList) filter?: Filter<CityList>,
  ): Promise<CityList[]> {
    return this.cityListRepository.find(filter);
  }

  @patch('/city-lists')
  @response(200, {
    description: 'CityList PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CityList, {partial: true}),
        },
      },
    })
    cityList: CityList,
    @param.where(CityList) where?: Where<CityList>,
  ): Promise<Count> {
    return this.cityListRepository.updateAll(cityList, where);
  }

  @get('/city-lists/{id}')
  @response(200, {
    description: 'CityList model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CityList, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CityList, {exclude: 'where'}) filter?: FilterExcludingWhere<CityList>
  ): Promise<CityList> {
    return this.cityListRepository.findById(id, filter);
  }

  @patch('/city-lists/{id}')
  @response(204, {
    description: 'CityList PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CityList, {partial: true}),
        },
      },
    })
    cityList: CityList,
  ): Promise<void> {
    await this.cityListRepository.updateById(id, cityList);
  }

  @put('/city-lists/{id}')
  @response(204, {
    description: 'CityList PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cityList: CityList,
  ): Promise<void> {
    await this.cityListRepository.replaceById(id, cityList);
  }

  @del('/city-lists/{id}')
  @response(204, {
    description: 'CityList DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cityListRepository.deleteById(id);
  }
}
