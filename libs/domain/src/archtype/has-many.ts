import { Entity } from './entity';
import { Many } from './many';

export interface HasMany<ID, E extends Entity<unknown, unknown>> {
  findByIdentity(id: ID): Promise<E | null>;
  findAll(): Promise<Many<E>>;
}
