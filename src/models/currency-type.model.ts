import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'forex_currency_types',
    },
    strict: true,
  },
})
export class CurrencyType extends Entity {
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
  image: string;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @property({
    type: 'number',
    required: true,
  })
  sell_margin: boolean;

  @property({
    type: 'number',
    required: true,
  })
  buy_margin: number;

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


  constructor(data?: Partial<CurrencyType>) {
    super(data);
  }
}

export interface CurrencyTypeRelations {
  // describe navigational properties here
}

export type CurrencyTypeWithRelations = CurrencyType & CurrencyTypeRelations;
