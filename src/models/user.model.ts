import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'forex_user',
    },
    strict: true,
  },
})
export class User extends Entity {
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
    type: 'string',
    required: false,
  })
  password: string;

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
    required: false,
  })
  user_type: string;

  @property({
    type: 'string',
    required: false,
  })
  latitude: string;

  @property({
    type: 'string',
    required: false,
  })
  longitude: string;

  @property({
    type: 'string',
    required: false,
  })
  state: string;

  @property({
    type: 'number',
    required: false,
  })
  gender: number;

  @property({
    type: 'number',
    required: false,
  })
  profile_pic: number;

  @property({
    type: 'boolean',
    required: false,
  })
  status: boolean;

  @property({
    type: 'number',
    required: false,
  })
  city_id: number;

  @property({
    type: 'number',
    required: false,
  })
  state_id: number;

  @property({
    type: 'number',
    required: false,
  })
  country_id: number;

  @property({
    type: 'date',
    required: false,
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
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
