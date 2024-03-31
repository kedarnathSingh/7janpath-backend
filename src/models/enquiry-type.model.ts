import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'forex_trav_insur_card_exchange',
    },
    strict: true,
  },
})
export class EnquiryType extends Entity {
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
  request_type: string;
  @property({
    type: 'string',
    default: null,
  })
  name?: string;

  @property({
    type: 'string',
    default: null,
  })
  email?: string;

  @property({
    type: 'number',
    required: true,
  })
  mobile: number;

  @property({
    type: 'string',
    default: null,
  })
  dest_country?: string;

  @property({
    type: 'string',
    default: null,
  })
  location_from?: string;

  @property({
    type: 'date',
    default: null,
  })
  travel_start_date?: string;

  @property({
    type: 'date',
    default: null,
  })
  travel_end_date?: string;

  @property({
    type: 'number',
    default: null,
  })
  no_of_traveller?: number;

  @property({
    type: 'string',
    default: null,
  })
  delivery_address?: string;

  @property({
    type: 'string',
    default: null,
  })
  currency?: string;

  @property({
    type: 'number',
    default: null,
  })
  forex_amount?: number;

  @property({
    type: 'number',
    default: null,
  })
  total_rs?: number;

  @property({
    type: 'number',
    default: null,
  })
  country_travel_from?: number;

  @property({
    type: 'number',
    default: null,
  })
  country_travel_in?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @property({
    type: 'date',
    default: null,
  })
  created_at?: string;

  @property({
    type: 'date',
    default: null,
  })
  updated_at?: string;

  @property({
    type: 'string',
    default: null,
  })
  currency_request_type?: string;

  @property({
    type: 'number',
    default: null,
  })
  remittance_purpose_id?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<EnquiryType>) {
    super(data);
  }
}

export interface EnquiryTypeRelations {
  // describe navigational properties here
}

export type EnquiryTypeWithRelations = EnquiryType & EnquiryTypeRelations;
