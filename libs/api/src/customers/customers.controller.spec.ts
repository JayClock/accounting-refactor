import { Customer, Customers, CUSTOMERS_TOKEN } from '@accounting-nest/domain';
import { CustomersController } from './customers.controller';
import { Test } from '@nestjs/testing';
import { CustomersCache } from './customers.cache';

describe('CustomersController', () => {
  let controller: CustomersController;
  let customers: Customers;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CUSTOMERS_TOKEN,
          useValue: { findById: jest.fn() },
        },
        {
          provide: CustomersCache,
          useValue: { get: jest.fn(), set: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    customers = module.get<Customers>(CUSTOMERS_TOKEN);
  });

  it('should create', () => {
    expect(controller).toBeTruthy();
  });

  it('findById', async () => {
    const mockCustomer = {
      getIdentity: jest.fn().mockReturnValue(1),
      getDescription: jest
        .fn()
        .mockReturnValue({ name: 'name #1', email: 'email #1' }),
    } as unknown as Customer;

    jest.spyOn(customers, 'findById').mockResolvedValue(mockCustomer);
    const customerModel = await controller.findById('1');
    expect(customers.findById).toHaveBeenCalledWith(1);
    expect(customerModel).toBeTruthy();
  });
});
