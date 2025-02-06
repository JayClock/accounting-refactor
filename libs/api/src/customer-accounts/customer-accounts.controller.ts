import { Controller, Get, Param } from '@nestjs/common';
import { AccountModel } from '../representation/account.model';
import { CustomersCache } from '../customers/customers.cache';

@Controller('customers/:customerId/accounts')
export class CustomerAccountsController {
  constructor(private customersCache: CustomersCache) {}

  @Get()
  async findAll(
    @Param('customerId') customerId: string
  ): Promise<AccountModel[]> {
    const customer = await this.customersCache.get(+customerId);
    const accountList = (await customer?.getAccounts().findAll()) ?? [];
    const result: AccountModel[] = [];
    for await (const account of accountList) {
      result.push(new AccountModel(account));
    }
    return result;
  }
}
