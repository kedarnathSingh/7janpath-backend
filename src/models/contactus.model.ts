import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'forex_contactus',
    },
    strict: true,
  },
})
export class Contactus extends Entity {
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
  email: string;

  @property({
    type: 'number',
    required: true,
  })
  mobile: number;

  @property({
    type: 'string',
    required: true,
  })
  inquiry_type: string;

  @property({
    type: 'string',
    default: null,
  })
  location?: string;

  @property({
    type: 'string',
    default: null,
  })
  message?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  status?: boolean;

  @property({
    type: 'date',
    required: true,
  })
  created_at: string;

  @property({
    type: 'date',
    default: null,
  })
  updated_at?: string;


  constructor(data?: Partial<Contactus>) {
    super(data);
  }
}

export interface ContactusRelations {
  // describe navigational properties here
}

export type ContactusWithRelations = Contactus & ContactusRelations;
