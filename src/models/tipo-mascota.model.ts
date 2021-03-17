import {Entity, model, property, hasMany} from '@loopback/repository';
import {Raza} from './raza.model';

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

  @hasMany(() => Raza)
  razas: Raza[];

  constructor(data?: Partial<TipoMascota>) {
    super(data);
  }
}

export interface TipoMascotaRelations {
  // describe navigational properties here
}

export type TipoMascotaWithRelations = TipoMascota & TipoMascotaRelations;
