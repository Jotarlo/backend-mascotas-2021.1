import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {TipoMascota} from './tipo-mascota.model';

@model({
  settings: {
    foreignKeys: {
      fk_tipo_mascota_id: {
        name: 'fk_tipo_mascota_id',
        entity: 'TipoMascota',
        entityKey: 'id',
        foreignKey: 'tipoMascotaId',
      },
    },
  },
})
export class Raza extends Entity {
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

  @belongsTo(() => TipoMascota)
  tipoMascotaId: number;

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  constructor(data?: Partial<Raza>) {
    super(data);
  }
}

export interface RazaRelations {
  // describe navigational properties here
}

export type RazaWithRelations = Raza & RazaRelations;
