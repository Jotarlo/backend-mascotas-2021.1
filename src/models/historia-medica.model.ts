import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Mascota} from './mascota.model';

@model({
  settings: {
    foreignKeys: {
      fk_mascota_id_historia: {
        name: 'fk_mascota_id_historia',
        entity: 'Mascota',
        entityKey: 'id',
        foreignKey: 'mascotaId',
      },
    },
  },
})
export class HistoriaMedica extends Entity {

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
  especialidad: string;

  @property({
    type: 'string',
    required: true,
  })
  diagnostico: string;

  @property({
    type: 'string',
    required: true,
  })
  recomendaciones: string;

  @belongsTo(() => Mascota)
  mascotaId: number;

  constructor(data?: Partial<HistoriaMedica>) {
    super(data);
  }
}

export interface HistoriaMedicaRelations {
  // describe navigational properties here
}

export type HistoriaMedicaWithRelations = HistoriaMedica & HistoriaMedicaRelations;
