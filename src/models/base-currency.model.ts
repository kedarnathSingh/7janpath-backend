import {Entity, model, property} from '@loopback/repository';

@model(
  {
    settings: {
      postgresql: {
        table: 'forex_base_currency',
      },
      strict: true,
    },
  }
)
export class BaseCurrency extends Entity {
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
  currency: string;

  @property({
    type: 'string',
    default: null,
  })
  symbol?: string;

  @property({
    type: 'number',
    required: true,
  })
  rate: number;

  @property({
    type: 'boolean',
    default: null,
  })
  status?: boolean;

  @property({
    type: 'date',
    required: true,
  })
  created_at?: string;

  @property({
    type: 'date',
    required: true,
  })
  updated_at?: string;


  constructor(data?: Partial<BaseCurrency>) {
    super(data);
  }
}

export interface BaseCurrencyRelations {
  // describe navigational properties here
}

export type BaseCurrencyWithRelations = BaseCurrency & BaseCurrencyRelations;
