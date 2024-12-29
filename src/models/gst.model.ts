import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'forex_gst',
    },
    strict: true,
  },
})
export class Gst extends Entity {
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
  min_amount: number;

  @property({
    type: 'number',
    required: true,
  })
  max_amount: number;

  @property({
    type: 'number',
    required: true,
  })
  gst: number;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'number',
    required: true,
  })
  min_gst: number;

  @property({
    type: 'number',
    required: true,
  })
  max_gst: number;

  @property({
    type: 'boolean',
    default: 1,
  })
  status?: boolean;

  @property({
    type: 'date',
    default: Date(),
  })
  created_at?: string;

  @property({
    type: 'date',
    default: Date(),
  })
  updated_at?: string;


  constructor(data?: Partial<Gst>) {
    super(data);
  }
}

export interface GstRelations {
  // describe navigational properties here
}

export type GstWithRelations = Gst & GstRelations;
