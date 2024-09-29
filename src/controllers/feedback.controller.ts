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
import {Testimonial} from '../models';
import {TestimonialRepository} from '../repositories';

export class FeedbackController {
  constructor(
    @repository(TestimonialRepository)
    public testimonialRepository : TestimonialRepository,
  ) {}

  @post('/feedback')
  @response(200, {
    description: 'Testimonial model instance',
    content: {'application/json': {schema: getModelSchemaRef(Testimonial)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Testimonial, {
            title: 'NewTestimonial',
            exclude: ['id'],
          }),
        },
      },
    })
    testimonial: Omit<Testimonial, 'id'>,
  ): Promise<Testimonial> {
    return this.testimonialRepository.create(testimonial);
  }

  @get('/feedback/count')
  @response(200, {
    description: 'Testimonial model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Testimonial) where?: Where<Testimonial>,
  ): Promise<Count> {
    return this.testimonialRepository.count(where);
  }

  @get('/feedback')
  @response(200, {
    description: 'Array of Testimonial model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Testimonial, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Testimonial) filter?: Filter<Testimonial>,
  ): Promise<Testimonial[]> {
    return this.testimonialRepository.find(filter);
  }

  @patch('/feedback')
  @response(200, {
    description: 'Testimonial PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Testimonial, {partial: true}),
        },
      },
    })
    testimonial: Testimonial,
    @param.where(Testimonial) where?: Where<Testimonial>,
  ): Promise<Count> {
    return this.testimonialRepository.updateAll(testimonial, where);
  }

  @get('/feedback/{id}')
  @response(200, {
    description: 'Testimonial model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Testimonial, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Testimonial, {exclude: 'where'}) filter?: FilterExcludingWhere<Testimonial>
  ): Promise<Testimonial> {
    return this.testimonialRepository.findById(id, filter);
  }

  @patch('/feedback/{id}')
  @response(204, {
    description: 'Testimonial PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Testimonial, {partial: true}),
        },
      },
    })
    testimonial: Testimonial,
  ): Promise<void> {
    await this.testimonialRepository.updateById(id, testimonial);
  }

  @put('/feedback/{id}')
  @response(204, {
    description: 'Testimonial PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() testimonial: Testimonial,
  ): Promise<void> {
    await this.testimonialRepository.replaceById(id, testimonial);
  }

  @del('/feedback/{id}')
  @response(204, {
    description: 'Testimonial DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.testimonialRepository.deleteById(id);
  }
}
