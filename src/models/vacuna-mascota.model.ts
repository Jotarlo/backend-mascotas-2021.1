import {Entity, model, property} from '@loopback/repository';

@model()
export class VacunaMascota extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<VacunaMascota>) {
    super(data);
  }
}

export interface VacunaMascotaRelations {
  // describe navigational properties here
}

export type VacunaMascotaWithRelations = VacunaMascota & VacunaMascotaRelations;
