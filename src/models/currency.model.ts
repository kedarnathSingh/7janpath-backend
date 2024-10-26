import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'forex_currency',
    },
    strict: true,
  },
})
export class Currency extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    default: null,
  })
  symbol?: string;

  @property({
    type: 'number',
    dataType: 'decimal',
    required: true,
    precision: 10,
    scale: 3
  })
  rate: number;

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
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @property({
    type: 'number',
    required: true,
    defualt: 0,
  })
  priority: number;

  @property({
    type: 'number',
    dataType: 'decimal',
    required: true,
    precision: 10,
    scale: 3
  })
  buy_rate: number;

  @property({
    type: 'number',
    dataType: 'decimal',
    required: true,
    precision: 10,
    scale: 3
  })
  sell_rate: number;

  constructor(data?: Partial<Currency>) {
    super(data);
  }
}

export interface CurrencyRelations {
  // describe navigational properties here
}

export type CurrencyWithRelations = Currency & CurrencyRelations;
