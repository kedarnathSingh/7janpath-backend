import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'forex_country_list',
    },
    strict: true,
  },
})
export class CountryList extends Entity {
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


  constructor(data?: Partial<CountryList>) {
    super(data);
  }
}

export interface CountryListRelations {
  // describe navigational properties here
}

export type CountryListWithRelations = CountryList & CountryListRelations;
