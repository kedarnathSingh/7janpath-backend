import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ForexDbDataSource} from '../datasources';
import {Currency, CurrencyRelations} from '../models';

export class CurrencyRepository extends DefaultCrudRepository<
  Currency,
  typeof Currency.prototype.id,
  CurrencyRelations
> {
  constructor(
    @inject('datasources.forex_db') dataSource: ForexDbDataSource,
  ) {
    super(Currency, dataSource);
  }

  calculateRate(rate: number, commission: {type: string; value: number}): number {
    if (commission.type === 'percentage') {
      return rate + (rate * commission.value) / 100;
    } else {
      return rate + commission.value;
    }
  };
}