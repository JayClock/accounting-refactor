import { Customers } from './customers';
import { Test } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { Customer, CustomerDescription } from '@accounting-nest/domain';
import { CustomerAccountsFactory } from './customer-accounts.factory';

describe('Customers', () => {
  let customers: Customers;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        Customers,
        {
          provide: PrismaService,
          useValue: {
            customer: {
              findUniqueOrThrow: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: CustomerAccountsFactory,
          useValue: { create: jest.fn() },
        },
      ],
    }).compile();
    customers = module.get(Customers);
    prisma = module.get(PrismaService);
  });

  it('should create', () => {
    expect(customers).toBeTruthy();
  });

  describe('findById', () => {
    it('should reurn a customer when found', async () => {
      jest.spyOn(prisma.customer, 'findUniqueOrThrow').mockResolvedValue({
        id: 1,
        name: 'Test Customer',
        email: 'test@example.com',
      });
      const result = await customers.findById(1);
      expect(prisma.customer.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toBeInstanceOf(Customer);
      expect(result.getIdentity()).toEqual(1);
      expect(result.getDescription()).toEqual({
        name: 'Test Customer',
        email: 'test@example.com',
      });
    });
  });

  describe('create', () => {
    it('should create and return a new customer', async () => {
      const mockCustomerDescription: CustomerDescription = {
        name: 'New Customer',
        email: 'new@example.com',
      };

      const mockCreatedCustomer = {
        id: 2,
        ...mockCustomerDescription,
      };
      jest
        .spyOn(prisma.customer, 'create')
        .mockResolvedValue(mockCreatedCustomer);
      const result = await customers.create(mockCustomerDescription);

      expect(prisma.customer.create).toHaveBeenCalledWith({
        data: mockCustomerDescription,
      });
      expect(result).toBeInstanceOf(Customer);
      expect(result.getIdentity()).toBe(2);
      expect(result.getDescription()).toEqual(mockCustomerDescription);
    });
  });
});
