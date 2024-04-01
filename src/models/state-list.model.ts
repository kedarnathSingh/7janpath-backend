import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'forex_state_list',
    },
    strict: true,
  },
})
export class StateList extends Entity {
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
  country_id: number;

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


  constructor(data?: Partial<StateList>) {
    super(data);
  }
}

export interface StateListRelations {
  // describe navigational properties here
}

export type StateListWithRelations = StateList & StateListRelations;
