import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'forex_currency_setting',
    },
    strict: true,
  },
})
export class CurrencySetting extends Entity {
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
    type: 'number',
    required: true,
  })
  buy_rate: number;

  @property({
    type: 'number',
    required: true,
  })
  sell_rate: number;

  @property({
    type: 'string',
    required: true,
  })
  buy_comm_rate_type: string;

  @property({
    type: 'string',
    required: true,
  })
  sell_comm_rate_type: string;

  @property({
    type: 'date',
    required: true,
  })
  created_at: string;

  @property({
    type: 'date',
    required: false,
  })
  updated_at: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  constructor(data?: Partial<CurrencySetting>) {
    super(data);
  }
}

export interface CurrencySettingRelations {
  // describe navigational properties here
}

export type CurrencySettingWithRelations = CurrencySetting & CurrencySettingRelations;
