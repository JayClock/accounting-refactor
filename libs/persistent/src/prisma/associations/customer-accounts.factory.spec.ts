import { Test } from '@nestjs/testing';
import { CustomerAccountsFactory } from './customer-accounts.factory';
import { PrismaService } from './prisma.service';
import {
  AccountDescription,
  Amount,
  Currency,
  CustomerAccounts,
} from '@accounting-nest/domain';

describe('CustomerAccountsFactory', () => {
  let factory: CustomerAccountsFactory;
  let customerAccounts: CustomerAccounts;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CustomerAccountsFactory,
        {
          provide: PrismaService,
          useValue: {
            account: {
              findMany: jest.fn().mockResolvedValue([]),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();
    factory = module.get(CustomerAccountsFactory);
    prisma = module.get(PrismaService);
    customerAccounts = await factory.create(11);
  });

  it('should create', () => {
    expect(factory).toBeTruthy();
    expect(customerAccounts).toBeTruthy();
  });

  describe('create', () => {
    it('should create a new Account', async () => {
      const mockAccountDescription: AccountDescription = {
        balance: new Amount(1, Currency.CNY),
      };
      jest.spyOn(prisma.account, 'create').mockResolvedValue({
        customerId: 11,
        id: 123,
        balance: 1,
        currency: Currency.CNY,
      });
      const account = await customerAccounts.create(mockAccountDescription);
      expect(prisma.account.create).toHaveBeenCalledWith({
        data: {
          customerId: 11,
          balance: 1,
          currency: Currency.CNY,
        },
      });
      expect(account.getIdentity()).toEqual(123);
      expect(account.getDescription()).toEqual(mockAccountDescription);
    });
  });
});
