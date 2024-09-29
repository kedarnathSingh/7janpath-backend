import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'forex_happy_client',
    },
    strict: true,
  },
})
export class Testimonial extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @property({
    type: 'string',
    default: null,
  })
  image?: string;

  @property({
    type: 'string',
    default: null,
  })
  url?: string;

  @property({
    type: 'number',
    required: true,
  })
  rating: number;

  @property({
    type: 'number',
    default: 0,
  })
  priority?: number;

  @property({
    type: 'boolean',
    default: true,
  })
  status?: boolean;

  @property({
    type: 'date',
    default: new Date,
  })
  created_at?: string;

  @property({
    type: 'date',
    default: new Date,
  })
  updated_at?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Testimonial>) {
    super(data);
  }
}

export interface TestimonialRelations {
  // describe navigational properties here
}

export type TestimonialWithRelations = Testimonial & TestimonialRelations;
