import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'forex_faq',
    },
    strict: true,
  },
})
export class Faq extends Entity {
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
  question: string;

  @property({
    type: 'string',
    required: true,
  })
  ans: string;

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

  constructor(data?: Partial<Faq>) {
    super(data);
  }
}

export interface FaqRelations {
  // describe navigational properties here
}

export type FaqWithRelations = Faq & FaqRelations;
