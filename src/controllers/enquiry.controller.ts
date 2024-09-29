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
import {EnquiryType} from '../models';
import {EnquiryTypeRepository} from '../repositories';

export class EnquiryController {
  constructor(
    @repository(EnquiryTypeRepository)
    public enquiryTypeRepository : EnquiryTypeRepository,
  ) {}

  @post('/enquiry')
  @response(200, {
    description: 'EnquiryType model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnquiryType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnquiryType, {
            title: 'NewEnquiryType',
            exclude: ['id'],
          }),
        },
      },
    })
    enquiryType: Omit<EnquiryType, 'id'>,
  ): Promise<EnquiryType> {
    return this.enquiryTypeRepository.create(enquiryType);
  }

  @get('/enquiry/count')
  @response(200, {
    description: 'EnquiryType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnquiryType) where?: Where<EnquiryType>,
  ): Promise<Count> {
    return this.enquiryTypeRepository.count(where);
  }

  @get('/enquiry')
  @response(200, {
    description: 'Array of EnquiryType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnquiryType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnquiryType) filter?: Filter<EnquiryType>,
  ): Promise<EnquiryType[]> {
    return this.enquiryTypeRepository.find(filter);
  }

  @patch('/enquiry')
  @response(200, {
    description: 'EnquiryType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnquiryType, {partial: true}),
        },
      },
    })
    enquiryType: EnquiryType,
    @param.where(EnquiryType) where?: Where<EnquiryType>,
  ): Promise<Count> {
    return this.enquiryTypeRepository.updateAll(enquiryType, where);
  }

  @get('/enquiry/{id}')
  @response(200, {
    description: 'EnquiryType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnquiryType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnquiryType, {exclude: 'where'}) filter?: FilterExcludingWhere<EnquiryType>
  ): Promise<EnquiryType> {
    return this.enquiryTypeRepository.findById(id, filter);
  }

  @patch('/enquiry/{id}')
  @response(204, {
    description: 'EnquiryType PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnquiryType, {partial: true}),
        },
      },
    })
    enquiryType: EnquiryType,
  ): Promise<void> {
    await this.enquiryTypeRepository.updateById(id, enquiryType);
  }

  @put('/enquiry/{id}')
  @response(204, {
    description: 'EnquiryType PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() enquiryType: EnquiryType,
  ): Promise<void> {
    await this.enquiryTypeRepository.replaceById(id, enquiryType);
  }

  @del('/enquiry/{id}')
  @response(204, {
    description: 'EnquiryType DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.enquiryTypeRepository.deleteById(id);
  }
}
