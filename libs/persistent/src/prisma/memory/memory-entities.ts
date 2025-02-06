import { Entity, HasMany, Many } from '@accounting-nest/domain';

export class MemoryEntities<ID, E extends Entity<unknown, unknown>>
  implements Many<E>, HasMany<ID, E>
{
  private readonly entityList: E[];

  constructor(initialEntityList: E[] = []) {
    this.entityList = [...initialEntityList];
  }

  async size(): Promise<number> {
    return this.entityList.length;
  }

  async subCollection(from: number, to: number): Promise<Many<E>> {
    return new MemoryEntities(this.entityList.slice(from, to));
  }

  async findAll(): Promise<Many<E>> {
    return this;
  }

  async findByIdentity(id: ID): Promise<E | null> {
    return this.entityList.find((e) => e.getIdentity() === id) ?? null;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<E> {
    for (const entity of this.entityList) {
      yield entity;
    }
  }
}
