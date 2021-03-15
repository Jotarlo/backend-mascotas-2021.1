import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoMascota extends Entity {
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
  nombre: string;


  constructor(data?: Partial<TipoMascota>) {
    super(data);
  }
}

export interface TipoMascotaRelations {
  // describe navigational properties here
}

export type TipoMascotaWithRelations = TipoMascota & TipoMascotaRelations;
