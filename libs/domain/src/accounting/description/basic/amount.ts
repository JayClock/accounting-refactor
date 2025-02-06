import { Currency } from './currency';

export class Amount {
  constructor(public value: number, public currency: Currency) {}

  static cny(value: string): Amount {
    return new Amount(+value, Currency.CNY);
  }

  static usd(value: string): Amount {
    return new Amount(+value, Currency.USD);
  }

  static sum(...amounts: Amount[]): Amount {
    const currencies = new Set(amounts.map((amount) => amount.currency));
    if (currencies.size > 1) {
      throw new Error('All amounts must have the same currency');
    }

    const sum = amounts
      .map((amount) => amount.value)
      .reduce((acc, val) => acc + val, 0);

    return new Amount(sum, currencies.values().next().value ?? Currency.CNY);
  }
}
