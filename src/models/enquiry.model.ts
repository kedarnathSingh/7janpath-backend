import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'forex_enquiry',
    },
    strict: true,
  },
})
export class Enquiry extends Entity {
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
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  currency_you_have: string;

  @property({
    type: 'string',
    required: true,
  })
  currency_you_want: string;

  @property({
    type: 'string',
    required: true,
  })
  currency_type: string;

  @property({
    type: 'number',
    required: true,
  })
  forex_amount: number;

  @property({
    type: 'number',
    required: true,
  })
  total_amount: number;

  @property({
    type: 'number',
    required: true,
  })
  forex_rate: number;

  @property({
    type: 'number',
    required: true,
  })
  inr_amount: number;

  @property({
    type: 'string',
    required: true,
  })
  request_type: string;

  @property({
    type: 'number',
    required: true,
  })
  status: number;

  @property({
    type: 'date',
    required: true,
  })
  created_at: string;

  @property({
    type: 'date',
    required: true,
  })
  updated_at: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Enquiry>) {
    super(data);
  }
}

export interface EnquiryRelations {
  // describe navigational properties here
}

export type EnquiryWithRelations = Enquiry & EnquiryRelations;
