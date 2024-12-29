import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: false,
  },
})
export class Custom extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true
  })
  inr_amount?: number;

  @property({
    type: 'number',
    required: false,
  })
  service_charge?: number;

  @property({
    type: 'number',
    required: false,
  })
  gst?: number;

  @property({
    type: 'number',
    required: false,
  })
  total_amount?: number;

  constructor(data?: Partial<Custom>) {
    super(data);
  }
}

export interface CustomRelations {
  // describe navigational properties here
}

export type CustomWithRelations = Custom & CustomRelations;
