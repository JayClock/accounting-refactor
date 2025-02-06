import {
  Account,
  AccountDescription,
  Amount,
  Currency,
  CustomerAccounts,
} from '@accounting-nest/domain';
import { Injectable } from '@nestjs/common';
import { MemoryEntities } from '../memory/memory-entities';
import { PrismaService } from './prisma.service';

@Injectable()
export class CustomerAccountsFactory {
  constructor(private readonly prisma: PrismaService) {}

  async create(customerId: number): Promise<CustomerAccounts> {
    const list = await this.prisma.account.findMany({
      where: { customerId: customerId },
    });
    const accountList = list.map(
      (item) => new Account(item.id, { balance: new Amount(1, Currency.CNY) })
    );
    return new CustomerAccountsDB(customerId, this.prisma, accountList);
  }
}

class CustomerAccountsDB
  extends MemoryEntities<number, Account>
  implements CustomerAccounts
{
  constructor(
    private readonly customerId: number,
    private readonly prisma: PrismaService,
    accountList: Account[]
  ) {
    super(accountList);
  }

  async update(account: Account): Promise<void> {
    console.log(account);
  }

  async create(description: AccountDescription): Promise<Account> {
    const result = await this.prisma.account.create({
      data: {
        customerId: this.customerId,
        currency: description.balance.currency,
        balance: description.balance.value,
      },
    });
    return new Account(result.id, description);
  }
}
