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

  // calculateRate(rate: number, commission: {type: string; value: number}): number {
  //   if (commission.type === 'percentage') {
  //     return parseFloat((rate + (rate * commission.value) / 100).toFixed(3));
  //   } else {
  //     return parseFloat((rate + commission.value).toFixed(3));
  //   }
  // };

  calculateRate(rate: number, commRate: number, commission: string): number {
    if (commission === 'percentage') {
      return parseFloat((rate + (rate * commRate) / 100).toFixed(2));
    } else {
      return parseFloat((rate + (1 * commRate)).toFixed(2));
    }
  };
}
