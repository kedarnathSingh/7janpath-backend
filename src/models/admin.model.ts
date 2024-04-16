import {Entity, model, property} from '@loopback/repository';

@model(
  {
    settings: {
      postgresql: {
        table: 'forex_admin',
      },
      strict: true,
    },
  }
)
export class Admin extends Entity {
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
    required: true,
  })
  password: string;

  @property({
    type: 'number',
    required: true,
  })
  mobile: number;

  @property({
    type: 'number',
    required: true,
  })
  admin_role: number;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'number',
  })
  city_id?: number;

  @property({
    type: 'number',
  })
  state_id?: number;

  @property({
    type: 'number',
  })
  country_id?: number;

  @property({
    type: 'string',
  })
  latitude?: string;

  @property({
    type: 'string',
  })
  longitude?: string;

  @property({
    type: 'string',
  })
  gender?: string;

  @property({
    type: 'string',
  })
  profile_pic?: string;

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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Admin>) {
    super(data);
  }
}

export interface AdminRelations {
  // describe navigational properties here
}

export type AdminWithRelations = Admin & AdminRelations;
