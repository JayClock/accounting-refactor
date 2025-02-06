import { CustomerDescription } from '../description/customer.description';
import { Customer, CustomerAccounts } from './customer';

describe('Customer', () => {
  let customer: Customer;
  let mockCustomerDescription: CustomerDescription;

  beforeEach(() => {
    mockCustomerDescription = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
    customer = new Customer(1, mockCustomerDescription, {} as CustomerAccounts);
  });

  it('should create an instance', () => {
    expect(customer).toBeTruthy();
  });

  it('should get identity', () => {
    expect(customer.getIdentity()).toBe(1);
  });

  it('should get description', () => {
    expect(customer.getDescription()).toEqual(mockCustomerDescription);
  });
});
