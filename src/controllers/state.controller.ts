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
import {StateList} from '../models';
import {StateListRepository} from '../repositories';

export class StateController {
  constructor(
    @repository(StateListRepository)
    public stateListRepository : StateListRepository,
  ) {}

  @post('/state-lists')
  @response(200, {
    description: 'StateList model instance',
    content: {'application/json': {schema: getModelSchemaRef(StateList)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StateList, {
            title: 'NewStateList',
            exclude: ['id'],
          }),
        },
      },
    })
    stateList: Omit<StateList, 'id'>,
  ): Promise<StateList> {
    return this.stateListRepository.create(stateList);
  }

  @get('/state-lists/count')
  @response(200, {
    description: 'StateList model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(StateList) where?: Where<StateList>,
  ): Promise<Count> {
    return this.stateListRepository.count(where);
  }

  @get('/state-lists')
  @response(200, {
    description: 'Array of StateList model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(StateList, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(StateList) filter?: Filter<StateList>,
  ): Promise<StateList[]> {
    return this.stateListRepository.find(filter);
  }

  @patch('/state-lists')
  @response(200, {
    description: 'StateList PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StateList, {partial: true}),
        },
      },
    })
    stateList: StateList,
    @param.where(StateList) where?: Where<StateList>,
  ): Promise<Count> {
    return this.stateListRepository.updateAll(stateList, where);
  }

  @get('/state-lists/{id}')
  @response(200, {
    description: 'StateList model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(StateList, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(StateList, {exclude: 'where'}) filter?: FilterExcludingWhere<StateList>
  ): Promise<StateList> {
    return this.stateListRepository.findById(id, filter);
  }

  @patch('/state-lists/{id}')
  @response(204, {
    description: 'StateList PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StateList, {partial: true}),
        },
      },
    })
    stateList: StateList,
  ): Promise<void> {
    await this.stateListRepository.updateById(id, stateList);
  }

  @put('/state-lists/{id}')
  @response(204, {
    description: 'StateList PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() stateList: StateList,
  ): Promise<void> {
    await this.stateListRepository.replaceById(id, stateList);
  }

  @del('/state-lists/{id}')
  @response(204, {
    description: 'StateList DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.stateListRepository.deleteById(id);
  }
}
