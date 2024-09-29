import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'forex_configuration',
    },
    strict: true,
  },
})
export class Setting extends Entity {
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
  page_slug: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    default: null,
  })
  content?: string;

  @property({
    type: 'string',
    default: null,
  })
  image?: string;

  @property({
    type: 'string',
    default: null,
  })
  url?: string;

  @property({
    type: 'boolean',
    default: true,
  })
  status?: boolean;

  @property({
    type: 'date',
    default: new Date,
  })
  created_at?: string;

  @property({
    type: 'date',
    default: new Date,
  })
  updated_at?: string;

  @property({
    type: 'string',
    default: null,
  })
  meta_title?: string;

  @property({
    type: 'string',
    default: null,
  })
  meta_desc?: string;

  @property({
    type: 'string',
    default: null,
  })
  meta_keyword?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Setting>) {
    super(data);
  }
}

export interface SettingRelations {
  // describe navigational properties here
}

export type SettingWithRelations = Setting & SettingRelations;
