import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'forex_city_list',
    },
    strict: true,
  },
})
export class CityList extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  state_id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'boolean',
    default: 1,
  })
  status?: boolean;

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


  constructor(data?: Partial<CityList>) {
    super(data);
  }
}

export interface CityListRelations {
  // describe navigational properties here
}

export type CityListWithRelations = CityList & CityListRelations;
