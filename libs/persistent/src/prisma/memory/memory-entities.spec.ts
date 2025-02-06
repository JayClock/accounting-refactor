import { Entity } from '@accounting-nest/domain';
import { MemoryEntities } from './memory-entities';

interface MockEntityDescription {
  value: string;
}

class MockEntity implements Entity<number, MockEntityDescription> {
  constructor(
    private identity: number,
    private descripion: MockEntityDescription
  ) {}

  getIdentity(): number {
    return this.identity;
  }

  getDescription(): MockEntityDescription {
    return this.descripion;
  }
}

describe('MemoryEntities', () => {
  let entities: MemoryEntities<number, MockEntity>;
  let mockEntityList: MockEntity[];

  beforeEach(() => {
    mockEntityList = [
      new MockEntity(1, { value: 'entity #1' }),
      new MockEntity(2, { value: 'entity #2' }),
      new MockEntity(3, { value: 'entity #3' }),
    ];
    entities = new MemoryEntities(mockEntityList);
  });

  it('should get current size', async () => {
    const size = await entities.size();
    expect(size).toBe(3);
  });

  it('should return a sub collection', async () => {
    const subCollection = await entities.subCollection(1, 3);
    const size = await subCollection.size();
    expect(size).toBe(2);
    const ids: number[] = [];
    for await (const entity of subCollection) {
      ids.push(entity.getIdentity());
    }
    expect(ids).toEqual([2, 3]);
  });

  it('should return all entities', async () => {
    const allEntities = await entities.findAll();
    const ids = [];
    for await (const entity of allEntities) {
      ids.push(entity.getIdentity());
    }
    expect(ids).toEqual([1, 2, 3]);
  });

  it('should find an entity by identity', async () => {
    const entity = await entities.findByIdentity(2);
    expect(entity?.getIdentity()).toBe(2);
  });

  it('should return null if entity not found', async () => {
    const entity = await entities.findByIdentity(4);
    expect(entity).toBeNull();
  });

  it('should iterate over entities asynchronously', async () => {
    const ids = [];
    for await (const entity of entities) {
      ids.push(entity.getIdentity());
    }
    expect(ids).toEqual([1, 2, 3]);
  });
});
