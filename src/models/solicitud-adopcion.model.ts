import {Entity, model, property} from '@loopback/repository';

@model()
export class SolicitudAdopcion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<SolicitudAdopcion>) {
    super(data);
  }
}

export interface SolicitudAdopcionRelations {
  // describe navigational properties here
}

export type SolicitudAdopcionWithRelations = SolicitudAdopcion & SolicitudAdopcionRelations;
