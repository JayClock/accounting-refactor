/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entity } from './entity';

export interface HasOne<E extends Entity<any, any>> {
  get(): Promise<E>;
}
