import { Customer } from '@accounting-nest/domain';
import { CustomerModel } from './customer.model';
describe('CustomerModel', () => {
  let customerModel: CustomerModel;
  let mockCustomer: Customer;

  beforeEach(() => {
    mockCustomer = {
      getIdentity: jest.fn().mockReturnValue(1),
      getDescription: jest
        .fn()
        .mockReturnValue({ name: 'name #1', email: 'email #1' }),
    } as unknown as Customer;

    customerModel = new CustomerModel(mockCustomer);
  });

  it('should create an instance', () => {
    expect(customerModel).toBeTruthy();
  });

  it('should return the user identity', () => {
    expect(customerModel.id).toBe(1);
  });

  it('should return the user name', () => {
    expect(customerModel.name).toBe('name #1');
    expect(mockCustomer.getDescription).toHaveBeenCalled();
  });

  it('should return the user email', () => {
    expect(customerModel.email).toBe('email #1');
    expect(mockCustomer.getDescription).toHaveBeenCalled();
  });
});
