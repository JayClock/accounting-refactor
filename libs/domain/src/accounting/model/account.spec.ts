import { Account } from './account';
import { AccountDescription } from '../description/account.description';
import { Amount } from '../description/basic/amount';
import { Currency } from '../description/basic/currency';

describe('Account', () => {
  let account: Account;
  let mockAccountDescription: AccountDescription;

  beforeEach(() => {
    mockAccountDescription = { balance: new Amount(12, Currency.CNY) };
    account = new Account(2, mockAccountDescription);
  });

  it('should create an instance', () => {
    expect(account).toBeTruthy();
  });

  it('should get identity', () => {
    expect(account.getIdentity()).toBe(2);
  });

  it('should get description', () => {
    expect(account.getDescription()).toEqual(mockAccountDescription);
  });
});
