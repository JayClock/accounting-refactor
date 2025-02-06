import { CustomersCache } from './customers.cache';
import { Customer } from '@accounting-nest/domain';

describe('CustomersCache', () => {
  let customersCache: CustomersCache;
  let mockCustomer: Customer;

  beforeEach(() => {
    customersCache = new CustomersCache();
    mockCustomer = {
      getIdentity: jest.fn().mockReturnValue(1),
    } as unknown as Customer;
  });

  describe('set', () => {
    it('should store the customer in the cache', async () => {
      await customersCache.set(mockCustomer);
      const retrievedCustomer = await customersCache.get(1);
      expect(retrievedCustomer).toEqual(mockCustomer);
    });
  });

  describe('get', () => {
    it('should return the customer if it exists in the cache', async () => {
      await customersCache.set(mockCustomer);
      const retrievedCustomer = await customersCache.get(1);
      expect(retrievedCustomer).toEqual(mockCustomer);
    });

    it('should return null if the customer does not exist in the cache', async () => {
      const retrievedCustomer = await customersCache.get(2);
      expect(retrievedCustomer).toBeNull();
    });
  });
});
