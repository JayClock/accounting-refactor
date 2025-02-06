import { Account } from '@accounting-nest/domain';
import { AccountModel } from './account.model';

describe('AccoutModel', () => {
  let mockAccount: Account;
  let accountModel: AccountModel;

  beforeEach(() => {
    mockAccount = { getIdentity: () => 1 } as unknown as Account;
    accountModel = new AccountModel(mockAccount);
  });

  it('should get id', () => {
    expect(accountModel.id).toEqual(1);
  });
});
