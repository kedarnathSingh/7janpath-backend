import {inject} from '@loopback/core';
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
import {Enquiry} from '../models';
import {EnquiryRepository} from '../repositories';
import {EmailService} from '../services/email.service';

export class EnquiryController {
  constructor(
    @repository(EnquiryRepository)
    public enquiryRepository: EnquiryRepository,
    @inject('services.EmailService')
    protected emailService: EmailService,
  ) { }

  @post('/enquiry')
  @response(200, {
    description: 'Enquiry model instance',
    content: {'application/json': {schema: getModelSchemaRef(Enquiry)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enquiry, {
            title: 'NewEnquiry',
            exclude: ['id'],
          }),
        },
      },
    })
    enquiry: Omit<Enquiry, 'id'>,
  ): Promise<Enquiry> {
    // await this.emailService.sendEmail(enquiry.email, 'Welcome!', 'Thanks for registering!');
    return this.enquiryRepository.create(enquiry);
  }

  @get('/enquiry/count')
  @response(200, {
    description: 'Enquiry model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Enquiry) where?: Where<Enquiry>,
  ): Promise<Count> {
    return this.enquiryRepository.count(where);
  }

  @get('/enquiry')
  @response(200, {
    description: 'Array of Enquiry model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Enquiry, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Enquiry) filter?: Filter<Enquiry>,
  ): Promise<Enquiry[]> {
    return this.enquiryRepository.find(filter);
  }

  @patch('/enquiry')
  @response(200, {
    description: 'Enquiry PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enquiry, {partial: true}),
        },
      },
    })
    enquiry: Enquiry,
    @param.where(Enquiry) where?: Where<Enquiry>,
  ): Promise<Count> {
    return this.enquiryRepository.updateAll(enquiry, where);
  }

  @get('/enquiry/{id}')
  @response(200, {
    description: 'Enquiry model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Enquiry, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Enquiry, {exclude: 'where'}) filter?: FilterExcludingWhere<Enquiry>
  ): Promise<Enquiry> {
    return this.enquiryRepository.findById(id, filter);
  }

  @patch('/enquiry/{id}')
  @response(204, {
    description: 'Enquiry PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enquiry, {partial: true}),
        },
      },
    })
    enquiry: Enquiry,
  ): Promise<void> {
    await this.enquiryRepository.updateById(id, enquiry);
  }

  @put('/enquiry/{id}')
  @response(204, {
    description: 'Enquiry PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() enquiry: Enquiry,
  ): Promise<void> {
    await this.enquiryRepository.replaceById(id, enquiry);
  }

  @del('/enquiry/{id}')
  @response(204, {
    description: 'Enquiry DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.enquiryRepository.deleteById(id);
  }
}
